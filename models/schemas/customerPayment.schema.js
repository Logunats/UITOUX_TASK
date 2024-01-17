const { MONGOOSE } = require('../../utils/packages');
const Schema = MONGOOSE.Schema;
const ObjectId = Schema.ObjectId;
const { DB_MODELS } = require('../../utils/constant');

const customerPaymentSchema = new Schema(
    {
        customerId: {
            type: ObjectId,
            ref: DB_MODELS.CUSTOMER.COLLECTION
        },
        paymentType: {
            type: String
        },
        provider: {
            type: String
        },
        accountNumber: {
            type: String
        },
        expiry: {
            type: String
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

module.exports = customerPaymentSchema;
