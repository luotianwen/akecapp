<template>
	<view class="content">
		<uni-collapse>
			<uni-collapse-item title="搜索条件">
				<view class="input-group">
					<view class="input-row border" style="padding-top: 15rpx;">
						<text class="title">开始日期：</text>
						<picker class="pickerslect" mode="date" :start="startDate" :end="endDate"  :value="beginOperateDate" @change="bindbeginDateChange">
							<view class="pickertext">{{beginOperateDate}}</view>
						</picker>
					</view>
					<view class="input-row border" style="padding-top: 15rpx;">
						<text class="title">结束日期：</text>
						<picker class="pickerslect" mode="date" :start="startDate" :end="endDate"  :value="endOperateDate" @change="bindendDateChange">
							<view class="pickertext">{{endOperateDate}}</view>
						</picker>
					</view>

					<view class="input-row border" style="padding-top: 15rpx;">
						<text class="title">医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：</text>
						<m-input type="text" clearable v-model="hospitalName" placeholder="请输入医院"></m-input>

					</view>
					<view class="input-row border" style="padding-top: 15rpx;">
						<text class="title">医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生：</text>
						<m-input type="text" clearable v-model="doctorName" placeholder="请输入医生"></m-input>

					</view>
					<view class="input-row border" style="padding-top: 15rpx;">
						<text class="title">手术类别：</text>
						<picker class="pickerslect" @change="bindPickerChange" :value="index" :range="array" range-key="paramName">
							<view class="pickertext">{{array[index].paramName}}</view>
						</picker>

					</view>



				</view>
				<view class="btn-row">
					<button type="primary" class="primary" @tap="exportData" style="width: 48%;float: left;">导出</button>
					<button type="primary" class="primary" @tap="getData" style="width: 48%;">搜索</button>

				</view>

			</uni-collapse-item>
		</uni-collapse>
		<view style="padding-left:20rpx ;">共有：{{list.length}}条数据</view>
		<uni-list>
			<block v-for="(tab,index1) in list" :key="index1">
				<uni-card :title="'手术日期:'+tab.operateDate" :note="'填报时间:'+tab.createDate" :isShadow="isShadow" :extra="'手术类别:'+tab.surgeryGrade">
					<text class="content-box-text"> 第 {{(index1+1)}}条 </br> 医院:{{tab.hospitalName}}</br> 医生:{{tab.doctorName}}</text>
					<block slot="footer" v-if="tab.show">
						<view class="footer-box" v-show="tab.show">
							<view class="" @click.stop="onClick(tab)"><text class="footer-box__item"> 修改</text></view>
							<view class="" @click.stop="footerClick(tab,index1)"><text class="footer-box__item"> 删除</text></view>
						</view>
					</block>
				</uni-card>

			</block>
		</uni-list>
		<!-- <uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right" vertical="bottom" direction="vertical"
		 @trigger="trigger" /> -->

	</view>
</template>
<script>
	function getDate(type) {
		var date = new Date();
		if (type === 'start') {
			var curTime = new Date().getTime();
			var startDate = curTime - (7 * 3600 * 24 * 1000);
			date = new Date(startDate);
		}
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}
	function getDate2(type) {
	           const date = new Date();
	           let year = date.getFullYear();
	           let month = date.getMonth() + 1;
	           let day = date.getDate();
				
	           if (type === 'start') {
	               year = year - 20;
	           } 
	           month = month > 9 ? month : '0' + month;;
	           day = day > 9 ? day : '0' + day;
	           return `${year}-${month}-${day}`;
	       } 
	import uniFab from '@/components/uni-fab/uni-fab.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	import {
		mapState
	} from 'vuex'

	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		components: {
			uniCard,
			uniFab,
			uniCollapse,
			uniCollapseItem,
			mInput
		},
		data() {

			return {
				startDate: getDate2('start'),
				endDate: getDate2('end'),
				beginOperateDate: getDate('start'),
				
				endOperateDate: getDate({
					format: true
				}),
				hospitalName: '',
				isShadow: true,
				doctorName: '',
				surgeryId: '',
				array: [{
					"id": "",
					"isNewRecord": false,
					"base": {
						"id": "",
						"isNewRecord": false,
						"baseTypeName": ""
					},
					"paramCode": " ",
					"paramName": "全部",
					"status": "",
					"seqno": ""
				}],
				index: 0,
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				list: [],
				content: [{
						text: '新增',
						active: false
					},
					{
						text: '待提交',
						active: false
					}
				]
			}
		},
		onShow() {
			if (this.hasLogin) {
				this.getData();
			}
		},
		onLoad() {
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					showCancel: false,
					success: (res) => {
						if (res.confirm) {
							uni.reLaunch({
								url: '../login/login'
							});

						}
					}
				});
			} else {
				this.queryBaseData();

			}
		},
		 
		onPullDownRefresh() {
			console.log('refresh');

			this.getData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			
			bindPickerChange: function(e) {
				console.log(this.array[e.target.value].id + 'picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value;
				this.surgeryId = this.array[e.target.value].id;
			},

			bindbeginDateChange: function(e) {
				this.beginOperateDate = e.target.value
			},
			bindendDateChange: function(e) {
				this.endOperateDate = e.target.value
			},
			queryBaseData() {

				let data = {
					type: '手术类别',
				}

				var _this = this;
				uni.request({
					url: service.queryBaseData(),
					data: data,
					success: (data) => {

						if (data.statusCode == 200 && data.data.code == 0) {
							_this.array = _this.array.concat(data.data.data['手术类别'][0].basedataList);

						}

					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));

					}
				})
			},
			exportData() {


				let user = service.getUsers();
				let data = "?userId=" + user.id + "&beginOperateDate=" + this.beginOperateDate + "&endOperateDate=" + this.endOperateDate +
					"&doctorName=" + this.doctorName + "&hospitalName=" + this.hospitalName + "&surgeryId=" + this.surgeryId


				var _this = this;
				uni.showLoading({
					title: '加载中...'
				});
				uni.downloadFile({
					url: service.exportListReportStandbook() + data,
					success: function(res) {
						if (res.statusCode === 200) {
							
							console.log('下载成功');
							var filePath = res.tempFilePath;
							uni.showToast({
								title: '下载路径为'+filePath
							})
							uni.openDocument({
								filePath: filePath,
								success: function(res) {
									uni.hideLoading();
									console.log(filePath + '打开文档成功');
								},

							});
						}
					}
				});

			},
			getData() {
				this.list = [];
				uni.showLoading({
					title: '加载中...'
				});
				let user = service.getUsers();
				let data = {
					userId: user.id,
					beginOperateDate: this.beginOperateDate,
					endOperateDate: this.endOperateDate,
					doctorName: this.doctorName,
					hospitalName: this.hospitalName,
					surgeryId: this.surgeryId
				}

				var _this = this;
				uni.request({
					url: service.queryListReportStandbook(),
					data: data,
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							if (data.data.data) {
								_this.list = data.data.data;
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
			},footerClick(tab,index) {
				var _this=this;
				console.log("index"+index); 
				 uni.showModal({
				 	title: "删除", 
				 	content: '确定要删除第'+(index+1)+'条吗？',
				 	success: (res) => {
				 		if (res.confirm) {
							uni.showLoading({
								title: '删除中...'
							});
							uni.request({
								url: service.delReportStandbook(),
								data: data,
								success: (data) => {
									uni.hideLoading();
									if (data.statusCode == 200 && data.data.code == 0) {
										uni.showToast({
											title: '操作成功',
											duration: 3000,
											success() {
												 _this.getData();
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
			onClick(tab) {
				console.log(tab.id);
				uni.navigateTo({
					url: "updatebt?id=" + tab.id
				})
			},
			trigger(e) {

				this.content[e.index].active = !e.item.active
				console.log(e.index);
				//if (this.content[e.index].active) {
				let index = e.index;
				if (index == 1) {
					uni.navigateTo({
						url: "/pages/baotai/dlist"
					})
				} else if (index == 0) {
					console.log("addbt");
					uni.navigateTo({
						url: "/pages/baotai/addbt"
					})
				}
				//}
				/* uni.showModal({
					title: '提示',
					content: `您${this.content[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				}) */
			},
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.scroll-h {
		width: 750rpx;
		height: 80rpx;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
	}

	.line-h {
		height: 1rpx;
		background-color: #cccccc;
	}

	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		padding-left: 34rpx;
		padding-right: 34rpx;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.uni-tab-item-title-active {
		color: #007AFF;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		flex: 1;
		flex-direction: row;
	}

	.scroll-v {
		flex: 1;
		/* #ifndef MP-ALIPAY */
		flex-direction: column;
		/* #endif */
		width: 750rpx;
	}

	.update-tips {
		position: absolute;
		left: 0;
		top: 41px;
		right: 0;
		padding-top: 5px;
		padding-bottom: 5px;
		background-color: #FDDD9B;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.update-tips-text {
		font-size: 14px;
		color: #ffffff;
	}

	.refresh {
		width: 750rpx;
		height: 64px;
		justify-content: center;
	}

	.refresh-view {
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
	}

	.refresh-icon {
		width: 30px;
		height: 30px;
		transition-duration: .5s;
		transition-property: transform;
		transform: rotate(0deg);
		transform-origin: 15px 15px;
	}

	.refresh-icon-active {
		transform: rotate(180deg);
	}

	.loading-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
		color: #999999;
	}

	.loading-text {
		margin-left: 2px;
		font-size: 16px;
		color: #999999;
	}

	.loading-more {
		align-items: center;
		justify-content: center;
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: center;
	}

	.loading-more-text {
		font-size: 28rpx;
		color: #999;
	}

	.input-row .title {
		width: 100px;
		padding-left: 15px;
	}
</style>
