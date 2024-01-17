const { DB_MODELS } = require('../../utils/constant');
const { MONGOOSE } = require('../../utils/packages');
const Schema = MONGOOSE.Schema;
const ObjectId = Schema.ObjectId;

const productInventorySchema = new Schema(
    {
        productId: {
            type: ObjectId,
            ref: DB_MODELS.PRODUCTS.COLLECTION
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

module.exports = productInventorySchema;
