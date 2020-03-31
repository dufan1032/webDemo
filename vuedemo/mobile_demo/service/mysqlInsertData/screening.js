const fs = require('fs');

fs.readFile('./mysqlInsertData/goods.json','utf-8',(err,data)=>{
    let jsonData = JSON.parse(data).RECORDS;
    let newGoods = [];
    let i = 1;

    jsonData.map((value,index)=>{
        if(value.IMAGE1 != null){
            i++;
            newGoods.push(value);
        }
    });

    fs.writeFile('./mysqlInsertData/newgoods.json',JSON.stringify(newGoods),(err)=>{
        if(err) console.log('写文件操作失败');
        else console.log('写文件操作成功');
    })
});