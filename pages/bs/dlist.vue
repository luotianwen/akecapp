<template>
	<view class="content">

		<view style="padding-left:20rpx ;">共有：{{list.length}}条数据</view>
		<uni-list>
			<block v-for="(tab,index1) in list" :key="index1">
				<uni-card :title="'手术日期:'+tab.operateDate" :note="'填报时间:'+tab.createDate" :isShadow="isShadow" :extra="'爱康台数:'+tab.akCount">
					<text class="content-box-text"> 第 {{(index1+1)}}条 医院:{{tab.hospitalName}}  </text>
					<block slot="footer"  >
						<view class="footer-box"   >
							<view class="" @click.stop="onClick(tab)"><text class="footer-box__item"> 修改</text></view>
							<view class="" @click.stop="del(tab,index1)"><text class="footer-box__item"> 删除</text></view>
						</view>
					 </block>
				</uni-card>

			</block>
		</uni-list>

		<!-- <uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right" vertical="bottom" direction="vertical"
		 @trigger="trigger" /> -->
	</view>
</template>
<script>
	 
	import uniCard from '@/components/uni-card/uni-card.vue'
    import service from '../../service.js';
	import {
		mapState
	} from 'vuex'

	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		components: {

			uniCard 

		},
		data() {

			return {

				isShadow: true,

				index: 0,
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				list:[]
		}
	},
	onShow() {
			if (this.hasLogin) {
				this.getData();
			}
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
		},
		onPullDownRefresh() {
			console.log('refresh');

			this.getData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			onClick(tab) {
				console.log(tab.id);
				uni.navigateTo({
					url:"bs?id="+tab.id
				})
			},
			del(tab, index) {
				var _this=this;
				uni.showModal({
					title: "删除",
					content: '确定要删除吗？',
					success: (res) => {
						if (res.confirm) {
							_this.list.splice(index, 1);
							var data={
								id:tab.id
							}
							uni.request({
								url: service.delReportStandbookOperation(),
								data: data,
								success: (data) => {
									uni.hideLoading();
									if (data.statusCode == 200 && data.data.code == 0) {
										 this.getData();
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
					}
				
				})
			},
		  
			getData() {
				this.list = [];
				uni.showLoading({
					title: '加载中...'
				});
				let user = service.getUsers();
				let data = {
					userId: user.id,

					status: "0",
				}

				var _this = this;
				uni.request({
					url: service.queryListReportStandbookOperation(),
					data: data,
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							if (data.data.data) {
								console.log(JSON.stringify(data.data.data));
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
	
	.content-box {
		padding-top: 20rpx;
	}
	
	.content-box-text {
		font-size: 14px;
		line-height: 20px;
	}
	
	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;
	
	}
	
	.footer-box__item {
		align-items: center;
		padding: 10rpx 0;
		font-size: 30rpx;
		color: #666;
	}
</style>
