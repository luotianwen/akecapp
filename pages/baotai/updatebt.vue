<template>
	<view class="content">

		<view class="input-group">
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">手术日期：</text>
				<picker class="pickerslect" mode="date" :value="operateDate" @change="bindoperateDateChange">
					<view class="pickertext">{{operateDate}}</view>
				</picker>
			</view>
			<!-- <view class="input-row border">
				<text class="title" @tap="handleTap('picker2')">选择省市：</text>
				<view @tap="handleTap('picker2')"  class="pickerslect">{{provicesname}}</view>
				<lb-picker ref="picker2" v-model="provicesvalue" mode="multiSelector" :list="provices" :level="2" @confirm="handleConfirm">
				</lb-picker>
			</view> -->
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">选择医院：</text>
				<selectsearch style="padding: 5px 0 0 0;" @handleSearch="handleSearch" @change="change" placeholder="请搜索医院"
				 :infoList="infoList" :showValue="showValue" v-model="searchValue" :loading="loading" type="primary" :uniShadow="true"></selectsearch>

			</view>

			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生：</text>
				<uni-combox class="pickertext" :candidates="doctors" placeholder="请选择医生" v-model="doctor"></uni-combox>

			</view>


			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">手术类别：</text>
				<picker class="pickerslect" @change="bindPickerChange" :value="index" :range="array" range-key="paramName">
					<view class="pickertext">{{array[index].paramName}}</view>
				</picker>
			</view>

			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">患者年龄：</text>
				<m-input type="text" class="pickertext" clearable v-model="name" placeholder="请输入年龄"></m-input>
			</view>
			<view class="input-row border" style="padding-top: 15rpx;">
				<text class="title">患者性别：</text>
				<picker class="pickerslect" @change="bindsexChange" :value="sexindex" :range="sexs" range-key="paramName">
					<view class="pickertext">{{sexs[sexindex].paramName}}</view>
				</picker>
			</view>
		</view>
		<uni-collapse ref="add" :accordion="true">
			<uni-collapse-item title="添加产品信息">
				<view class="btn-row">
					<button type="primary" size="mini" class="primary" @tap="scan" style="width: 45%;float: left;">扫码添加产品</button>
					<button type="primary" size="mini" class="primary" @tap="add" style="width: 45%; margin-left: 5%;">手动添加产品</button>
				</view>
				<uni-list>
					<block v-for="(tab,index1) in products" :key="index1">
						<uni-card   note="1"
						 :isShadow="isShadow">
							<text class="content-box-text">
								产品类型:	{{tab.seriesName}}</br>
								产品名称:	{{tab.materialDesc}} </br>
							    产品型号:	{{tab.materialSpeDesc}}</br> 
								物料编码:	{{tab.materialCode}}</br>
								个&nbsp;&nbsp;体&nbsp;&nbsp;码:	{{tab.indivualcode}}</text>
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
		<uni-collapse ref="add">
			<uni-collapse-item title="添加图片信息">
				<button type="primary" class="primary" size="mini" @click="chooseImage">添加图片</button>

				<view class="feedback-body feedback-uploader">
					<view class="uni-uploader">
						<view class="uni-uploader-head">
							<view class="uni-uploader-title">点击预览图片</view>
							<view class="uni-uploader-info">{{phos.length}}/1</view>
						</view>
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in phos" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
										<view class="close-view" @click="close(index)">x</view>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-show="phos.length < 2">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>

			</uni-collapse-item>
		</uni-collapse>

		<uni-collapse>
			<uni-collapse-item title="评分建议">
				<view class="input-group">

					<view class="input-row border" v-for="(g,gindex) in grades" :key="gindex">
						<text class="title " style="width: 40%;">{{g.name}}：</text>
						<view style="margin-top: 20px;">
							<uni-rate :max="g.level" :id="g.id" :value="g.grade" @change="gchange"></uni-rate>
						</view>
					</view>

				</view>
				<view class="feedback-body">
					<textarea placeholder="请详细描述你的问题和建议..." v-model="suggest" class="feedback-textare" />
					</view>
			</uni-collapse-item>
		</uni-collapse>
		<view class="btn-row">
			 
			<button type="primary" class="primary" @tap="register"  >提交</button>
		</view>


		<uni-popup ref="popup" type="center" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">查询产品</text>
				<text class="uni-tip-content">  
					<view class="input-group">
						<view class="input-row border">
							<text class="title">物料号：</text>
							<m-input focus="true" type="text" clearable  v-model="materialCode" style="width: 90%; background-color: #F1F1F1;margin: 0 10upx;"
							 placeholder="请输入物料号"></m-input>
							 </view>
						<view class="input-row border">
							<text class="title">个体码：</text>
							<m-input   type="text" clearable v-model="indivualcode" style="padding-top: 10rpx; width: 90%; background-color: #F1F1F1;margin: 0 10upx;"
							  placeholder="请输入个体码"></m-input>	
							  </view>
						</view>
					 
					<!-- 	<input focus="true" placeholder="请输入物料号"   style="background-color: #F1F1F1;margin: 0 5upx;" v-model="materialCode"/>
		    --> 
				</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="btnCancel">取消</text>
					<text class="uni-tip-button" @click="btnConfirm">确定</text>
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
	import mInput from '../../components/m-input.vue';
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import md5 from '@/js_sdk/js-md5/src/md5.js';
	import selectsearch from '../../components/LvXingChen-select-search/LvXingChen-select-search.vue'
	
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
			 
			return {
				operateDate: "选择日期",
				provice: "",
				city: "",
				provicesvalue: [],
				provicesname: "选择省市",
				provices: [],

				hospitalName: "请选择医院",
				hosptail: "",

				doctorsall: [],
				doctors: [],
				doctor: "",
				degree: '',
				sexindex: 0,
				sexs: [{
					"id": "",
					paramName: "选择性别"
				}],
				sex: "",

				surgeryId: '',
				surgeryGrade: '',
				index: 0,
				array: [{
					"id": "",
					"paramName": "选择手术类别" 
				}],
				isShadow:true,
				name: "",
				products: [],
				phos: [],
				barCode: "",
				suggest:"",
				materialCode: "",
				indivualcode: "",
				grades: [],
			    _grades: [],
				 loading: false,
				 showValue: 'name', // 需要显示的数据，必须与infoList中的name对应
				 searchValue: '',
				 infoList: [], 
				 id:"",
			}
		},
		onReady:function(){
			 this.get(this.id);
		},
		onLoad: function(data) {
			/* this.getprovice(); */
			this.queryBaseData();
			 this.queryGradeList();
			 
			if(data.id){
				this.id=data.id
			}
		},
		methods: {
			bindoperateDateChange: function(e) {
				this.operateDate = e.target.value
			},
			handleSearch() {
				if(this.city.length==0){
					uni.showToast({
						title: '请先选择省市'
					});
					return;
				}
			                this.loading = true
							var _this=this;
							_this.infoList=[];
			                setTimeout(() => {
								var _city=this.provicesname.split("-")[1];
								var url="https://restapi.amap.com/v3/place/text?key=15ef307a070046bf1d74521e889c7cc6&keywords="+this.searchValue+"&types=09&children=1&offset=20&page=1&extensions=base";
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
					this.hosptail=val.name;
					this.hospitalName=val.name;
					this.provice=val.pname;
					if(val.pname.indexOf("北京") != -1||val.pname.indexOf("天津") != -1 ||
					   val.pname.indexOf("上海") != -1||val.pname.indexOf("重庆") != -1){
						this.city=val.adname;
					}
					else{
					  this.city=val.cityname;
					}
					 this.provicesname=this.provice+"-"+this.city;
					this.degree=val.typecode;
					this.querydoctor();
					console.log(val);
				},
			 get(id){
					 var data={
						id:id 
					 };
					var _this = this;
					uni.request({
						url: service.getReportStandbook(),
						data: data,
						success: (data) => { 
					
							if (data.statusCode == 200 && data.data.code == 0) {
								//console.log("data.data.data="+JSON.stringify(data.data.data));
								var d=data.data.data;
								 
								 _this.suggest=d.suggest;
								 _this.doctor=d.doctorName;
								 _this.sex=d.patientSex;
								 
								 _this.name=d.patientAge;
								 _this.provice=d.provinceCode;
								 _this.city=d.cityCode;
								 _this.hosptail=d.hosptail;
								 _this.surgeryId=d.surgeryId;
								 _this.operateDate=d.operateDate;
								 _this.hospitalName=d.hospitalName;
								 _this.searchValue=d.hospitalName;
								// _this.provicesvalue=[d.provinceCode,d.cityCode];
								 //_this.phos=d.phos;
								 _this.provicesname=d.provinceName+"-"+d.cityName;
								 _this.surgeryGrade=d.surgeryGrade;
								 
								 _this.querydoctor();
								 
								 
								 
								 
								_this.array.forEach((item,index)=>{
									 if(item.id==d.surgeryId){
										 _this.index=index;
									 }
									 
								});
								_this.sexs.forEach((item,index)=>{
									 if(item.paramCode==d.patientSex){
										 _this.sexindex=index;
									 }
									 
								});
								if(d.reportStandbookProductDetailList)
								d.reportStandbookProductDetailList.forEach((item,index)=>{
								 	 
									_this.products.push({
										"id":item.productId,
										"isRecordUnit":item.isRecordUnit,
										"isVerifyIndividualcode":item.isVerifyIndividualcode,
										"scanCode":item.scanCode,
										"indivualcode":item.individualcode,
										"seriesName":item.product.seriesName,
										"materialSpeDesc":item.product.materialSpeDesc,
										"materialDesc":item.product.materialDesc,
										"materialCode":item.product.materialCode,
										 "produceDate":"",
										 "outdate":"",
									   });
									});
								 _this._grades.forEach((item,index)=>{
									 
									 d.reportStandbookGradeDetailList.forEach((item1,index2)=>{
										 if(item.id==item1.gradeId){
											 _this.grades.push({
												  gradeId:item1.gradeId,
												  id:item1.gradeId,
												  grade:item1.grade,
												  level:item.level,
												  name:item.name 
											 });
										 } 
									 	 /* if(item.id==item1.gradeId){
											 item.gradeId=item1.gradeId;
											 item.grade=item1.grade;
											 
										 } */
									 	 
									 });
								 });
								  console.log(JSON.stringify(_this.grades));
							}
					
						},
						fail: (data, code) => {
							console.log('fail' + JSON.stringify(data));
					
						}
					})
			 },			
			footerClick(tab,index) {
				var _this=this;
			 
				 uni.showModal({
				 	title: "删除",
				 	content: '确定要删除'+tab.materialDesc+'吗？',
				 	success: (res) => {
				 		if (res.confirm) {
				 			 _this.products.splice(index,1);
				 		}
				 	}
				 			
				 })
			},
			gchange(e){
				 
				this.grades.forEach(item=>{
					item.gradeId=item.id;
						 if(item.id==e.id){
							 item.grade=e.value;
						 }
						 console.log('rate发生改变:' + JSON.stringify(item))
					});
				
			},
			queryGradeList() {
				 var _this = this;
				 uni.request({
				 	url: service.queryGradeList(),
				 	success: (data) => {
				 		if (data.statusCode == 200 && data.data.code == 0) {
				 			_this._grades = data.data.data;
				 		}
				 			
				 	},
				 	fail: (data, code) => {
				 		console.log('fail' + JSON.stringify(data));
				 			
				 	}
				 })
			},
			btnCancel() {
				this.$refs.popup.close();
			},
			btnConfirm() {
				this.$refs.popup.close();
				this.queryResultProductInfo(2);
			},
			add() {
				this.$refs.popup.open();
			},
			scan() {
				var _this = this;
				// 调起条码扫描
				uni.scanCode({
					scanType: 'barCode',
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						_this.barCode = res.result;
						_this.queryResultProductInfo(1)
					}
				});
			},
			queryResultProductInfo(l) {
				console.log("this.barCode" + this.barCode);
				console.log("this.materialCode" + this.materialCode);
				console.log("this.indivualcode" + this.indivualcode);
				var scanCode="";
				var produceDate="";
				var outdate="";
				var data = {};
				if (l == 1) {
					//01069
					//43735
					//16031
					//81722
					//09101
					//31709
					//1121A
					//00045
					//764A1
					//1
					//个体码A00045764A11
					//170911生产日期
					//220910 失效日期
					var code=this.barCode;
					if(code.length<40){
						uni.showToast({
							title:"二维码不正确!"
						})
						return;
					}
					
					        scanCode=this.barCode;
							produceDate=code.substr(26,6);
							outdate=code.substr(18,6);
							 
							data.barCode = code.substr(3,12);
							var valid=code.substring(34,code.length);
							var f11=valid.substring(9,11);
							 
							if(f11.endsWith("21")){
								this.indivualcode=valid.substring(0,9)+valid.substring(11,valid.length);
							}
							else{
								this.indivualcode=valid;
							}
							 
						 
						 console.log("barCode="+data.barCode+"scanCode="+scanCode+" produceDate="+produceDate+" outdate="+outdate+" indivualcode="+this.indivualcode);
					
				} else {
					data.materialCode = this.materialCode;	
						if(this.materialCode.length==0){
							uni.showToast({
								title:"物料号必须填!"
							})
							return;
						}
						if(this.indivualcode.length==0){
							uni.showToast({
								title:"个体码必须填!"
							})
							return;
						}	
					 scanCode=this.materialCode+","+this.indivualcode;
				}
				var _this = this;
				uni.request({
					url: service.queryResultProductInfo(),
					data: data,
					success: (data) => { 

						if (data.statusCode == 200 && data.data.code == 0) {
							console.log("data.data.data="+JSON.stringify(data.data.data));
							var _data=data.data.data;
							_data["scanCode"]=scanCode;
							_data["produceDate"]=produceDate;
							_data["outdate"]=outdate;
							_data["indivualcode"]=_this.indivualcode;
							if(_this.products.length==0){
								  _this.products=[_data];
							}
							else{
							 _this.products.push(_data);
							}
							_this.barCode="";
							_this.materialCode="";
							_this.indivualcode="";
							 
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

					}
				})
			},
			close(e) {
				this.phos.splice(e, 1);
			},
			previewImage() { //预览图片
			var _this = this;
				uni.previewImage({
					urls: _this.phos
				});
			},
			chooseImage() {
				var _this = this;
				uni.chooseImage({
					sizeType: ['original'],
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						var x;
						var l = res.tempFilePaths.length;
						console.log(l);
						for (var j = 0; j < l; j++) {
							x = res.tempFilePaths[j];

							uni.compressImage({
								src: x,
								quality: 80,
								success: res => {
									console.log(res.tempFilePath)
									//#ifdef APP-PLUS
									plus.io.resolveLocalFileSystemURL(res.tempFilePath, function(entry) {
										// 可通过entry对象操作test.html文件
										entry.file(function(file) {
											var fileReader = new plus.io.FileReader();
											fileReader.readAsDataURL(file);
											fileReader.onloadend = function(evt) {
												console.log(evt.target.result)
												_this.phos = _this.phos.concat(evt.target.result);


											}
										})
									})
									//#endif

								}
							})
						}

					}
				})
			},
			 


			getprovice() {
				var _this = this;
				uni.request({
					url: service.queryProvince(),
					success: (data) => {

						if (data.statusCode == 200 && data.data.code == 0) {
							_this.provices = data.data.data;
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

				this.provicesname = e.item.map(item => item.label).join('-');
				var _d = e.item.map(item => item.value);
				this.provice = _d[0];
				this.city = _d[1];


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

							_this.array = _this.array.concat(data.data.data['手术类别'][0].basedataList);
							_this.sexs = _this.sexs.concat(data.data.data['性别'][0].basedataList);
							 
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
				this.surgeryId = this.array[e.target.value].id;
				this.surgeryGrade = this.array[e.target.value].paramName;
			},
			bindsexChange: function(e) {

				this.sexindex = e.target.value;
				this.sex = this.sexs[e.target.value].paramCode;
				console.log(JSON.stringify(this.sexs[e.target.value]));
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
			save(){
				
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
				if (this.doctor.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择医生'
					});
					return;
				}
				if (this.surgeryId.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择手术类别'
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
				if (this.name.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写患者年龄'
					});
					return;
				} 
				 
			 
				const datas = {
					id:this.id,
					index:this.index,
					suggest:this.suggest,
					doctor:this.doctor,
					sex:this.sex,
					sexindex: this.sexindex,
					provicesname: this.provicesname,
					name:this.name,
					doctors:this.doctors,
					hosptail:this.hosptailhosptail,
					surgeryId:this.surgeryId,
					operateDate:this.operateDate,
					hospitalName:this.hospitalName,
					phos:this.phos,
					products:this.products,
					grades:this.grades,
					surgeryGrade:this.surgeryGrade,
					 
				}
				var d=service.getbaotai();
				d[this.dindex]=datas;
				console.log(JSON.stringify(d));
				service.updatebaotai(d);
				 
				
				
				},
			register() {
                
				 
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
				if (this.doctor.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择医生'
					});
					return;
				}
				if (this.surgeryId.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择手术类别'
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
				if (this.name.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写患者年龄'
					});
					return;
				}
if (this.products.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请填写产品信息'
					});
					return;
				}
				
				let  user=service.getUsers();
				 
					 
				 
				var _data="";
				_data="?userId="+user.id;
				_data=_data+"&id="+this.id;
				_data=_data+"&degree="+this.degree;
				_data=_data+"&userName="+user.name;
				var _provinceName=this.provicesname.split("-");
				/* _data=_data+"&provinceCode="+this.provice;
				_data=_data+"&cityCode="+this.city; */
				_data=_data+"&provinceName="+_provinceName[0];
				_data=_data+"&cityName="+_provinceName[1];
			    _data=_data+"&surgeryId="+this.surgeryId;
				_data=_data+"&suggest="+this.suggest;
				 _data=_data+"&doctorName="+this.doctor;
				 _data=_data+"&patientSex="+this.sex;
				 _data=_data+"&patientAge="+this.name;
				 _data=_data+"&operateDate="+this.operateDate;
				 _data=_data+"&hospitalName="+this.hospitalName;
				 _data=_data+"&type="+user.createType;
				 this.grades.forEach((item,index)=>{
					 if(item.grade){
						 _data=_data+"&reportStandbookGradeDetailList["+index+"].grade="+item.grade;
						 _data=_data+"&reportStandbookGradeDetailList["+index+"].gradeId="+item.gradeId;
					 }else{
						 _data=_data+"&reportStandbookGradeDetailList["+index+"].grade=0";
						 _data=_data+"&reportStandbookGradeDetailList["+index+"].gradeId="+item.id;
					 }
					 
				});
				this.phos.forEach((item,index)=>{
									  _data=_data+"&reportStandbookImageDetailList["+index+"].reportImgUrl="+item;
					});
					var unitCount=0;
					this.products.forEach((item,index)=>{
						 unitCount=unitCount+item.isRecordUnit;
							       _data=_data+"&reportStandbookProductDetailList["+index+"].productId="+item.id; 
								 _data=_data+"&reportStandbookProductDetailList["+index+"].isRecordUnit="+item.isRecordUnit;
								 _data=_data+"&reportStandbookProductDetailList["+index+"].isVerifyIndividualcode="+item.isVerifyIndividualcode;
								 _data=_data+"&reportStandbookProductDetailList["+index+"].scanCode="+item.scanCode;
								  _data=_data+"&reportStandbookProductDetailList["+index+"].individualcode="+item.indivualcode;
								  _data=_data+"&reportStandbookProductDetailList["+index+"].produceDate="+item.produceDate;
								  _data=_data+"&reportStandbookProductDetailList["+index+"].outdate="+item.outdate;
							  });
						 _data=_data+"&unitCount="+unitCount;
				 
				uni.showLoading({
					title: '提交中...'
				});
				var _this=this;
				  uni.request({
					url: service.saveReportStandbook()+encodeURI(_data),
					method:"POST",
					 header: {
					        'content-type':"application/x-www-form-urlencoded"
					    },
					success: (data) => { 
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
						
							var d=service.getbaotai();
							d.splice(_this.dindex, 1);
							service.updatebaotai(d);
							
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
