// 自定义数据库配置模块
const defalultConfig = require('./config-default');
const overrideConfig = require('./config-override');
const testConfig = require('./config-test');
// 文件处理模块
const fs = require('fs');

let config = null;

/*
读取规则 ：
    1.如果是测试环境，就读取testConfig
    2.如果不是测试环境，先读取defalutConfig,在判断overrideConfig存不存zai
    3.如果不存在提示并忽略，存在就读取
这样做的好处是，开发环境下，团队统一使用默认的配置，并且无需config-override.js。部署到服务器时，由运维团队配置好config-override.js，
以覆盖config-override.js的默认设置。测试环境下，本地和CI服务器统一使用config-test.js，测试数据库可以反复清空，不会影响开发。
*/
if(process.env.NODE_TYPE === 'test'){
    // console.log(`Load ${testConfig}...`);
    config = require(testConfig);
}else{
    // console.log(`Load ${defalultConfig}...`);
    config = require('./config-default');
    try{
        if(fs.statSync(overrideConfig).isFile()){
            // console.log(`Load ${overrideConfig}...`);
            config = require(overrideConfig);
        }
    }catch(err){
        // console.log(`Cannot load ${overrideConfig}.`);
    }
}
module.exports = config;