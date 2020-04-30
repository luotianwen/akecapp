<template>
	<view class="content">
		<view class="btn-row">
			<image src="../../static/img/main_logo.png" style="padding-left: 50rpx;width: 80%; height: 100rpx;"></image>
		</view>
		 
	</view>
</template>

<script>
	 
	import {
		mapState
	} from 'vuex'

	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		 
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
		data() {
			return { 
			}
		} 
	}
</script>

<style>
	 
</style>
