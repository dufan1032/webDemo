const baseURL = 'https://www.fastmock.site/mock/f2cbeb41cdbb1f2cd313c057ce03f897/mobileDemo/';
const registerURL = 'http://localhost:3000'

module.exports = {
    getShoppingMallInfo : baseURL + 'index',
    userRegister :  registerURL + '/user/register',
    userLogin :  registerURL + '/user/login',
    getGoodsInfo :  registerURL + '/goods/info',
    getType :  registerURL + '/goods/getType',
    typeSub :  registerURL + '/goods/typeSub',
    typeSubList :  registerURL + '/goods/typeSubList',
}
