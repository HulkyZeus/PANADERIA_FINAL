import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^[A-Za-zÀ-ÿ0-9_ ]+$/, "Solo letras, números, guiones bajos (_) y espacios"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);