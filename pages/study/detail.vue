<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:"http://m.baidu.com",
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad: function (data) { //option为object类型，会序列化上个页面传递的参数
			  var option=JSON.parse(decodeURIComponent(data.d));
				this.url=option.href;
				uni.setNavigationBarTitle({
				　　title:option.title
				})
		    },
		methods: {

		}
	}
</script>

<style>

</style>
