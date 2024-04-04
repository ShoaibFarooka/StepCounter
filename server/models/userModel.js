const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmPassword: {
            type: String,
            required: true,
        },
        stepCount: {
            type: Number,
            default: 0,
        },
        lastUpdateDate: {
            type: Date,
            default: null
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

userSchema.virtual('services', {
    //ref: 'Service',
    localField: '_id',
    foreignField: 'user'
})

const User = mongoose.model("User", userSchema);

module.exports = User;
