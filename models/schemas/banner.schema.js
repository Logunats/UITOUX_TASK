const { MONGOOSE } = require('../../utils/packages');
const Schema = MONGOOSE.Schema;

const bannerSchema = new Schema(
    {
        order: {
            type: Number
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        offer: {
            type: String
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

module.exports = bannerSchema;
