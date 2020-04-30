<template>
	<view class="content">
		<view class="btn-row">
			<image src="../../static/img/main_logo.png" style="padding-left: 50rpx;width: 80%; height: 150rpx;"></image>
		</view>
		<view class="input-group">
			<view class="input-row border" style="margin-top: 15rpx;">
				<text class="title">手机号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入手机号"></m-input>
			</view>
			<view class="input-row" style="margin-top: 15rpx;">
				<text class="title">密&nbsp;&nbsp;&nbsp;&nbsp;码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="action-row" style="margin-top: 25rpx;">
			   <checkbox   id="ys" :checked="checked" @click="handleClick" style="transform:scale(0.7)" /> 已同意<navigator url="../user/ys">隐私政策与服务协议</navigator>
			 
		</view>
		<view class="btn-row" style="padding-top: 0rpx;margin-top:30rpx;"> 
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		
		<view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<text>|</text>
			<navigator url="../pwd/forget">忘记密码</navigator>
		</view>

	</view>
</template>

<script>
	import service from '../../service.js';
	 import md5 from '@/js_sdk/js-md5/src/md5.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		 data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
				checked: true,
			}
		},
		onLoad() {
			 
			 let u= service.getUsers();
			 if(u.account){
			     this.account=u.account;
			 }
			 try {
			     const value = uni.getStorageSync('password');
			     if (value) {
					 this.password=value;
			        
			     }
			 } catch (e) { 
			     // error
			 }
			 try {
			     const checked = uni.getStorageSync('checked');
			     if (checked) {
			 		 this.checked=checked;
					  
			     }
			 } catch (e) {
			     // error
			 }
			 
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			handleClick:function( ){
				  
				 this.isChecked=!this.isChecked;//需要动态改变变量值
				 this.checked=!this.isChecked
				 
				},
			checkBox(ev){
				            let that = this;
							 console.log(ev.target.checked);
				            //let box = (item.checked = !item.checked);
							//this.checked=box;
							
							// console.log(box);
					},
			bindLogin() {
				if(!this.checked){
					uni.showToast({
						icon: 'none',
						title: '请同意隐私政策与服务协议'
					});
					return;
				}
				if (this.account.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号最短为 11 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}

				const data = {
					account: this.account,
					pass: md5(this.password)
				};
				uni.showLoading({
					title: '登录中...'
				});
				var password=this.password;
				uni.request({
					url: service.login(),
					data: data,
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							try {
							     uni.setStorageSync('password', password);
								 uni.setStorageSync('checked', true);
							} catch (e) {
							    // error
							}
							 
							 
							this.toMain(data.data.data);
						} else {
							uni.showModal({
								title: '登录失败',
								content:  data.data.msg,
								showCancel: false,
								success: function(res) {
									 
								}
							});
							 
						}

					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						uni.hideLoading();
					}
				})


			},


			toMain(data) {
				this.login(data);
				service.addUser(data);
				uni.reLaunch({
					url: '../main/main',
				});
			  

			}
		},
		onReady() {

		} 
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	} 

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
