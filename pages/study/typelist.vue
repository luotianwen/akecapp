<template>
	<view style="padding-top: 10rpx;">
		<uni-search-bar placeholder="搜索标题" @confirm="search" :radius="100"></uni-search-bar>
		<!-- 自定义Placeholder -->
		<uni-list>
			<block v-for="(tab,index1) in list" :key="index1">
				<uni-list-item :title="tab.title" @click="onClick(tab)" :show-extra-icon="true" :extra-icon="extraIcon1" />
			</block>
		</uni-list>

	</view>
</template>

<script>
		import service from '../../service.js';
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {

			uniList,
			uniListItem,
			uniSearchBar
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.id); //打印出上个页面传递的参数。
			console.log(option.name); //打印出上个页面传递的参数。
			this.id = option.id;
			uni.setNavigationBarTitle({
				title: option.name
			})
		},
		data() {
			return {
				id: '',
				name: '',
				list: [],
				extraIcon1: {
					color: '#007aff',
					size: '22',
					type: 'person-filled'
				},
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		       
				this.id=option.id;
				uni.setNavigationBarTitle({
				　　title:option.name
				});
				this.getData();
		    },
		 
		methods: {
			onClick(tab) {
				 
				uni.navigateTo({
					url: "detail?d="+encodeURIComponent(JSON.stringify(tab))
				})
			},
			search(res) {
				this.name = res.value;
				this.getData();
			},
			getData() {
				var data={
					id:this.id,
					name:this.name,
				};
				uni.showLoading({
					title: '加载中...'
				});
				var _this = this;
				uni.request({
					url: service.queryKnowledgeContentList(),
					data: data,
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							_this.list = data.data.data;
						} else {
							uni.showToast({
								title: data.data.msg
							})
						}

					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						uni.hideLoading();
					}
				})
			}
		},
		onBackPress() {
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}
</style>
