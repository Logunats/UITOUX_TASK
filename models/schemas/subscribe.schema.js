const { MONGOOSE } = require('../../utils/packages');
const Schema = MONGOOSE.Schema;

const subscribeSchema = new Schema(
    {
        email: {
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

module.exports = subscribeSchema;
