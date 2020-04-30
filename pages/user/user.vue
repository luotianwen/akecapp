<template>
	<view class="content">
		<view class="btn-row">
			<button type="default">欢迎{{userName}}</button>
			<!-- 	<button style="margin-top: 10rpx;" type="default" @tap="about">关于</button> -->
			<button style="margin-top: 10rpx;" type="default" @tap="notice">通知中心</button>
			<button style="margin-top: 10rpx;" type="default" @tap="update">修改密码</button>
			<button style="margin-top: 10rpx;" type="default" v-if="yw" @tap="goyey">业务员</button>
			<button style="margin-top: 10rpx;" type="default" @tap="zx">注销账户</button>
			<button style="margin-top: 10rpx;" type="default" @tap="ys">隐私政策与用户协议</button>
			
			<button style="margin-top: 10rpx;" v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button style="margin-top: 10rpx;" v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
			<!-- #ifdef APP-PLUS -->
			<view class="version">
				当前版本：{{version}}
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'auditStatus'])
		},
		data() {
			return {
				yw: false,
				bs: false,
				version: ''
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.version = plus.runtime.version;
			// #endif 
			let user = service.getUsers();
			if (user.baseReportId == 'B18370AD648C42B79759D2B6DB04DF6B') {
				this.yw = true;
			}
			if (user.baseReportId == '18370AD648C42B79759D2B6DB04DF6BB') {
				this.bs = true;
			}

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
			/* if (this.auditStatus==0) {
				uni.showModal({
					title: '审核中...',
					content: '您的用户正在审核中……',
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
		},
		methods: {
			...mapMutations(['logout']),
			zx() {
             uni.showModal({
             	title: "注销账户",
             	content: '确定要注销账户吗？',
             	success: (res) => {
             		if (res.confirm) {
             			 uni.navigateTo({
             			 	url: 'zx',
             			 });
             		}
             	}
             
             })
			},
			ys() {
				uni.navigateTo({
					url: 'ys',
				});
			},
			xy() {
				uni.navigateTo({
					url: 'xy',
				});
			},
			notice() {
				uni.navigateTo({
					url: '../notice/list',
				});
			},
			update() {
				uni.navigateTo({
					url: '../pwd/pwd',
				});
			},

			goyey() {
				uni.navigateTo({
					url: '../ywy/ywy',
				});
			},
			gobs() {
				uni.navigateTo({
					url: '../bs/list',
				});
			},
			about() {
				uni.navigateTo({
					url: '../about/about',
				});
			},
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				uni.reLaunch({
					url: '../login/login',
				});
			}
		}
	}
</script>

<style>
.version {
		height: 80rpx;
		line-height: 80rpx;
		justify-content: center;
		color: #ccc;
	}
</style>
