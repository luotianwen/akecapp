<template>
	<view>
		<!-- 自定义Placeholder -->
		<uni-search-bar placeholder="搜索通知标题" @confirm="search" :radius="100"></uni-search-bar>
		<uni-list>
			<block v-for="(tab,index1) in list" :key="index1">
				<uni-card :title="tab.title" :isShadow="true" :extra="tab.releaseDate" @click="onClick(tab)"><text class="content-box-text">{{ tab.content.substr(0,20)+'...' }}</text>
				</uni-card>
			</block>
		</uni-list>

	</view>
</template>

<script>
	import service from '../../service.js';
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniCard,
			uniNavBar,
			uniSearchBar
		},
		data() {
			return {
				title:"",
				list: []
			}
		},
		onReady:function(){
			this.getData();
		},
		methods: {
			onClick(tab) {
				uni.navigateTo({
					url: "detail?d=" + encodeURIComponent(JSON.stringify(tab))
				})
			},
			search(res) {
				this.title = res.value;
				this.getData();
			},
			getData() {
				this.list=[];
				uni.showLoading({
					title: '加载中...'
				});
				let user = service.getUsers();
				let data = {
					"range":user.id,
					title:this.title,
				}
			
				var _this = this;
				uni.request({
					url: service.queryListUnreadNotice(),
					data: data,
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							if(data.data.data){
							_this.list = data.data.data;
							}
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
			},

		},
		onPullDownRefresh() {
			console.log('refresh');
			uni.showLoading({
				title: '加载中...'
			});
			this.getData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
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
