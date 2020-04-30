<template>
	<view class="content">
		 
		<view class="input-group">
			<view class="input-row border"  >
				<text class="title">手术日期：</text>
				<picker mode="date" :value="operateDate" @change="bindbeginDateChange">
					<view class="uni-input">{{operateDate}}</view>
				</picker>
			</view>
			 <view class="input-row border">
			 	<text class="title" @tap="handleTap('picker2')">选择省市：</text>
			 	<view @tap="handleTap('picker2')"  >{{provicesvalue}}</view>
			 	<lb-picker ref="picker2" v-model="provicesvalue" mode="multiSelector" :list="provices" :level="2"  @confirm="handleConfirm" >
			 	</lb-picker>
			 </view>
			<!-- <view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：</text>
				<picker @change="bindhosptailChange" :value="hosptailindex" :range="hosptails" range-key="name">
					<view class="uni-input">{{hosptails[hosptailindex].name}}</view>
				</picker>
			</view>

			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生：</text>
				<picker @change="binddoctorChange" :value="doctorindex" :range="doctors" range-key="name">
					<view class="uni-input">{{doctors[doctorindex].name}}</view>
				</picker>
			</view>


			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">手术类别：</text>
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="paramName">
					<view class="uni-input">{{array[index].paramName}}</view>
				</picker>
			</view>

			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">患者姓名：</text>
				<m-input type="text" clearable v-model="name"  placeholder="请输入姓名"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">患者性别：</text>
				<picker @change="bindsexChange" :value="sexindex" :range="sexs" range-key="paramName">
					<view class="uni-input">{{sexs[sexindex].paramName}}</view>
				</picker>
			</view> -->
		</view>
		
		<uni-collapse>
			<uni-collapse-item title="图片信息"  >
				图片信息
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="产品信息"  >
				产品信息
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="评分建议"  >
				评分建议
			</uni-collapse-item>
		</uni-collapse>
		<view class="btn-row" >
			<button type="primary" class="primary" style="width: 48%;float: left;">保存</button>
			<button type="primary" class="primary" style="width: 48%;">提交</button>
		</view>


	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker'
	import areaData from './area-data-min'
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
    import md5 from '@/js_sdk/js-md5/src/md5.js'; 
	export default {
		components: {
			LbPicker,
			mInput,
			uniCollapse,
			uniCollapseItem
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				operateDate:currentDate,
				
				
				provices:areaData,
				provice:"",
				city:"",
				provicesvalue:[],
				provicesname:"选择省市",
				
				
				
				hosptailindex:0,
				hosptails:[{"id":"",name:""} ],
				hosptail:"",
				
				
				doctorindex:0,
				doctors:[{"id":"",name:""} ],
				doctor:"",
				
				sexindex:0,
				sexs:[{"id":"",paramName:"选择性别"} ],
				sex:"",
				
				surgeryId: '',
				index: 0,
				array: [{"id":"","isNewRecord":false,"base":{"id":"","isNewRecord":false,"baseTypeName":""},
				"paramCode":" ","paramName":"全部","status":"","seqno":""} ],
				
				
				account: '',
				name: '',
				password: '',
				qpassword: '',
				createType: '',
				registerDealerName: '',
				
				
			}
		},
		  onLoad:function(data){
			  this.getprovice();
			this.queryBaseData();
			
		},
		methods: {
			bindhosptailChange: function(e) {
				this.hosptailindex = e.target.value;
				this.hosptail=this.hosptails[e.target.value].id;
				this.querydoctor();
			},
			binddoctorChange: function(e) {
				this.doctorindex = e.target.value;
				this.doctor=this.doctors[e.target.value].id;
			},
			getprovice(){
				var _this = this;
				uni.request({
					url: service.queryProvince(),
					success: (data) => {
				
						if (data.statusCode == 200 && data.data.code == 0) {
							console.log(JSON.stringify(data.data.data))
							// _this.provices= data.data.data;
						}
				
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
				
					}
				})
			},
			handleTap(picker) {
				this.$refs[picker].show()
			},
			 
			handleConfirm(e) {
				//console.log(e.item.label) // 选项1
				console.log(this.provicesvalue)
				//this.provicesname=e.item.map(item => item.label).join('-');
				console.log(this.provicesname)
				//this.provice=this.provicesvalue[0];
				//this.city=this.provicesvalue[1];
				//this.queryhosptail();
				console.log('confirm::', e)
			},
			 
			queryBaseData() {
				 
				let data = {
					type: '手术类别,性别',
				}
			
				var _this = this;
				uni.request({
					url: service.queryBaseData(),
					data: data,
					success: (data) => {
						  
						if (data.statusCode == 200 && data.data.code == 0) {
							
							_this.array=_this.array.concat(data.data.data['手术类别'][0].basedataList);
							_this.sexs=_this.sexs.concat(data.data.data['性别'][0].basedataList);
							 console.log(JSON.stringify(_this.sexs))
						}  
			            
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
						 
					}
				})
			},
			getDate(type) {
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			            month = month > 9 ? month : '0' + month;;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			        }
			    ,
			 bindPickerChange: function(e) {
				console.log(this.array[e.target.value].id + 'picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value;
				this.surgeryId=this.array[e.target.value].id;
			},
			bindsexChange: function(e) {
				 
				this.sexindex = e.target.value;
				this.sex=this.array[e.target.value].id;
			},
			queryhosptail(){
				var _this = this;
				uni.request({
					data:{
						parentCode:_this.city
					},
					url: service.queryhosptail(),
					success: (data) => {
				
						if (data.statusCode == 200 && data.data.code == 0) {
							 _this.hosptails= data.data.data;
						}
				
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
				
					}
				})
			},
			querydoctor(){
				uni.showLoading({
					title: '加载中...'
				});
				let user = service.getUsers();
				let data = {
					"user.id":user.id,					 
					hospitalName:this.hospitalName 
				}
				
				var _this = this;
				uni.request({
					url: service.queryListUserDoctor(),
					data: data,
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							if(data.data.data){
							_this.doctors = data.data.data;
							}
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
			},
			register() {

				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
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
 
