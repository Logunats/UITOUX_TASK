const { EXPRESS } = require('../utils/packages');
const { productController } = require('./../controller');
const { productValidator } = require('../validators');

const productRoutes = EXPRESS.Router();

productRoutes.get('/bannerList', productController.getBannerList);
productRoutes.get('/sliderList', productController.getSliderList);
productRoutes.get('/brandList', productController.getBrandList);
productRoutes.get('/categoryList', productController.getCategoryList);
productRoutes.post('/subscribe', productValidator.updateSubscribe, productController.updateSubscribe);
productRoutes.post('/productList', productValidator.productList, productController.getProductList);
productRoutes.post('/topProductList', productValidator.topProductList, productController.getTopProductList);
productRoutes.post('/serachProduct', productValidator.searchProduct, productController.searchProduct);

module.exports = productRoutes;