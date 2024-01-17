const { MONGOOSE } = require('../../utils/packages');
const Schema = MONGOOSE.Schema;

const brandSchema = new Schema(
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
        image: {
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

module.exports = brandSchema;
