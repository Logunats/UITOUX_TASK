const { MONGOOSE } = require('../../utils/packages');
const Schema = MONGOOSE.Schema;

const customerSchema = new Schema(
    {
        // customerCode: {
        //     type: String
        // },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String
        },
        mobile: {
            type: String
        },
        password: {
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

module.exports = customerSchema;
