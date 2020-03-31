const db = require('../configMysql/db');

module.exports = db.defineModel('typeSub', {
    id : db.STRING(50),
    MALL_CATEGORY_ID : db.STRING(2),
    MALL_SUB_NAME : db.STRING(20),
    SORT : db.INTEGER,
    COMMENTS : db.STRING(100),
});