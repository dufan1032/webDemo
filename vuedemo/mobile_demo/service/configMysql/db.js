//  导入处理mysql的模块 sequelize
const sequelize = require('sequelize');

const uuid = require('uuid');
const config = require('./config');

// 生成uid唯一标识符
function generateId() {
    return uuid.v4();
}


// 是否在定义表时，表名后自动加 s 
let tablesName = {
    define : {
        freezeTableName : true  
    }
} 

// console.log('init sequelize...');
// 创建实例对象
let sequelized = new sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const ID_TYPE = sequelize.STRING(50);

function defineModel(name,attributes){
    let attr = {};
    for(let k in attributes){
        let value = attributes[k];
        if(typeof value === 'object' && value['type']){
            value.allowNull = value.allowNull || false;
            attr[k] = value;
        }else{
            attr[k] = {
                type : value,
                allowNull : false
            };
        }
    }

    attr.id = {
        type : ID_TYPE,
        primaryKey : true
    };
    attr.createdAt = {
        type : sequelize.BIGINT,
        allowNull : false
    };
    attr.updatedAt = {
        type : sequelize.BIGINT,
        allowNull : false
    };
    attr.version = {
        type : sequelize.BIGINT,
        allowNull : false
    };
    attr.state = {
        type : sequelize.BOOLEAN,
        allowNull : false
    };

    return sequelized.define(name,attr,{
        tablesName : name,
        timestamps : false,
        hooks : {
            beforeValidate : function (obj){
                let now = Date.now();
                if(obj.isNewRecord){
                    if(!obj.id){
                        obj.id = generateId();
                    }
                    obj.createdAt = obj.updatedAt = now;
                    obj.version = 0;
                    obj.state = true;
                }else{
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

var exp = {
    defineModel: defineModel,
    sync: () => {
        // only allow create ddl in non-production environment:
        if (process.env.NODE_ENV !== 'production') {
            // sequelized.sync({ force: true });
            sequelized.sync({ force: true })
                .then(() => {
                    console.log('sync done,db inited');
                    process.exit(0);
                })
                .catch((e) => {
                    console.log(`failed:${e}`);
                    process.exit(0);
                });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};


for (let type of TYPES) {
    exp[type] = sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;