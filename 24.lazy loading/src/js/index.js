console.log("index.js文件被加载了");

document.getElementById("btn").onclick = function () {
	//懒加载lazy loading：当文件需要时才加载
	//预加载prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载
	import(/* webpackChunkName:'test', webpackPrefetch: true */ "./test")
		.then(({ mul }) => {
			console.log(mul(4, 5));
		})
		.catch(() => {
			console.log("加载test.js出错了~");
		});
};
