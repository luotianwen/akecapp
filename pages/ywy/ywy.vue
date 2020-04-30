<template>
	<view>

		<uni-nav-bar leftIcon="back" @clickLeft="left" backgroundColor="#0faeff" color="white" @clickRight="right" statusBar="false"
		 right-text="新增" title="业务员信息"></uni-nav-bar>
		<!-- 自定义Placeholder -->
		<uni-search-bar placeholder="搜索姓名或者账号" @confirm="search" :radius="100"></uni-search-bar>
		<uni-list  >
			<block v-for="(tab,index1) in list" :key="index1">
				<uni-list-item :title="'  账  号:'+tab.account" @click="click(tab)" :note="'  姓  名:'+tab.name" :show-extra-icon="true" :extra-icon="extraIcon1" />
			</block>
		</uni-list>

	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import service from '../../service.js';
	export default {
		components: {

			uniList,
			uniListItem,
			uniNavBar,
			uniSearchBar
		},
		
		data() {
			return {
				list: [],
				extraIcon1: {
					color: '#007aff',
					size: '50',
					type: 'person-filled'
				},
				name:"",
				id:"",
				dealerId:"",
			}
		},
		onShow: function() {
			 console.log("ywy show");
			uni.showLoading({
				title: '加载中...'
			});
			 this.getData();
		},
		onLoad() {
			let user = service.getUsers();
			this.id=user.id;
			this.dealerId=user.dealerId;
			uni.showLoading({
				title: '加载中...'
			});
			 this.getData();
			},
		onPullDownRefresh() {
			console.log('refresh');
				uni.showLoading({
					title: '加载中...'
				});
				 this.getData();
			 setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getData(){
				
				let data={
					id:this.id,
					dealerId:this.dealerId,
					name:this.name
				}
				console.log(JSON.stringify(data));
				var _this=this;
				uni.request({
					url: service.queryListUserBelongDealer(),
					data: data,
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							 _this.list=data.data.data;
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
			left() {
				uni.navigateBack()
			},

			right() {
				uni.navigateTo({
					url: "add"
				})
			},
			click(tab) {
				 
				uni.navigateTo({
					url: "add?d="+JSON.stringify(tab) 
				})
			},

			search(res) {
				uni.showLoading({
					title: '加载中...'
				});
				this.name=res.value;
				 this.getData();
			},
			
			

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
