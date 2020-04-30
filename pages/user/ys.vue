<template>
	<web-view :webview-styles="webviewStyles" :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url:"https://akbt.ak-medical.net/xieyi.jsp"
			}
		},
		methods: {
			
		}
	}
</script>


<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}


	.about {
		flex-direction: column;
		flex: 1;
	}

	.content {
		flex: 1;
		padding: 15rpx;
		flex-direction: column;
		justify-content:left;
	}
	.version {
		height: 80rpx;
		line-height: 80rpx;
		justify-content: center;
		color: #ccc;
	}
	.desc {
		margin-top: 10rpx;
		display: block;
		flex-direction: column;
		justify-content: center;
			text-align: center;
	}
	
	.code {
		color: #e96900;
	
		background-color: #f8f8f8;
		flex-direction: column;
		justify-content: center;
	}
</style>
