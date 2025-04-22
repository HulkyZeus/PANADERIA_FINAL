import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "usuario"],
      default: "usuario",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Método para comparar contraseñas
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
