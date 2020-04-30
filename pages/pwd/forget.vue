<template>
	<view class="content">
		<view class="input-group" v-show="!show">
			<view class="input-row">
				<text class="title">手 &nbsp;机 &nbsp;号：</text>
				<m-input type="number" maxlength="11" focus clearable v-model="phone" placeholder="请输入手机号"></m-input>
			</view>
		</view>

		<view class="btn-row" v-show="!show">
			<button type="primary" class="primary" @tap="findPassword">发送验证码</button>
		</view>

		<view class="input-group" v-show="show">
			<view class="input-row border">
				<text class="title">验 &nbsp;证 &nbsp;码：</text>
				<m-input type="number" maxlength="11" focus clearable v-model="remarks" placeholder="请输入验证码"></m-input>
			</view>

			<view class="input-row border" v-show="show"  >
				<text class="title">新 &nbsp;密 &nbsp;码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入新密码"></m-input>
			</view>
			<view class="input-row border"  >
				<text class="title">确认密码：</text>
				<m-input type="password" displayable v-model="qpassword" placeholder="请输入确认密码"></m-input>
			</view>
		</view>
		<view class="btn-row" v-show="show">
			<button type="primary" class="primary" @tap="save">确定</button>
		</view>

	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
   import md5 from '@/js_sdk/js-md5/src/md5.js';
	export default {
		components: {
			mInput
		},
		data() {
			return {
				phone: '',
				remarks: '',
				password: '',
				qpassword: '',
				show: false,
			}
		},
		methods: {
			save() {
			
				if (this.remarks.length<4) {
					uni.showToast({
						icon: 'none',
						title: '验证码最短为 4 个字符'
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
				 if (this.qpassword != this.password) {
				 	uni.showToast({
				 		icon: 'none',
				 		title: '确认密码不正确'
				 	});
				 	return;
				 }
				  
				 
				
				
				const data = {
					account:this.phone,
					remarks:this.remarks,
					pass: md5(this.password),
				}
				 uni.showLoading({
				 	title: '修改中...'
				 });
				 var password=this.password;
				uni.request({
					url: service.forgetUserPass(),
					data: data,					
					success: (data) => { 
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							console.log(JSON.stringify(data.data));
							
							  uni.showModal({
							  	title: '重置密码成功',
							  	content:  '密码设置成功,请重新登录',
							  	showCancel: false,
							  	success: function(res) {
							  		if (res.confirm) {
										try {
										    uni.setStorageSync('password', password);
										} catch (e) {
											console.log(e.message);
										    // error
										}
							  			uni.reLaunch({
							  				url:'../login/login'
							  			})
							  		}
							  	}
							  });
						}
						else{
							uni.showModal({
							    title: '操作失败',
							    content: data.data.msg,
								showCancel:false,
							    success: function (res) {
							        if (res.confirm) {
							            
							        }  
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
			findPassword() {

				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不合法',
					});
					return;
				}
				uni.showLoading({
					title: '发送中...'
				});
				var _this = this;
				uni.request({
					url: service.sendsms(),
					data: {
						account: this.phone
					},
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							uni.showToast({
								icon: 'none',
								title: '发送验证成功请在5分钟内填写验证码'
							});
							_this.show = true;
						} else {
							uni.showModal({
								title: '发送失败',
								content: data.data.msg,
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
			}
		}
	}
</script>

<style>
.input-row .title {
		width: 100px;
		padding-left: 15px;
	}
</style>
