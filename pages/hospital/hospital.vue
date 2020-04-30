<template>
	<view class="content">

		<view class="input-group">
 
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">选择医院：</text>
				<selectsearch style="padding: 5px  0  0 8rpx;" @handleSearch="handleSearch" @change="change" placeholder="请搜索医院" :infoList="infoList"
				 :showValue="showValue" v-model="searchValue" :loading="loading" type="primary" :uniShadow="true"></selectsearch>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</text>
				<picker class="pickerslect" mode="date" fields="year" :start="startDate" :end="endDate" :value="year" @change="bindoperateDateChange">
					<view class="pickertext">{{year}}</view>
				</picker>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">医院台数：</text>
				<m-input class="pickertext" type="number" v-model="unitCount"   placeholder="请输入医院台数"></m-input>
			 
			</view>
			<!-- <view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">爱康台数：</text>
				<label class="pickertext" v-if="akCount==0"> 系统自动求和</label>
				<label class="pickertext" v-else>{{akCount}}</label>
			</view> -->
		</view>
		<uni-collapse ref="add" :accordion="true">
			<uni-collapse-item title="医院产品入院信息">
				<view class="btn-row">

					<button type="primary" class="primary" size="mini" @tap="add" style="width: 48%;">添加</button>
				</view>
				<uni-list>
					<block v-for="(tab,index1) in products" :key="index1">

						<uni-card :title="'产品类型:'+tab.typename" :note="'产品类别:'+tab.typename" :extra="'是否入院:'+aks[tab.akindex].label"
						 :isShadow="isShadow">
							<text class="content-box-text"> 备注:{{tab.remarks}}</text>
							<block slot="footer">
								<view class="footer-box">
									<view class="" @click.stop="footerClick(tab,index1,1)"><text class="footer-box__item"> 删除</text></view>
								</view>
							</block>
						</uni-card>

					</block>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>

		<!-- <uni-collapse ref="add" :accordion="true">
			<uni-collapse-item title="医院年度手术量">
				<view class="btn-row">

					<button type="primary" class="primary" size="mini" @tap="addcount" style="width: 48%;">添加</button>
				</view>
				<uni-list>
					<block v-for="(tab,index1) in counts" :key="index1">

						<uni-card :title="'AK手术台数:'+tab.akCount" :note="'产品类别:'+tab.typename" :extra="'产品类别:'+tab.typename" :isShadow="isShadow">
							<text class="content-box-text"> 备注:{{tab.remarks}}</text>
							<block slot="footer">
								<view class="footer-box">
									<view class="" @click.stop="footerClick(tab,index1,2)"><text class="footer-box__item"> 删除</text></view>
								</view>
							</block>
						</uni-card>

					</block>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
 -->
		<view class="btn-row">

			<button type="primary" class="primary" @tap="register">提交</button>
		</view>


		<uni-popup ref="popup" type="center" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title" v-show="flag==1">添加产品</text>
				<!-- <text class="uni-tip-title" v-show="flag==2">添加手术量</text> -->
				<text class="uni-tip-content">  
					<view class="input-group">



						<view class="input-row border">
							<text class="title">产品类型：</text>
							<picker class="pickerslect" @change="bindptypesPickerChange" :value="ptypeindex" :range="ptypes" range-key="label">
								<view class="pickertext">{{ptypes[ptypeindex].label}}</view>
							</picker>

						</view>
					<!-- 	<view class="input-row border" v-show="flag==2">

							<text class="title">爱康台数：</text>
							<m-input type="text" v-model="addakcount" style="width: 90%;  margin: 10 10upx;" placeholder="请输入ak台数"></m-input>
						</view> -->
						<view class="input-row border" v-show="flag==1">
							<text class="title">是否入院：</text>
							<picker class="pickerslect" @change="bindakChange" :value="akindex" :range="aks" range-key="label">
								<view class="pickertext">{{aks[akindex].label}}</view>
							</picker>
						</view>
						<view class="input-row border">
							<text class="title">备&nbsp;&nbsp;&nbsp;&nbsp;注：</text>
							<m-input type="text" clearable v-model="addnote" style="padding-top: 10rpx; width: 90%;  margin: 10 10upx;"
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
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import service from '../../service.js';
	import mInput from '@/components/m-input.vue';
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'

	import selectsearch from '@/components/LvXingChen-select-search/LvXingChen-select-search.vue'

	function getDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 30;
		} else if (type === 'end') {
			year = year;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}`;
	}
	export default {
		components: {

			mInput,
			uniCollapse,
			uniCollapseItem,
			selectsearch,
		},
		data() {

			return {
				id: "",
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




				ptypeindex: 0,
				ptypes: [{
					"id": "",
					"value": "",
					"label": "选择类型",

				}],
				ptype: "1", 
				ptypename: "膝",

				isShadow: true,
				unitCount: "",
				akCount: 0,
				products: [],
				counts: [],

				ak: "1",
				aks: [{
					"value": "1",
					"label": "是"
				}],
				akindex: 0,
				status: 1,

				 
				addakcount: "",
				addnote: "",
				flag: "1",
				year:"选择年度",
				startDate: getDate('start'),
				endDate: getDate('end'),
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
					url: service.getUserHospital(),
					data: data,
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							if (data.data.data) {
								var d = data.data.data;
								console.log(JSON.stringify(data.data.data));

								_this.searchValue = d.hospitalName;
								_this.hospitalName = d.hospitalName;
								_this.provice = d.provinceName;
								_this.city = d.cityName;
								/* _this.akCount = d.akCount; */
								_this.unitCount = d.unitCount;
								_this.year = d.year;
								_this.provicesname = _this.provice + "-" + _this.city;



								if (d.hospitalProductDetailList) {
									d.hospitalProductDetailList.forEach((item, index) => {
										var _index = 0;
										_this.aks.forEach((item2, index2) => {
											if (item2.value == item.status) {
												_index = index2
											}
										});
										_this.products.push({
											akindex: _index,
											status: item.status,
											type: item.type,
											typename: item.typename,
											remarks: item.remarks
										});
									});
								}
								if (d.hospitalCountDetailList) {
									d.hospitalCountDetailList.forEach((item, index) => {

										_this.counts.push({
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



			},


			footerClick(tab, index, flag) {
				var _this = this;
				console.log("index" + index);
				uni.showModal({
					title: "删除",
					content: '确定要删除吗？',
					success: (res) => {
						if (res.confirm) {
							if (flag == 1) {
								_this.products.splice(index, 1);
							}
							if (flag == 2) {
								_this.counts.splice(index, 1);
							}
						}
					}

				})
			},


			btnCancel() {
				this.$refs.popup.close();
			},
			btnConfirm() {
				this.$refs.popup.close();
				if (this.flag == 1) {
					this.products.push({
						akindex: this.akindex,
						status: this.status,
						type: this.ptype,
						typename: this.ptypename,
						remarks: this.addnote
					});
				}
				if (this.flag == 2) {

					if (this.addakcount.length == 0) {
						uni.showToast({
							icon: 'none',
							title: '请填写爱康台数'
						});
						return;
					}
					 

					this.counts.push({
						 
						akCount: this.addakcount,
						type: this.ptype,
						typename: this.ptypename,
						remarks: this.addnote
					});

					var _akCount = 0;
				 
					this.counts.forEach((item, index) => {
						_akCount += parseInt(item.akCount);
						 
					});
					this.akCount = _akCount;
					 
				}

			},
			add() {
				this.flag = 1;
				this.$refs.popup.open();
			},


			addcount() {
				this.flag = 2;
				this.$refs.popup.open();
			},

			queryBaseData() {

				let data = {
					type: 'operate_product_type,yes_no'
				}

				var _this = this;
				uni.request({
					url: service.queryDict(),
					data: data,
					success: (data) => {

						if (data.statusCode == 200 && data.data.code == 0) {
							var _data = data.data.data;

							_this.ptypes =_this.ptypes.concat(_data['operate_product_type']) ;
							_this.aks = _data['yes_no'];
						}

					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));

					}
				})
			},
			bindoperateDateChange: function(e) {
				this.year = e.target.value
			},
			bindakChange: function(e) {
				this.akindex = e.target.value;
				this.status = this.aks[e.target.value].value;
			},


			bindptypesPickerChange: function(e) {

				this.ptypeindex = e.target.value;
				this.ptype = this.ptypes[e.target.value].value;
				this.ptypename = this.ptypes[e.target.value].label;
			},


			register() {


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
				
				if (this.unitCount== 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写医院台数'
					});
					return;
				}
			/* 	if (this.akCount== 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写爱康台数'
					});
					return;
				} */
				/* 
				if (this.ak.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择是否入院'
					});
					return;
				}
				if (this.akCount.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写爱康台数'
					});
					return;
				} */

				let user = service.getUsers();

				var _data = "";
				_data = "?user=" + user.id;
				_data = _data + "&updateAdminName=" + user.name;
				_data = _data + "&userName=" + user.name;
				var _provinceName = this.provicesname.split("-");
				_data = _data + "&id=" + this.id;
				_data = _data + "&provinceName=" + _provinceName[0];
				_data = _data + "&cityName=" + _provinceName[1];
				//_data = _data + "&akCount=" + this.akCount;
				_data = _data + "&unitCount=" + this.unitCount;
				_data = _data + "&year=" + this.year;

				_data = _data + "&status=0";
				_data = _data + "&hospitalName=" + this.hospitalName;

				this.products.forEach((item, index) => {
					_data = _data + "&hospitalProductDetailList[" + index + "].status=" + item.status;
					_data = _data + "&hospitalProductDetailList[" + index + "].type=" + item.type;
					_data = _data + "&hospitalProductDetailList[" + index + "].typename=" + item.typename;
					_data = _data + "&hospitalProductDetailList[" + index + "].remarks=" + item.remarks;

				});
				/* this.counts.forEach((item, index) => {
					 
					_data = _data + "&hospitalCountDetailList[" + index + "].akCount=" + item.akCount;
					_data = _data + "&hospitalCountDetailList[" + index + "].type=" + item.type;
					_data = _data + "&hospitalCountDetailList[" + index + "].typename=" + item.typename;
					_data = _data + "&hospitalCountDetailList[" + index + "].remarks=" + item.remarks;


				}); */


				 
				uni.showLoading({
					title: '提交中...'
				});
				uni.request({
					url: service.saveUserHospital() + encodeURI(_data),
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
</style>
