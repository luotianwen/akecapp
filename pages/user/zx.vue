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
			save(){
				var _this=this;
				uni.showModal({
					title: "注销账户",
					content: '确定要注销账户吗？',
					success: (res) => {
						if (res.confirm) {
							 _this.save2();
						}
					}
				
				})
			},
			save2() {
			
				if (this.remarks.length<4) {
					uni.showToast({
						icon: 'none',
						title: '验证码最短为 4 个字符'
					});
					return;
				}
			 
				  
				 
				
				
				const data = {
					account:this.phone,
					remarks:this.remarks,
					 
				}
				 uni.showLoading({
				 	title: '修改中...'
				 });
				 
				uni.request({
					url: service.outUser(),
					data: data,					
					success: (data) => { 
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							 
							
							  uni.showModal({
							  	title: '注销成功',
							  	content:  '注销成功',
							  	showCancel: false,
							  	success: function(res) {
							  		if (res.confirm) {
										 
							  			uni.reLaunch({
							  				url:'../login/login'
							  			})
							  		}
							  	}
							  });
						}
						else{
							uni.showToast({
								title:data.data.msg 
							})
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
