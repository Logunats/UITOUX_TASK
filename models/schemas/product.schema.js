const { MONGOOSE } = require('../../utils/packages');
const Schema = MONGOOSE.Schema;
const ObjectId = Schema.ObjectId;
const { DB_MODELS } = require('../../utils/constant');

const productSchema = new Schema(
    {
        brandId: {
            type: ObjectId,
            ref: DB_MODELS.BRAND.COLLECTION
        },
        categoryId: {
            type: ObjectId,
            ref: DB_MODELS.PRODUCT_CATEGORY.COLLECTION
        },
        skuCode: {
            type: String
        },
        price: {
            type: Number
        },
        discountId: {
            type: ObjectId,
            ref: DB_MODELS.DISCOUNT.COLLECTION
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        currency: {
            type: String
        },
        image: {
            type: String
        },
        specialOffer: {
            type: Boolean
        },
        rating: {
            type: Number
        },
        soldQuantity: {     // increase the count based on the purchase
            type: Number
        },
        totalReviewers: {
            type: Number
        },
        deleteFlag: {
            type: Boolean,
            default: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = productSchema;
