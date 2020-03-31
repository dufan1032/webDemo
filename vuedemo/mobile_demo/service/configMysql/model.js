const path = require('path');
const fs = require('fs');
const db = require('./db');

// 读取并过滤js文件
let dir = path.resolve(__dirname,'../models');
let js_files = fs.readdirSync(dir).filter((f)=>{
    return f.endsWith('.js');
});

module.exports = {};

// 自动导入模块
for (let f of js_files) {
    // console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(dir+'\\' + f);
}

module.exports.sync = () => {
    db.sync();
};