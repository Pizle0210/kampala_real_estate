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

UserSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compareSync(enteredPassword, this.password);
};

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

const User = model("User", UserSchema);
export default User;
