<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">手&nbsp;&nbsp;机&nbsp;&nbsp;号：</text>
				<m-input type="text" focus clearable v-model="account" placeholder="请输入手机号"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">确认密码：</text>
				<m-input type="password" displayable v-model="qpassword" placeholder="请输入确认密码"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</text>
				<m-input type="text" clearable v-model="name" placeholder="请输入名称"></m-input>
			</view>




		</view>
		<view class="btn-row">
			<block v-if="del">
				<button type="primary" class="primary"  @tap="dele" style="width: 48%;float: left;">删除</button>
				<button type="primary" class="primary" @tap="register" style="width: 48%;">保存</button>
			</block>
			<block v-if="!del">
				<button type="primary" class="primary" @tap="register"  >保存</button>
			</block>
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
				id: '',
				account: '',
				name: '',
				password: '',
				qpassword: '',
				del: false, 

			}
		},
		onLoad: function(data) { //option为object类型，会序列化上个页面传递的参数
			console.log(data.d);
			if (data.d) {
				var d = JSON.parse(data.d);
				this.id = d.id;
				this.account = d.account;
				this.name = d.name;
				this.del=true;
			}
		},
		methods: {

			dele() {
				 
				 const data = {
				 	id: this.id 
				 }
				uni.showModal({
					title: "删除",
					content: '确定要删除'+this.name+'吗？',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '删除中...'
							});
							uni.request({
								url: service.deleteUser(),
								data: data,
								success: (data) => {
									uni.hideLoading();
									if (data.statusCode == 200 && data.data.code == 0) {
										uni.showModal({
										    title: '操作成功',
										    content: '操作成功',
											showCancel:false,
										    success: function (res) {
										        if (res.confirm) {
										            uni.navigateBack({
										            	delta: 1
										            })
										        }  
										    }
										});
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
			register() {

				if (this.account.length !=11) {
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
				if (this.name.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '姓名不能为空'
					});
					return;
				}
				let u = service.getUsers();
				const data = {
					id: this.id,
					account: this.account,
					pass: md5(this.password),
					name: this.name,
					createType: "103",
					dealerId: u.dealerId,
					registerDealerName: u.registerDealerName,
					dealerName: u.dealerName,
				}
				var url = service.modifyUser();
				if (this.id.length == 0) {
					url = service.savereg();
				}
				uni.showLoading({
					title: '保存中...'
				});
				uni.request({
					url: url,
					data: data,
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							uni.showModal({
							    title: '操作成功',
							    content: '操作成功',
								showCancel:false,
							    success: function (res) {
							        if (res.confirm) {
							            uni.navigateBack({
							            	delta: 1
							            })
							        }  
							    }
							});
						} else {
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
