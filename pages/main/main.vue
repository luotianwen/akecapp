<template>
	<view class="warp">
		 
		<view class="example-body">
			<uni-grid :column="3" :highlight="true" @change="change">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<view class="grid-item-box">
						<image :src="item.url" class="image" mode="aspectFill" />
						<text class="text">{{ item.text }}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		 
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import service from '../../service.js';
	import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		components: {
			 
			uniGrid,
			uniGridItem,
			 
		},
		onLoad() {
			/* if (!this.hasLogin) {
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
			} */
			let user = service.getUsers();
			 //if (user.baseReportId == '18370AD648C42B79759D2B6DB04DF6BB') {
			 	this.bs = true;
				 
				this.list.push ({
					url: '/static/c1.png',
					text: '新增报数'
				});
				this.list.push ({
					url: '/static/c7.png',
					text: '已提交报数查询'
				} );
				this.list.push ({
					url: '/static/c9.png',
					text: '待提交报数查询'
				} );
			//}
			this.list.push ({
				url: '/static/c6.png',
				text: '已报个体码查询'
			} );
		},
		data() {
			return {
			   bs:false,
				list: [ 
					{
						url: '/static/c4.png',
						text: '新增报台' 
					},
					{
						url: '/static/c5.png',
						text: '已提交报台查询' 
					},
					{
						url: '/static/c8.png',
						text: '待提交报台查询' 
					}
				]
			}
		},
		methods: {
			change(e) {
				let {
					index
				} = e.detail
				var l=this.list.length;
				console.log(index+"index"+l);
				if(index==0){
					uni.navigateTo({
						url: "/pages/baotai/addbt"
					})
				}
				else if(index==1){
					uni.navigateTo({
						url: "/pages/baotai/list"
					})
				}
				else if(index==2){
					uni.navigateTo({
						url: "/pages/baotai/dlist"
					})
				}
				
				else if(index==3){
					if(l==7){
						uni.navigateTo({
							url: "/pages/bs/bs"
						})
					}
					else if(l==4){
						uni.navigateTo({
							url: "/pages/baotai/geti"
						})
					}
				}
				else if(index==4){
					uni.navigateTo({
						url: "/pages/bs/list"
					})
				}
				else if(index==5){
					uni.navigateTo({
						url: "/pages/bs/dlist"
					})
				}
				else if(index==6){
					uni.navigateTo({
						url: "/pages/baotai/geti"
					})
				}
				/* uni.showToast({
					title: `点击第${index+1}个宫格`,
					icon: 'none'
				}) */
			} 
		}
	}
</script>

<style>
	 

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


	.image {
		width: 100rpx;
		height: 100rpx;
	}

	.text {
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.grid-dynamic-box {
		margin-bottom: 15px;
	}

	.grid-item-box {
		flex: 1;
		/* position: relative;
 */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}

	.swiper {
		height: 420px;
	}
</style>