import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Owner from "./auth.model.js";

export const registerOwner = async (data) => {
  const { name, email, password } = data;

  const existingUser = await Owner.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const owner = await Owner.create({
    name,
    email,
    password: hashedPassword,
  });

  return owner;
};

export const loginOwner = async (data) => {
  const { email, password } = data;

  const owner = await Owner.findOne({ email }).select("+password");

  if (!owner) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, owner.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: owner._id, role: owner.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  const ownerObj = owner.toObject();

  delete ownerObj.password;

  return { owner: ownerObj, token };

};