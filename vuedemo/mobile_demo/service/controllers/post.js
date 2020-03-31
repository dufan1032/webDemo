// 导入数据库
const model = require('../configMysql/model')
// 使用表 users
let Users = model.users;
// 导入加密模块
const bcrypt = require('bcrypt')
//生成salt的迭代次数
const saltRounds = 10;

// 返回信息
function returnData(code,message){
    return {
        code : code,
        message : message
    }
}

// 注册
let registers =  async (ctx,next) => {
    let username = ctx.request.body.username || '';
    let password = ctx.request.body.password || '';
    // 生成hash密码
    const salt = bcrypt.genSaltSync(saltRounds)
    let newPassword = bcrypt.hashSync(password,salt);
    
    await Users.create({
        username : username,
        password : newPassword
    })
        .then((data)=>{
            // console.log('username: ' + username + 'password: ' + newPassword);
            ctx.body = {
                code : 200,
                message : '注册成功'
            };
        })
        .catch((err)=>{
            // console.log(err);
            if(err.name == 'SequelizeUniqueConstraintError'){
                ctx.body = returnData(500,'用户 ' + username +  ' 已存在')
            }
            
        });
}

// 登录
let logins = async (ctx,next) => {
    let username = ctx.request.body.username || ''
        password = ctx.request.body.password || '';
    
    await Users.findOne({
        where : {
            username : username,
        }
    })
        .then(data=>{
            // 查询数据为空时，返回没有注册
            if(data === null){
                ctx.body = returnData(204,'用户名不存在');
            }
            else{
                let compare = bcrypt.compareSync(password,data.dataValues.password);
                if(compare){
                    ctx.body = returnData(200,'用户' + username + '登录成功');
                }else{
                    ctx.body = returnData(401,'密码输入错误');
                }
            }
        })
        .catch(error=>{
            ctx.body = returnData(500,error);
        });
}

// 获取商品详情信息
let goodsInfo = async (ctx,next) =>{
    let goodsInfo = model.goodsinfo;
    let goodsId = ctx.request.body.goodsId;

    await goodsInfo.findOne({
        where : {
            id : goodsId,
        }
    })
        .then(data=>{
            data.ORI_PRICE = data.ORI_PRICE / 100;
            data.PRESENT_PRICE = data.PRESENT_PRICE / 100;
            if(data) ctx.body = returnData(200,data)
            else ctx.body = returnData(500,'未查询到数据')
        })
        .catch(err=>{
            console.log(err);
            ctx.body = returnData(500,err);
        });
}

// 根据大类id获取小类
let typeSub = async (ctx,next)=>{
    // 使用表 goodstype
    let goodsTypeSub = model.goodstype_sub;

    // 数据库查找数据
    await goodsTypeSub.findAll({
        where : {
            MALL_CATEGORY_ID : ctx.request.body.typeId
        }
    })
        .then(data=>{
            ctx.body = {code:200,message : data};
        })
        .catch(err=>{
            ctx.body = {code:500,message : err};
        });
}

// 根据 获取分类列表
let typeSubList = async (ctx,next)=>{
    // 使用表 goodstype
    let goodsInfo = model.goodsinfo // 表goodsinfos
        num = 8 // 每页显示数量
        start = (ctx.request.body.pages -1)*num;

    // 数据库查找数据
    await goodsInfo.findAll({
        limit: num,
        offset: start,
        where : {
            SUB_ID : ctx.request.body.typeId
        }
    })
        .then(data=>{
            for(let i=0;i<data.length;i++){
                data[i].dataValues.ORI_PRICE = data[i].dataValues.ORI_PRICE / 100;
                data[i].dataValues.PRESENT_PRICE = data[i].dataValues.PRESENT_PRICE / 100;
            }
            ctx.body = {code:200,message : data};
        })
        .catch(err=>{
            ctx.body = {code:500,message : err};
        });
}

module.exports = {
    "POST /user/register" : registers,
    "POST /user/login" : logins,
    "POST /goods/info" : goodsInfo,
    "POST /goods/typeSub": typeSub,
    "POST /goods/typeSubList": typeSubList,
}