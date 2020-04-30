<template>
	<view class="content">
		<view class="input-group">
			 <view class="input-row border" style="padding-top: 15rpx;">
			 	<text class="title">原&nbsp;&nbsp;密&nbsp;码：</text>
			 	<m-input type="text" clearable v-model="account" placeholder="请输入原密码"></m-input>
			 </view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">新&nbsp;&nbsp;密&nbsp;码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入新密码"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">确认密码：</text>
				<m-input type="password" displayable v-model="qpassword" placeholder="请输入确认密码"></m-input>
			</view>
			
 


		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">确定</button>
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
				account: '',  
				password: '',
				qpassword: '',
				 
			}
		},
		methods: {
			 
			register() {

				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '原密码最短为 6 个字符'
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
				if (this.qpassword.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '确认密码最短为 6 个字符'
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
					id:service.getUsers().id,
					account: md5(this.account),
					pass: md5(this.password),
				}
				 uni.showLoading({
				 	title: '修改中...'
				 });
				uni.request({
					url: service.modifyUserPass(),
					data: data,					
					success: (data) => { 
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							  uni.showToast({
							  	title: '操作成功',
									duration:3000,
							  	success() {
							  	 uni.navigateBack({
							  	 	delta:1
							  	 })
							  	}
							  })
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
