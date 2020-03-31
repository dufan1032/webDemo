const db = require('../configMysql/db');

module.exports = db.defineModel('goodsType', {
    id : db.STRING(2),
    MALL_CATEGORY_NAME : db.STRING(20),
    IMAGE : db.STRING(150),
    TYPE : db.INTEGER,
    SORT : db.INTEGER,
    COMMENTS : db.STRING(100),
});