<template>
	<view class="content">
		 <uni-list>
		 <block v-for="(tab,index1) in list" :key="index1">
		 
		 		<uni-card :title="'手术日期:'+tab.operateDate" :note="'产品型号:'+tab.materialSpeDesc" :extra="'手术类别:'+tab.surgeryGrade"
		 		 :isShadow="isShadow" >
		 			<text class="content-box-text">第 {{(index1+1)}}条 </br>医院:{{tab.hospitalName}} </br>医生:{{tab.doctor}}</text>
		 			<block slot="footer">
		 				<view class="footer-box">
		 					<!-- 	<view class="" @click.stop="footerClick('喜欢')"><text class="footer-box__item"> 喜欢</text></view>
		 				<view class="" @click.stop="footerClick('评论')"><text class="footer-box__item"> 评论</text></view>
		 			 -->
					 <view class="" @click.stop="onClick(index1)"><text class="footer-box__item"> 修改</text></view>
					 
		 					<view class="" @click.stop="footerClick(tab,index1)"><text class="footer-box__item"> 删除</text></view>
		 				</view>
		 			</block>
		 		</uni-card>
		 
		 	</block>
		 </uni-list>
		<!-- <uni-list>
			<block v-for="(tab,index1) in list" :key="index1">
				<uni-card :title="'手术日期:'+tab.operateDate"   :isShadow="isShadow" :extra="'手术类别:'+tab.surgeryGrade"
				 @click="onClick(index1)">
				 <text class="content-box-text"> 第 {{(index1+1)}}条 医院:{{tab.hospitalName}} 医生:{{tab.doctor}}
				 </text>
				 <block slot="footer"> 
				 	<view class="footer-box">
				 		<view class="" @click.stop="footerClick(tab,index1)"><text class="footer-box__item"> 删除</text></view>
				 	</view>
				 </block>
				 </uni-card>

			</block>
		</uni-list> -->
		 

	</view>
</template>
<script>
	import service from '../../service.js';
	 
	import {
		mapState
	} from 'vuex'
	
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		 
		data() {
			 
			return {
				 
				isShadow:true,
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				list: [] 
				 
			}
		},
		onShow() {
			if ( this.hasLogin) {
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
			  
			getData() {
				this.list=service.getbaotai();
				 
			},
			footerClick(tab,index) {
				var _this=this;
				console.log("index"+index); 
				 uni.showModal({
				 	title: "删除", 
				 	content: '确定要删除第'+(index+1)+'条吗？',
				 	success: (res) => {
				 		if (res.confirm) {
							var d= service.getbaotai();
							debugger;
				 			 d.splice(index,1);
							 service.updatebaotai(d);
							 _this.getData();
				 		}
				 	}
				 			
				 })
			},
			onClick(j) {
				uni.navigateTo({
					url:"update?index="+j
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
	.footer-box__item{
		font-size: 16px;
		}
</style>
