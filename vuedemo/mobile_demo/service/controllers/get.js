const fs = require('fs')
// 导入数据库
const model = require('../configMysql/model')

let gets = async (ctx,next)=>{
    ctx.body = '<h1>index</h1>'
}

// 将商品信息插入数据库
let insertGoodsInfo = async (ctx,next)=>{
    // 使用表 goodsinfo
    let goodsInfo = model.goodsinfo;

    // 读取 json 数据 商品信息文件
    fs.readFile('./mysqlInsertData/newgoods.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        data.map((value,index)=>{
            let ORI_PRICE = value.ORI_PRICE * 100;
            let PRESENT_PRICE = value.ORI_PRICE * 100;
            goodsInfo.create({
                id : value.ID,
                GOODS_SERIAL_NUMBER:value.GOODS_SERIAL_NUMBER,
                SHOP_ID:value.SHOP_ID,
                SUB_ID:value.SUB_ID,
                GOOD_TYPE:value.GOOD_TYPE,
                GOODS_STATE:value.STATE,
                NAME:value.NAME,
                ORI_PRICE:ORI_PRICE,
                PRESENT_PRICE:PRESENT_PRICE,
                AMOUNT:value.AMOUNT,
                DETAIL:value.DETAIL || 'null',
                BRIEF:value.BRIEF || 'null',
                SALES_COUNT:value.SALES_COUNT,
                IMAGE1:value.IMAGE1,
                IMAGE2:value.IMAGE2 || 'null',
                IMAGE3:value.IMAGE3 || 'null',
                IMAGE4:value.IMAGE4 || 'null',
                IMAGE5:value.IMAGE5 || 'null',
                ORIGIN_PLACE:value.ORIGIN_PLACE  || 'null',
                GOOD_SCENT:value.GOOD_SCENT  || 'null',
                IS_RECOMMEND:value.IS_RECOMMEND,
                createdAt:value.CREATE_TIME,
                updatedAt:value.UPDATE_TIME,
                PICTURE_COMPERSS_PATH:value.PICTURE_COMPERSS_PATH
            })
                // .then(()=>{
                //     null;
                // })
                // .catch(()=>{
                //     null;
                // });
        });
    });
    ctx.body = '<h1>开始插入商品数据</h1>'
}

// 插入商品分类
let goodsType = async (ctx,next)=>{
    // 使用表 goodstype 和 goodstype_sub
    let goodsType = model.goodstype
        typeSub = model.goodstype_sub


    // 读取 json 数据 商品分类信息文件
    fs.readFile('./mysqlInsertData/category.json','utf8',(err,data)=>{
        data = JSON.parse(data).RECORDS;
        data.map((value,index)=>{
            goodsType.create({
                id : value.ID,
                MALL_CATEGORY_NAME : value.MALL_CATEGORY_NAME,
                IMAGE : value.IMAGE,
                TYPE : value.TYPE,
                SORT : value.SORT,
                COMMENTS : value.COMMENTS  || 'null',
            })
                // .then(()=>{
                //     null;
                // })
                // .catch(()=>{
                //     null;
                // });
        });
    });
    // 读取 json 数据 商品分类附属分类信息文件
    fs.readFile('./mysqlInsertData/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data).RECORDS;
        data.map((value,index)=>{
            typeSub.create({
                id : value.ID,
                MALL_CATEGORY_ID : value. MALL_CATEGORY_ID,
                MALL_SUB_NAME : value.MALL_SUB_NAME,
                SORT : value.SORT,
                COMMENTS : value.COMMENTS || 'null',
            })
                // .then(()=>{
                //     null;
                // })
                // .catch(()=>{
                //     null;
                // });
        });
    });
    ctx.body = 'ok'
}

// 获取商品大类
let getType = async (ctx,next)=>{
    // 使用表 goodstype
    let goodsTypes = model.goodstype;

    // 数据库查找数据
    await goodsTypes.findAll()
        .then(data=>{
            ctx.body = {code:200,message : data};
        })
        .catch(err=>{
            ctx.body = {code:500,message : err};
        });
}

module.exports = {
    "GET /" : gets,
    "GET /goods/insertGoodsInfo" : insertGoodsInfo,
    "GET /goods/type": goodsType,
    "GET /goods/getType": getType,
}