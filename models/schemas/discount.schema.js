const { MONGOOSE } = require('../../utils/packages');
const Schema = MONGOOSE.Schema;

const discountSchema = new Schema(
    {
        code: {
            type: String
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        discountPercent: {
            type: Number
        },
        isActive: {
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

module.exports = discountSchema;
