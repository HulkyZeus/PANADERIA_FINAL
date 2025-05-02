import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role: {
      type: String,
      enum: ["admin", "usuario"],
      default: "usuario",
    },
}, {
    timestamps: true
})

export default mongoose.model('User', usersSchema);