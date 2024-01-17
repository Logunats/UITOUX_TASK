const { MONGOOSE } = require('../../utils/packages');
const Schema = MONGOOSE.Schema;

const shipmentSchema = new Schema(
    {
        shipmentNumber: {
            type: String
        },
        shipmentDate: {
            type: Date
        },
        address: {
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

module.exports = shipmentSchema;
