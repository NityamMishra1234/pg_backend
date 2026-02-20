import {
  createPG,
  getAllPGs,
  getPGById,
  updatePG,
  deletePG,
} from "./pg.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const create = asyncHandler(async (req, res) => {
  const pg = await createPG(req.body, req.user.id);

  res.status(201).json({
    success: true,
    data: pg,
  });
});

export const getAll = asyncHandler(async (req, res) => {
  const pgs = await getAllPGs(req.user.id);

  res.json({
    success: true,
    data: pgs,
  });
});

export const getOne = asyncHandler(async (req, res) => {
  const pg = await getPGById(req.params.id, req.user.id);

  res.json({
    success: true,
    data: pg,
  });
});

export const update = asyncHandler(async (req, res) => {
  const pg = await updatePG(req.params.id, req.user.id, req.body);

  res.json({
    success: true,
    data: pg,
  });
});

export const remove = asyncHandler(async (req, res) => {
  await deletePG(req.params.id, req.user.id);

  res.json({
    success: true,
    message: "PG deleted successfully",
  });
});