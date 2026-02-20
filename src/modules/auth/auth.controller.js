import { registerOwner, loginOwner } from "./auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const register = asyncHandler(async (req, res) => {
  const owner = await registerOwner(req.body);

  res.status(201).json({
    success: true,
    data: owner,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { owner, token } = await loginOwner(req.body);

  res.status(200).json({
    success: true,
    token,
    owner,
  });
});