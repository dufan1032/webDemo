// 提取 urls 目录下的js文件,创建router
const fs = require('fs');

// 创建路由函数
function addRouter(router,maps){
    for(let url in maps){
        // console.log(url);
        if(url.startsWith("GET")){
            // 如果是已GET 开头的
            let path = url.substring(4);
            router.get(path,maps[url]);
            // console.log(`GET ${path}`);
        }else if(url.startsWith('POST')){
            // 如果是以POST开头的 请求
            let path = url.substring(5);
            router.post(path,maps[url]);
            // console.log(`POST ${path}`);
        }else{
            console.log('无效的请求');
        }
    }
}

// 提取 urls 目录下的js文件,创建router
function exFile(router,dir){

    // 提取目录文件
    //  读取目录:这里可以用sync是因为启动时只运行一次，不存在性能问题
    let js_file = fs.readdirSync(dir).filter((f)=>{
        return f.endsWith('.js');
    })

    //调用创建路由函数
    for(let i of js_file){
        // console.log(`log : ${i}`);
        let maps = require(dir+'/'+i);
        // console.log(maps);
        addRouter(router,maps);
    }
}

module.exports = function(dir){
    let url_dir = dir || '/controllers',
        router = require('koa-router')();
    // __dirname 的路径为本文件所在文件夹的绝对路径 : D:\githubs\demo\vue-demo\mobile_demo\service\config
    // exFile(router,__dirname+url_dir);
    // process.cwd() 的路径为本文件所在文件夹的绝对路径 : D:\githubs\demo\vue-demo\mobile_demo\service
    exFile(router,process.cwd()+url_dir);
    return router.routes();
}