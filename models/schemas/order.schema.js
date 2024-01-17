const { MONGOOSE } = require('../../utils/packages');
const Schema = MONGOOSE.Schema;
const ObjectId = Schema.ObjectId;
const { DB_MODELS } = require('../../utils/constant');

const orderSchema = new Schema(
    {
        orderNumber: {
            type: String
        },
        orderDate: {
            type: Date
        },
        totalPrice: {
            type: Number
        },
        paymentId: {
            type: ObjectId,
            ref: DB_MODELS.CUSTOMER_PAYMENT.COLLECTION
        },
        productId: {
            type: ObjectId,
            ref: DB_MODELS.PRODUCTS.COLLECTION
        },
        price: {
            type: Number
        },
        quantity: {
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

module.exports = orderSchema;
