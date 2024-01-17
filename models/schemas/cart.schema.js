const { DB_MODELS } = require('../../utils/constant');
const { MONGOOSE } = require('../../utils/packages');
const Schema = MONGOOSE.Schema;
const ObjectId = Schema.ObjectId;

const cartSchema = new Schema(
    {
        customerId: {
            type: ObjectId,
            ref: DB_MODELS.CUSTOMER.COLLECTION
        },
        products: [
            {
                productId: {
                    type: ObjectId,
                    ref: DB_MODELS.PRODUCTS.COLLECTION
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1
                },
                price: Number
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = cartSchema;
