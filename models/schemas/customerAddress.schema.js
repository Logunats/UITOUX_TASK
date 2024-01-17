const { MONGOOSE } = require('../../utils/packages');
const Schema = MONGOOSE.Schema;
const ObjectId = Schema.ObjectId;
const { DB_MODELS } = require('../../utils/constant');

const customerAddressSchema = new Schema(
    {
        customerId: {
            type: ObjectId,
            ref: DB_MODELS.CUSTOMER.COLLECTION
        },
        addressLine1: {
            type: String
        },
        addressLine2: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        postcode: {
            type: String
        },
        country: {
            type: String
        },
        mobile: {
            type: String
        },
        shippingName: {
            type: String
        },
        isPrimary: {
            type: Boolean
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

module.exports = customerAddressSchema;
