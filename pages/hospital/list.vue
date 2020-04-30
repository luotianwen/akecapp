<template>
	<view  >
		<uni-nav-bar leftIcon="back" @clickLeft="back()"  backgroundColor="#0faeff"  color="white" @clickRight="right" statusBar="false" right-text="新增" title="医院信息"></uni-nav-bar>
		
		<uni-collapse>
			<uni-collapse-item title="搜索条件">
				<view class="input-group">
					<view class="input-row border" style="padding-top: 15rpx;">
						<text class="title">医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：</text>
						 <m-input type="text" clearable v-model="hospitalName" placeholder="请输入医院"></m-input>
					</view>
					
				</view>
				<view class="btn-row">
					<button type="primary" class="primary" @tap="getData">搜索</button>
				</view>
				
			</uni-collapse-item>
		</uni-collapse>
		<lable style="padding-left:20rpx ;">共有：{{list.length}}条数据</lable>
		<uni-list  >
			<block   v-for="(tab,index1) in list" :key="index1">
			<uni-list-item :title="tab.hospitalName"   @click="click(tab)" :rightText="tab.provinceName+'          '+tab.cityName"  :note="tab.updateDate" :show-extra-icon="true"   />
			 </block>
		</uni-list>
		 

	</view>
</template>
<script>
	 
	 import uniList from '@/components/uni-list/uni-list.vue'
	 import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	 import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	import {
		mapState
	} from 'vuex'
	
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		components: {
			uniCollapse,
			uniCollapseItem,
			mInput,
			uniList,
			uniListItem,
			uniNavBar 
		},
		data() {
			 
			return {
				hospitalName: '',
				index: 0,
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				list: [],
				 
			}
		},
		onShow() {
			this.getData();
		},
		onLoad() {
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					showCancel: false,
					success: (res) => {
						if (res.confirm) {
								uni.reLaunch({
									url: '../login/login'
								});
							 
						}
					}
				});
			}
			else{
			 
			this.getData();
			}
		},
		onPullDownRefresh() {
			console.log('refresh'); 
			 
			this.getData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			 back(){
				uni.navigateBack({
					delta:1
				}) 
			 },
			 click(tab){
					 uni.navigateTo({
						url:"hospital?id="+tab.id
					 })
			 },
			  right(){
			 	 uni.navigateTo({
			 	 	url:"hospital"
			 	 })
			  },
			getData() {
				this.list=[];
				uni.showLoading({
					title: '加载中...'
				});
				let user = service.getUsers();
				let data = {
					//"user.id":user.id,
					hospitalName:this.hospitalName 
				}

				var _this = this;
				uni.request({
					url: service.queryListUserHospital(),
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
			onClick(tab) {},
			 
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.scroll-h {
		width: 750rpx;
		height: 80rpx;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
	}

	.line-h {
		height: 1rpx;
		background-color: #cccccc;
	}

	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		padding-left: 34rpx;
		padding-right: 34rpx;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item-title-active {
		color: #007AFF;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		flex: 1;
		flex-direction: row;
	}

	.scroll-v {
		flex: 1;
		/* #ifndef MP-ALIPAY */
		flex-direction: column;
		/* #endif */
		width: 750rpx;
	}

	.update-tips {
		position: absolute;
		left: 0;
		top: 41px;
		right: 0;
		padding-top: 5px;
		padding-bottom: 5px;
		background-color: #FDDD9B;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.update-tips-text {
		font-size: 14px;
		color: #ffffff;
	}

	.refresh {
		width: 750rpx;
		height: 64px;
		justify-content: center;
	}

	.refresh-view {
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.refresh-icon {
		width: 30px;
		height: 30px;
		transition-duration: .5s;
		transition-property: transform;
		transform: rotate(0deg);
		transform-origin: 15px 15px;
	}

	.refresh-icon-active {
		transform: rotate(180deg);
	}

	.loading-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
		color: #999999;
	}

	.loading-text {
		margin-left: 2px;
		font-size: 16px;
		color: #999999;
	}

	.loading-more {
		align-items: center;
		justify-content: center;
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: center;
	}

	.loading-more-text {
		font-size: 28rpx;
		color: #999;
	}

	.input-row .title {
		width: 100px;
		padding-left: 15px;
	}
</style>
