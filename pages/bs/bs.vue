<template>
	<view class="content">

		<view class="input-group">
			<view class="input-row border">
				<text class="title">开始日期：</text>
				<picker class="pickerslect" mode="date" :value="operateDate" @change="bindoperateDateChange">
					<view class="pickertext">{{operateDate}}</view>
				</picker>
			</view>
			<view class="input-row border">
				<text class="title">结束日期：</text>
				<picker class="pickerslect" mode="date" :value="operateeDate" @change="bindoperateeDateChange">
					<view class="pickertext">{{operateeDate}}</view>
				</picker>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">选择医院：</text>
				<selectsearch style="padding: 5px  0  0 8rpx;" @handleSearch="handleSearch" @change="change" placeholder="请搜索医院" :infoList="infoList"
				 :showValue="showValue" v-model="searchValue" :loading="loading" type="primary" :uniShadow="true"></selectsearch>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title" >医院台数：</text>
				<m-input type="number" class="pickertext" clearable v-model="unitCount" placeholder="请输入报告期间医院台数"></m-input>
			</view>

			<!-- <view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">手术类别：</text>
				<picker class="pickerslect" @change="bindPickerChange" :value="index" :range="array" range-key="label">
					<view class="pickertext">{{array[index].label}}</view>
				</picker>
			</view> -->
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title"  >爱康手术：</text>
				<picker class="pickerslect" @change="bindakChange" :value="akindex" :range="aks" range-key="label">
					<view class="pickertext">{{aks[akindex].label}}</view>
				</picker>

			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">爱康台数：</text>
				  <label class="pickertext" style="padding-left: 8rpx;" v-if="akCount==0">系统自动求和</label>
				<label class="pickertext" style="padding-left: 8rpx;" v-else> {{akCount}}</label> 
			</view>
		</view>
		<uni-collapse ref="add" :accordion="true">
			<uni-collapse-item title="手术明细信息">
				<view class="btn-row">

					<button type="primary" class="primary" size="mini" @tap="add" style="width: 48%;">添加</button>
				</view>
				<uni-list>
					<block v-for="(tab,index1) in products" :key="index1">

						<uni-card :title="'ak台数:'+tab.akCount" :note="'产品类型:'+tab.type" :extra="'产品类型:'+tab.typename" :isShadow="isShadow">
							<text class="content-box-text">医生:{{tab.doctor}} 备注:{{tab.remarks}}</text>
							<block slot="footer">
								<view class="footer-box">
									<view class="" @click.stop="footerClick(tab,index1)"><text class="footer-box__item"> 删除</text></view>
								</view>
							</block>
						</uni-card>

					</block>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>


		<view class="btn-row">
			<button type="primary" class="primary" @tap="save" style="width: 48%;float: left;">保存</button>
			<button type="primary" class="primary" @tap="register" style="width: 48%;">提交</button>
		</view>


		<uni-popup ref="popup" type="center" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">添加手术</text>
				<text class="uni-tip-content">  
					<view class="input-group">
						<view class="input-row border" style="padding-top: 1rpx;">
							<text class="title">选择医生：</text>
							<uni-combox class="pickerslect2 pickertext" :candidates="doctors" placeholder="请选择医生" v-model="doctor"></uni-combox>
						</view>


						<view class="input-row border">
							<text class="title">产品类型：</text>
							<picker class="pickerslect" @change="bindptypesPickerChange" :value="ptypeindex" :range="ptypes" range-key="label">
								<view class="pickertext">{{ptypes[ptypeindex].label}}</view>
							</picker>

						</view>
						<view class="input-row border">
							<text class="title">爱康台数：</text>
							<m-input type="number" v-model="addakcount" style="width: 90%;  " placeholder="请输入ak台数"></m-input>
						</view>
						<view class="input-row border">
							<text class="title">备&nbsp;&nbsp;&nbsp;&nbsp;注：</text>
							<m-input type="text" clearable v-model="addnote" style="  width: 90%;  "
							 placeholder="请输入备注"></m-input>
						</view>

					</view>
				</text>
				<view class="uni-tip-group-button">
					<button type="primary" class="primary" @tap="btnCancel">取消</button>
					<button type="primary" class="primary" @tap="btnConfirm">确定</button>

				</view>

			</view>
		</uni-popup>

		 



	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniCombox from "@/components/uni-combox/uni-combox"
	import LbPicker from '@/components/lb-picker'
	import service from '../../service.js';
	import mInput from '@/components/m-input.vue';
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import md5 from '@/js_sdk/js-md5/src/md5.js';
	import selectsearch from '@/components/LvXingChen-select-search/LvXingChen-select-search.vue'
	export default {
		components: {
			LbPicker,
			mInput,
			uniCollapse,
			uniCollapseItem,
			uniCombox,
			uniPopup,
			uniRate,
			uniSection,
			selectsearch,
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				id: "",
				operateDate: '选择日期',
				operateeDate: '选择日期',
				provice: "",
				city: "",
				provicesvalue: [],
				provicesname: "选择省市",
				provices: [],

				hospitalName: "",
				hosptail: "",

				loading: false,
				showValue: 'name', // 需要显示的数据，必须与infoList中的name对应
				searchValue: '',
				infoList: [],

				doctorsall: [],
				doctors: [],
				doctor: "",






				ptypeindex: 0,
				ptypes: [{
					"id": "",
					"paramName": "选择产品类型",

				}],
				ptype: "1",
				ptypename: "AK膝",

				isShadow: true,
				unitCount: "",
				akCount: 0,
				products: [],


				ak: "",
				aks: [{
					"value": "",
					"label": "选择是否开展爱康手术"
				}],
				akindex: 0,

				addakcount: "",
				addnote: "",
			}
		},

		onLoad: function(data) {

			this.queryBaseData();
			if (data.id) {
				this.id = data.id;
				this.getData();
			}

		},
		methods: {
			getData() {
				this.list = [];
				uni.showLoading({
					title: '加载中...'
				});
				let data = {
					id: this.id
				}

				var _this = this;
				uni.request({
					url: service.getReportStandbookOperation(),
					data: data,
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							if (data.data.data) {
								var d = data.data.data;
								console.log(JSON.stringify(data.data.data));
								_this.operateDate = d.operateDate;
								_this.operateeDate = d.operateEdate;
								_this.searchValue = d.hospitalName;
								_this.hospitalName = d.hospitalName;
								_this.querydoctor();
								_this.unitCount = d.unitCount;
								_this.provice = d.provinceName;
								_this.city = d.cityName;
								_this.provicesname = _this.provice + "-" + _this.city;

								_this.akCount = d.akCount;

								_this.ak = d.ak;
								_this.aks.forEach((item, index) => {
									if (item.value == d.ak) {
										_this.akindex = index;
									}

								});
								if (d.reportStandbookOperationDetailList) {
									d.reportStandbookOperationDetailList.forEach((item, index) => {

										_this.products.push({
											doctor: item.doctor,
											akCount: item.akCount,
											type: item.type,
											typename: item.typename,
											remarks: item.remarks
										});
									});
								}


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
			handleSearch() {

				this.loading = true
				var _this = this;
				_this.infoList = [];
				setTimeout(() => {
					var _city = this.provicesname.split("-")[1];
					var url = "https://restapi.amap.com/v3/place/text?key=15ef307a070046bf1d74521e889c7cc6&keywords=" + this.searchValue +
						"&types=09&children=1&offset=20&page=1&extensions=base";
					this.loading = false
					uni.request({
						url: url,
						success: (data) => {
							if (data.statusCode == 200 && data.data.status == 1) {
								_this.infoList = data.data.pois;
							}

						},
						fail: (data, code) => {
							console.log('fail' + JSON.stringify(data));

						},
					})
				}, 1000)
			},
			change(val) {
				this.hosptail = val.name;
				this.hospitalName = val.name;
				this.provice = val.pname;
				if (val.pname.indexOf("北京") != -1 || val.pname.indexOf("天津") != -1 ||
					val.pname.indexOf("上海") != -1 || val.pname.indexOf("重庆") != -1) {
					this.city = val.adname;
				} else {
					this.city = val.cityname;
				}
				this.provicesname = this.provice + "-" + this.city;

				this.querydoctor();

			},
			bindoperateDateChange: function(e) {
				this.operateDate = e.target.value
			},
			bindoperateeDateChange: function(e) {
				this.operateeDate = e.target.value
			},

			footerClick(tab, index) {
				var _this = this;
				console.log("index" + index);
				uni.showModal({
					title: "删除",
					content: '确定要删除吗？',
					success: (res) => {
						if (res.confirm) {
							_this.products.splice(index, 1);
						}
					}

				})
			},


			btnCancel() {
				this.$refs.popup.close();
			},
			btnConfirm() {
				if(this.doctor.length==0){
					uni.showToast({
						title:"医生必须选择!"
					})
					return;
				}	
				if(this.addakcount.length==0){
					uni.showToast({
						title:"爱康台数必须填!"
					})
					return;
				}	
				 
				this.$refs.popup.close();
				this.products.push({
					doctor: this.doctor,
					akCount: this.addakcount,
					type: this.ptype,
					typename: this.ptypename,
					remarks: this.addnote
				});
				var _akCount = 0;
				this.products.forEach((item, index) => {
					_akCount += parseInt(item.akCount);
				});
				this.akCount = _akCount;
			},
			add() {
				this.$refs.popup.open();
			},


			close(e) {
				this.phos.splice(e, 1);
			},

			handleTap(picker) {
				this.$refs[picker].show()
			},

			queryBaseData() {

				let data = {
					type: 'operate_product_type,yes_no',
				}

				var _this = this;
				uni.request({
					url: service.queryDict(),
					data: data,
					success: (data) => {

						if (data.statusCode == 200 && data.data.code == 0) {
							var _data = data.data.data;
							// _this.array = _data['operate_type'];
							  _this.ptypes = data.data.data['operate_product_type'];
							_this.aks =_this.aks.concat(_data['yes_no']) ;
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
			},
			bindakChange: function(e) {
				this.akindex = e.target.value;
				this.ak = this.aks[e.target.value].value;
			},

			bindptypesPickerChange: function(e) {

				this.ptypeindex = e.target.value;
				this.ptype = this.ptypes[e.target.value].value;
				this.ptypename = this.ptypes[e.target.value].label;
			},

			querydoctor() {
				uni.showLoading({
					title: '加载中...'
				});
				let user = service.getUsers();
				let data = {
					"user.id": user.id,
					hospitalName: this.hospitalName
				}

				var _this = this;
				uni.request({
					url: service.queryListUserDoctor(),
					data: data,
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							if (data.data.data) {
								_this.doctorsall = data.data.data;
								_this.doctors = [];
								var x;
								for (x in _this.doctorsall) {
									_this.doctors.push(_this.doctorsall[x].doctorName);
								}

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
			save() {

				if (this.operateDate == '选择日期') {
					uni.showToast({
						icon: 'none',
						title: '请选择开始日期'
					});
					return;
				}
				if (this.operateeDate == '选择日期') {
					uni.showToast({
						icon: 'none',
						title: '请选择结束日期'
					});
					return;
				}
				console.log(this.operateDate.substring(0,7));
				
				if (this.operateDate.substring(0,7)!=this.operateeDate.substring(0,7)) {
					uni.showToast({
						icon: 'none',
						title: '请确定结束日期与开始日期在同一个月'
					});
					return;
				}
				 
				if (this.operateDate.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择日期'
					});
					return;
				}
				if (this.operateDate.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择日期'
					});
					return;
				}
				if (this.hospitalName.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择医院'
					});
					return;
				}


				if (this.unitCount.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写医院台数'
					});
					return;
				}

				if (this.ak.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择是否开展手术'
					});
					return;
				}

				let user = service.getUsers();



				var _data = "";
				_data = "?user=" + user.id;
				_data = _data + "&id=" + this.id;
				_data = _data + "&userName=" + user.name;
				var _provinceName = this.provicesname.split("-");
				_data = _data + "&provinceName=" + _provinceName[0];
				_data = _data + "&cityName=" + _provinceName[1];
				/* _data = _data + "&surgeryId=" + this.surgeryId;
				_data = _data + "&surgeryGrade=" + this.surgeryGrade; */
				_data = _data + "&akCount=" + this.akCount;
				_data = _data + "&ak=" + this.ak;
				_data = _data + "&unitCount=" + this.unitCount;
				_data = _data + "&status=0";
				_data = _data + "&operateDate=" + this.operateDate;
				_data = _data + "&operateEdate=" + this.operateeDate;
				_data = _data + "&hospitalName=" + this.hospitalName;

				this.products.forEach((item, index) => {
					_data = _data + "&reportStandbookOperationDetailList[" + index + "].doctor=" + item.doctor;
					_data = _data + "&reportStandbookOperationDetailList[" + index + "].akCount=" + item.akCount;
					_data = _data + "&reportStandbookOperationDetailList[" + index + "].type=" + item.type;
					_data = _data + "&reportStandbookOperationDetailList[" + index + "].typename=" + item.typename;
					_data = _data + "&reportStandbookOperationDetailList[" + index + "].remarks=" + item.remarks;


				});

				console.log(_data);
				uni.showLoading({
					title: '提交中...'
				});
				uni.request({
					url: service.saveReportStandbookOperation() + encodeURI(_data),
					method: "POST",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							uni.showModal({
								title: '操作成功',
								content: '操作成功',
								showCancel: false,
								success: function(res) {
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
			register() {
				if (this.operateDate == '选择日期') {
					uni.showToast({
						icon: 'none',
						title: '请选择开始日期'
					});
					return;
				}
				if (this.operateeDate == '选择日期') {
					uni.showToast({
						icon: 'none',
						title: '请选择结束日期'
					});
					return;
				}

				if (this.operateDate.substring(0,7)!=this.operateeDate.substring(0,7)) {
					uni.showToast({
						icon: 'none',
						title: '请确定结束日期与开始日期在同一个月'
					});
					return;
				}
				if (this.hospitalName.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择医院'
					});
					return;
				}


				if (this.unitCount.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写医院台数'
					});
					return;
				}
				/* if (this.surgeryId.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择手术类别'
					});
					return;
				} */
				if (this.ak.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择是否开展手术'
					});
					return;
				}
				console.log(this.ak == 1 && this.products.length == 0);
				if (this.ak == 1 && this.products.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请添加手术'
					});
					return;
				}
				if (this.akCount.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写爱康台数'
					});
					return;
				}

				let user = service.getUsers();



				var _data = "";
				_data = "?user=" + user.id;
				_data = _data + "&id=" + this.id;
				_data = _data + "&userName=" + user.name;
				var _provinceName = this.provicesname.split("-");
				_data = _data + "&provinceName=" + _provinceName[0];
				_data = _data + "&cityName=" + _provinceName[1];
				/* _data = _data + "&surgeryId=" + this.surgeryId;
				_data = _data + "&surgeryGrade=" + this.surgeryGrade; */
				_data = _data + "&ak=" + this.ak;
				_data = _data + "&akCount=" + this.akCount;
				_data = _data + "&unitCount=" + this.unitCount;
				_data = _data + "&status=1";
				_data = _data + "&operateDate=" + this.operateDate;
				_data = _data + "&operateEdate=" + this.operateeDate;
				_data = _data + "&hospitalName=" + this.hospitalName;

				this.products.forEach((item, index) => {

					_data = _data + "&reportStandbookOperationDetailList[" + index + "].doctor=" + item.doctor;
					_data = _data + "&reportStandbookOperationDetailList[" + index + "].akCount=" + item.akCount;
					_data = _data + "&reportStandbookOperationDetailList[" + index + "].type=" + item.type;
					_data = _data + "&reportStandbookOperationDetailList[" + index + "].typename=" + item.typename;
					_data = _data + "&reportStandbookOperationDetailList[" + index + "].remarks=" + item.remarks;


				});

				console.log(_data);
				uni.showLoading({
					title: '提交中...'
				});
				uni.request({
					url: service.saveReportStandbookOperation() + encodeURI(_data),
					method: "POST",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							uni.showModal({
								title: '操作成功',
								content: '操作成功',
								showCancel: false,
								success: function(res) {
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
	/* .input-row .title {
		width: 150px;
		padding-left: 15px;
	} */
	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;

	}

	.footer-box__item {
		align-items: center;
		padding: 10rpx 0;
		font-size: 30rpx;
		color: #666;
	}

	.close-view {
		text-align: center;
		line-height: 14px;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: #FF5053;
		color: #FFFFFF;
		position: absolute;
		top: -6px;
		right: -4px;
		font-size: 12px;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	.input-row .title {
		width: 100px;
		padding-left: 15px;
	}

	/* 提示窗口 */
	.uni-tip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		width: 300px;
		background-color: #fff;
		border-radius: 10px;
	}

	.uni-tip-title {
		margin-bottom: 10px;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		/* padding: 15px;
	*/
		font-size: 14px;
		color: #666;
	}

	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		margin-top: 20px;
	}

	.uni-tip-button {

		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}
	.pickerslect2{
		    margin-top: 0rpx;
			margin-left: 8rpx;
			 height: 40px;
		  /*  padding: 12px 20px;*/
		    line-height: 40px; 
		    font-size: 16px;
		    background: #FFF;
		    -webkit-box-flex: 1;
		    -webkit-flex: 1;
		    flex: 1;
	}
</style>
