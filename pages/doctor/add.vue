<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title"  >选择医院：</text>
				<selectsearch   style="padding: 0;" @handleSearch="handleSearch" @change="change" placeholder="请搜索医院" :infoList="infoList" :showValue="showValue"
				 v-model="searchValue" :loading="loading" type="primary" :uniShadow="false"></selectsearch>
				
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生：</text>
				<m-input type="text" clearable v-model="doctorName" placeholder="请输入医生"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</text>
				<picker  class="pickerslect" @change="bindtechnicalChange" :value="technicalindex" :range="technicals" range-key="label">
					<view class="pickertext">{{technicals[technicalindex].label}}</view>
				</picker>

			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务：</text>
				<picker class="pickerslect" @change="binddutiesChange" :value="dutiesindex" :range="dutiess" range-key="label">
					<view class="pickertext">{{dutiess[dutiesindex].label}}</view>
				</picker>
			
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</text>
				<picker class="pickerslect" @change="bindsexChange" :value="sexindex" :range="sexs" range-key="label">
					<view class="pickertext">{{sexs[sexindex].label}}</view>
				</picker>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族：</text>
				<m-input type="text" clearable v-model="nation" placeholder="请输入民族"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">手&nbsp;&nbsp;机&nbsp;&nbsp;号：</text>
				<m-input type="text" clearable v-model="tel" placeholder="请输入手机号"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</text>
				<m-input type="text" clearable v-model="remarks" placeholder="请输入备注"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<block v-if="del">
				<button type="primary" class="primary"  @tap="dele" style="width: 48%;float: left;">删除</button>
				<button type="primary" class="primary" @tap="save" style="width: 48%;">修改</button>
			</block>
			<block v-if="!del">
				<button type="primary" class="primary" @tap="save"  >保存</button>
			</block>
			 
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	 import selectsearch from '../../components/LvXingChen-select-search/LvXingChen-select-search.vue'
	 
	import LbPicker from '@/components/lb-picker'
	export default {
		components: {
			LbPicker,
			selectsearch,
			mInput
		},
		onLoad: function(data) { //option为object类型，会序列化上个页面传递的参数
			if (data.d) {
				var option = JSON.parse(decodeURIComponent(data.d));
				this.id = option.id;
				this.hospitalName = option.hospitalName;
				this.doctorName = option.doctorName;
				this.sex = option.sex;
				this.searchValue= option.hospitalName;
				this.technical = option.technical;
				this.duties = option.duties;
				this.remarks = option.remarks;
				this.tel = option.tel;
				this.nation = option.nation;
				this.del=true;
			}
			this.queryDictData();
		},
		data() {
			return {
				del:false,
				id: "",
				hospitalName: "",
				doctorName: "",
				technical: "",
				duties: "",
				sex: "",
				nation: "",
				remarks: "",
				tel: "",
				technicals: [{ 
					"value": "",
					"label": "请选择职称" 
				}],
				technicalindex: 0,
				
				dutiess: [{
					"value": "",
					"label": "请选择职务" 
				}],
				dutiesindex: 0,
				
				sexs: [{ 
					"value": "",
					"label": "请选择性别" 
				}],
				sexindex: 0,
				loading: false,
				showValue: 'name', // 需要显示的数据，必须与infoList中的name对应
				searchValue: '',
				infoList: [], 
			}
		},

		methods: {
			handleSearch() {
				 
			                this.loading = true
							var _this=this;
							_this.infoList=[];
			                setTimeout(() => {
								 
								var url="https://restapi.amap.com/v3/place/text?key=15ef307a070046bf1d74521e889c7cc6&keywords="+this.searchValue+"&types=09&children=1&offset=10&page=1&extensions=base";
			                    this.loading = false
								uni.request({
									url:url,
								success: (data) => {
									if (data.statusCode == 200 && data.data.status == 1) {
										
										  
										  _this.infoList=data.data.pois;
										  console.log(JSON.stringify(_this.infoList));
										  
												 
										  
									}
											
								},
								fail: (data, code) => {
									console.log('fail' + JSON.stringify(data));
											
								},
								})
			                }, 1000)
			            },
				change(val){
					this.hospitalName=val.name;
					console.log(val);
				},
			dele() {
				 
				 const data = {
				 	id: this.id 
				 }
				uni.showModal({
					title: "删除",
					content: '确定要删除'+this.doctorName+'吗？',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '删除中...'
							});
							uni.request({
								url: service.deleteUserDoctor(),
								data: data,
								success: (data) => {
									uni.hideLoading();
									if (data.statusCode == 200 && data.data.code == 0) {
										uni.showToast({
											title: '操作成功',
											duration: 3000,
											success() {
												uni.navigateBack({
													delta: 1
												})
											}
										})
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
			queryDictData() {
				let data = {
					type: 'sex,technical,duties',
				}
				var _this = this;
				uni.request({
					url: service.queryDict(),
					data: data,
					success: (data) => {

						if (data.statusCode == 200 && data.data.code == 0) {
						 	var _data = data.data.data;
							_this.technicals =_this.technicals.concat(_data['technical']);
							_this.technicals.forEach(function(v,index){  
							    if(v.value==_this.technical){
									_this.technicalindex=index;
								}
							});
							
							_this.dutiess =_this.dutiess.concat(_data['duties']);
							_this.dutiess.forEach(function(v,index){  
							    if(v.value==_this.duties){
									_this.dutiesindex=index;
								}
							});
							_this.sexs  =_this.sexs.concat(_data['sex']);
							 _this.sexs.forEach(function(v,index){
							    if(v.value==_this.sex){
							    	_this.sexindex=index;
							    }
							 });

						}

					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));

					}
				})
			},
			chospital() {
				var _this = this;
				uni.chooseLocation({
					success: function(res) {
						_this.hospitalName = res.name;
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
			binddutiesChange: function(e) {
				this.dutiesindex = e.target.value;
				this.duties = this.dutiess[e.target.value].value;
			},
			bindtechnicalChange: function(e) {
				this.technicalindex = e.target.value;
				this.technical = this.technicals[e.target.value].value;
			},
			bindsexChange: function(e) {
				this.sexindex = e.target.value;
				this.sex = this.sexs[e.target.value].value;
			},
			save() {
				if (this.hospitalName.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择医院'
					});
					return;
				}
				if (this.doctorName.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写医生'
					});
					return;
				}
				 
				if (this.duties.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择职务'
					});
					return;
				}
				if (this.technical.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择职称'
					});
					return;
				}
				if (this.sex.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择性别'
					});
					return;
				}
				let user = service.getUsers();
				var data = {
					"user.id":user.id,
					id: this.id,
					hospitalName: this.hospitalName,
					doctorName: this.doctorName,
					sex: this.sex,
					duties: this.duties,
					technical: this.technical,
					remarks: this.remarks,
					tel: this.tel,
					nation: this.nation
				}
				uni.showLoading({
					title: '保存中...'
				});
				uni.request({
					url: service.saveUserDoctor(),
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
