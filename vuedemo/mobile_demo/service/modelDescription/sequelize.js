// 引入模块 
const sequelize = require('sequelize');
// 读取配置：配置一般是设定单独建立文件保存设定的
// const mysqlConfig = require('文件路径');

// 生成uid唯一标识符：根据情况决定(uuid模块：uuid.v4)；

// 创建实例对象
var sequelized = new Sequelize(mysqlConfig.dbname, mysqlConfig.uname, mysqlConfig.upwd, {
    host: mysqlConfig.host,
    dialect: mysqlConfig.dialect,
    pool: mysqlConfig.pool
});

// db.js里已经定义好了，项目开始前初始化下就好了
// define  定义一个新模型，来表示数据库中的表,第二个参数为对象,对象中的每个键代表一列(定义表,第二个对象中的键代表一列),
/* 
定义表相应的字段 : https://sequelize.org/master/class/lib/data-types.js~BIGINT.html
    type 字段数据类型(sequlize. …) 
    allowNull(是否允许为空true,false) 
    autoIncrement(自增, true ,false) 
    unique(唯一性, true,false, string) 
    comment (解释 说明)

    primaryKey (对主键的设置, true,false) 
    defaultValue(默认值的设置) 
    field
*/
var pet = sequelize.define('pet', // 数据库表名
{   // 对象中的每一个键代表 表中的每一个列
    id : {
        type : Sequelize.STRING(50),   // Sequelize.STRING() 字符串可变长度
        primaryKey : true
    },
    name : Sequelize.STRING(100),
    gender : Sequelize.BOOLEAN,     // .BOOLEAN   布尔型数据
    birth : Sequelize.STRING(10),
    createdAt : Sequelize.BIGINT,   // 64位整数
    updatedAt : Sequelize.DATE,
    // updatedAt : Sequelize.BIGINT,  // 会报错，会将时间戳自动改为时间格式(带时区的) createdAt不会改，不知道为啥
    version : Sequelize.BIGINT
},{ // 可选属性： 提供给sequelize构造函数与默认define选项合并，并传递给Model.init()
    timetamps : false,
    // freezeTableName : true
});

// 操作时 ： 一般通过即使函数+async和await来操作
//   添加数据：定义表时的变量.create(建表时的列)
pet.create({
    id : 'g-'+now,
    name : 'LOLer0',
    gender : false,
    birth : '19950209',
    createdAt : now,
    updatedAt : nows,
    version : 0
}).then((p)=>{
    // console.log('同步:'+a);
    console.log('created.'+JSON.stringify(p));
}).catch((err)=>{
    console.log('failed:'+err);
});

//   async+await
(async ()=>{
    let dog = await pet.create({
        id : 'd-'+now,
        name : 'LOLer1',
        gender : true,
        birth : '19960209',
        createdAt : now,
        updatedAt : nows,
        version : 0
    });
    // a++;
    // console.log('异步1:'+a);
    console.log('created: ' +JSON.stringify(dog));
})();

//   修改数据： 定义表时的变量.update(values,opts)
//       values : 是要修改的数据的集合        opts ：相关的一些操作参数，where用于限制修改的数据的条件，和SQL语句的where作用一样
Notices.update({
    name : 'LOLer0++'
}, {
    where: {version: 0}
});

//   查询数据：
//      查询全部数据：Notices.findAll();  // 返回值依然是一个Promise对象
//      条件查询：Notices.findAll({order: [['createAt', 'DESC']], limit: 10, where: {'status': 0}});
//         order字段用于指定排序规则，这里指定以createAt字段做降序排序
//         limit字段用于指定查询的数据量，这里表示返回前10条数据
//         where字段用于指定条件查询，这里表示查询status为0的数据

//   删除数据：定义表时的变量.destroy()
//       但是通常我们做删除操作的时候并不是真的将数据从数据库中抹除，而是通过数据的状态字段去标识，方便后续维护。所以每个表通常都会定义一个state字段
