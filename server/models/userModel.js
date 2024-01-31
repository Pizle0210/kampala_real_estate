import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
  },
  { timestamps: true }
);

const SALT_ROUNDS = 12;

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(SALT_ROUNDS);
  this.password = await bcrypt.hashSync(this.password, salt);
});

const User = model("User", UserSchema);
export default User;
