// 初始化数据库
const model = require('../configMysql/model');
// console.log(process.env.NODE_ENV); // 环境变量
model.sync();