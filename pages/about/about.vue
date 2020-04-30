<template>
	<view class="about">
		<view class="desc">
			<text class="code">小李跟刀app</text>
			是一个使用 app。
		</view>
		<view class="content">
			                                    </br>
			1 ）经销商报台，首选扫二维码报台，不能扫码的合格证选择自填写报台（自填写报台方法参见下面几页PPT）。</br>
			2 ）通过小李跟刀报台时，需将产品的批号和个体号都报进系统，如果自填写报台时只报了批号没报个体号，不能计算返利。 </br>
			3 ）建议经销商报台后将所报产品的合格证原件或照片、或照片打印出的纸质版保留一份备查，至少保存到领完这个产品的返利。</br>
			4 ）已经通过报台领取返利的产品（或2014年已提交合格证领过返利的产品），不要重复报进系统，重复报台，不能再领返利</br>
			</view>
		<!-- #ifdef APP-PLUS -->
		<view class="version">
			当前版本：{{version}}
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {

		data() {
			return {
				version: ''
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.version = plus.runtime.version;
			// #endif 
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
		margin-top: 30rpx;
		display: block;
		flex-direction: column;
		justify-content: center;
	}
	
	.code {
		color: #e96900;
		background-color: #f8f8f8;
		flex-direction: column;
		justify-content: center;
	}
</style>
