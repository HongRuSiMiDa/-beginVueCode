const path=require('path')
// 热启动的第二步
const webpack=require("webpack")

//这插件有两个作用
// 1,自动在内存中根据指定页面生成一个内存的页面
// 2,自动把打包好js追加到页面中去
const htmlWebpackPlugin=require('html-webpack-plugin')
// 这个配额制文件,起始就是一个js文件,通过node中的模块操作向外暴露了一个配置对象


module.exports={
    // webpack4.x版已经有默认的配置 此处不需要配置
    // // 入口,表示要使用webpack打包那个文件
    // entry:path.join(__dirname,"./src/main.js"),
    // // 输出文件相应的配置
    // output:{
    //     // 指定打包好的文件,输出到那个目录中去
    //     path:path.join(__dirname,"./dist"),
    //     // 这是指定 输出文件名称
    //     filename:"bundle.js"
    // }
    devServer:{
        open:true,// 自动打开浏览器
        port:8090,// 设置启动的时候的运行端口
        contentBase:"src",// 指定被托管的根目录
        hot:true// 启用更新的 第一步
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),// new 一个热更新的模块对象,
        //这是热启动的第三步

        new htmlWebpackPlugin({
            // 指定模块页面 将来会根据指定的页面路径去生成内存中的页面
            template:path.join(__dirname,"./src/index.html"),
            // 指定生成的页面的名称
            filename:"index.html"
        })
    ],
    module:{// 所有第三方模块的加载器
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}
        ]

    }
}

//"dev":"webpack-dev-server  --open  --port 8090 --contentBase src --hot"
// open 自动打开浏览器 
// port打开的端口号 
//contentBase src 托管的项目目录
// --hot 热加载 给项目打补丁 修改什么就重新编译什么 然后给项目打一下补丁