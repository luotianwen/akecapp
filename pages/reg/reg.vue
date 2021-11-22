<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">手&nbsp;机&nbsp;&nbsp;号：</text>
				<m-input type="text" focus clearable v-model="account" placeholder="请输入手机号"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">确认密码：</text>
				<m-input type="password" displayable v-model="qpassword" placeholder="请输入确认密码"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</text>
				<m-input type="text" clearable v-model="name" placeholder="请输入姓名"></m-input>
			</view>

			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">所属单位：</text>
				<m-input type="text" clearable v-model="registerDealerName" placeholder="请输入所属单位"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">用户类型：</text>
				<picker class="pickerslect" @change="bindPickerChange" :value="index" :range="array" range-key="name">
					<view class="pickertext">{{array[index].name}}</view>
				</picker>
			</view>


		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
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
				name: '',
				password: '',
				qpassword: '',
				createType: '101',
				registerDealerName: '',
				array: [],
				index: 0,
			}
		},
		onLoad: function(data) {
		
			this.queryBaseData();
			 
		},
		methods: {
			queryBaseData() {
			
				let data = {
					type: '业务员类型',
				}
			
				var _this = this;
				uni.request({
					url: service.queryBaseData(),
					data: data,
					success: (data) => {
			
						if (data.statusCode == 200 && data.data.code == 0) {
			
							var a  = (data.data.data['业务员类型'][0].basedataList);
							
							a.forEach(function(item){
								if(item.paramCode!='103')
								_this.array.push({
									name: item.paramName,
									id: item.paramCode
								})
							});
							
							  
						}
			
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
			
					}
				})
			},
			bindPickerChange: function(e) {
				console.log(this.array[e.target.value].id + 'picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value;
				this.createType=this.array[e.target.value].id;
			},
			register() {

				if (this.account.length !=11) {
					uni.showToast({
						icon: 'none',
						title: '手机号为 11 个字符'
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
				if (this.name.length ==0) {
					uni.showToast({
						icon: 'none',
						title: '姓名不能为空'
					});
					return;
				}
				if (this.registerDealerName.length ==0) {
					uni.showToast({
						icon: 'none',
						title: '单位不能为空'
					});
					return;
				}
				
				
				const data = {
					account: this.account,
					pass: md5(this.password),
					registerDealerName: this.registerDealerName,
					createType: this.createType,
					name: this.name
				}
				 uni.showLoading({
				 	title: '注册中...'
				 });
				uni.request({
					url: service.savereg(),
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
