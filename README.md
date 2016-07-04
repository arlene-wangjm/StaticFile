# StaticFile

# use webpack to manage js files. link http://webpack.github.io/docs/?utm_source=github&utm_medium=readme&utm_campaign=trdr

# compatiblity ES6, so you can write ES6 code
# 

#webpack manage js file using commonJS

#gulp manage scss compile, image sprite, 
#静态文件md5打包，并自动更改html引用路径，方便发布

#1. 将css直接合并为一个文件，在head中通过link标签引入，提高网页渲染速度。
#2. 将js打包为不同的入口文件，并自动合并依赖关系。将跨页面的公用代码抽离为独立文件，益于浏览器缓存。
#3. 增加图片雪碧图，base64的支持，开发者可以手动配置__sprite和__inline，灵活性较高。
#4. 静态文件md5打包，并自动更改html引用路径，方便发布。
#5. 提供开发调试所需要的环境，包括热启动，浏览器自动刷新，sourceMap。
