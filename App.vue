<script>
	export default {
		onLaunch: function() {
			 //#ifdef APP-PLUS  
			 if (plus.os.name=="Android") {  
			    var server = "https://akbt.ak-medical.net/akec/sversion"; //检查更新地址  
			    var req = { //升级检测数据  
			        "appid": plus.runtime.appid,  
			        "versionNum": plus.runtime.version  
			    };  
				var appurl;
			    uni.request({  
			        url: server,  
			        data: req,  
			        success: (res) => {  
						console.log(JSON.stringify(res.data));
			            if (res.statusCode == 200 && res.data.code === 1) {
							
			                uni.showModal({ //提醒用户更新  
			                    title: "更新提示",  
			                    content: res.data.data.vdesc,  
			                    success: (res) => {  
			                        if (res.confirm) {  
										 
										    appurl = "market://details?id=com.akec.mainactivity"; //这个是通用应用市场，如果想指定某个应用商店，需要单独查这个应用商店的包名或scheme及参数  
										    plus.runtime.openURL(appurl);  
										
										 
			                           
			                        }  
			                    }  
			                })  
			            }  
			        }  
			    })  
				}  
			    //#endif  
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "components/m-icon/m-icon.css";
     @import './common/uni.css';
	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 10px;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 16px;
		line-height: 40px;
	}

	.input-row .title {
		width: 72px;
		padding-left: 15px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 25px;
		padding: 10px;
	}
	
	.pickertext{
		 
		    font-size: 16px;
		    
	}
	.pickerslect{
		  margin-top: 8rpx;
		margin-left: 8rpx;
		height: 40px;
		  /*  padding: 12px 20px;
		    line-height: 40px; */
		    font-size: 16px;
		    background: #FFF;
		    -webkit-box-flex: 1;
		    -webkit-flex: 1;
		    flex: 1;
	}
	button.primary {
		background-color: #0faeff;
	}
	button.back {
		background-color: #a69e9a;
	}
	
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
</style>
