// 引入koa模块
const Koa = require('koa');

// 引入koa模块中间件：koa-bodyparser(分析器)
const parser = require('koa-bodyparser');   

// 引入koa模块中间件：koa-cors(解决跨域请求)
const cors = require('koa2-cors');

// 导入自定义中间模块
const control = require('./config/control');  // 控制器
// const isProduction = process.env.NODE_ENV === 'production';
// Node.js在全局变量process中定义了一个环境变量env.NODE_ENV，
// 开发时:环境变量应该设置为'development'，而部署到服务器时，环境变量应该设置为'production'。在编写代码的时候，要根据当前环境作不同的判断。

// 指定端口
const listenPort = 3000;

// 创建 koa对象
const app = new Koa();

// 打印请求路径 
app.use(async (ctx,next)=>{
    console.log(`${ctx.request.method} ${ctx.request.url}`);  // 打印url
    await next();
});

// 注册中间件 url分析器  koa-bodyparser和koa2-cors
app.use(parser());
app.use(cors({
    origin : 'http://localhost:8888',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 注册自定义中间件
app.use(control());


// 监听端口
app.listen(listenPort);
console.log('app.js started at port ' + listenPort + '...');