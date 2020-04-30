<template>
	<view class="content">
		<view class="uni-page-head">
			<view class="uni-page-head-title">{{title}}</view>
		</view>
		<view class="uni-page-head">
			<view class="uni-page-head-ttitle">{{releaseDate}}</view>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
				<rich-text :nodes="strings"></rich-text>
			</view>
		</view>
		<view class="btn-row">
			<button type="back" class="back"  @tap="back" style="width: 48%;float: left;">返回</button>
			<button type="primary" class="primary" @tap="del" style="width: 48%;">删除</button>
		</view>
		
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				id: "",
				title: "",
				releaseDate: "",
				strings: ''

			}
		},
		onLoad: function(data) { //option为object类型，会序列化上个页面传递的参数
		     console.log(data.d)
			var option = JSON.parse(decodeURIComponent(data.d));
			this.title = option.title;
			this.strings = option.content;
			this.id = option.id;
			this.releaseDate = option.releaseDate;
			uni.setNavigationBarTitle({
				title: option.title
			})
		},
		methods: {
			back(){
				uni.navigateBack({
												 data:1
				})
			},
			del(){
			 
				uni.showLoading({
					title: '删除中...'
				});
				let user = service.getUsers();
				let data = {
					"range":user.id,
					 id:this.id,
				}
							
				var _this = this;
				uni.request({
					url: service.queryListUnreadNotice(),
					data: data,
					success: (data) => {
						uni.hideLoading();
						if (data.statusCode == 200 && data.data.code == 0) {
							if(data.data.data){
							 uni.navigateBack({
								 data:1
							 })
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
			}
		}
	}
</script>

<style>
	/* page */
	.uni-page-head {
		padding: 35rpx;
		text-align: center;
	}

	.uni-page-head-title {
		display: inline-block;
		padding: 0 20rpx;
		font-size: 30rpx;
		height: 38rpx;
		line-height: 38rpx;
		color: #BEBEBE;
		box-sizing: border-box;
		border-bottom: 2rpx solid #D8D8D8;
	}
	.uni-page-head-ttitle {
		display: inline-block;
		padding: 0 5rpx;
		font-size: 20rpx;
		height: 20rpx;
		line-height: 20rpx;
		color: #BEBEBE;
		box-sizing: border-box;
		border-bottom: 2rpx solid #D8D8D8;
	}
</style>
