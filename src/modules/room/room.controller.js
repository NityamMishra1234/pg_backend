import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createRoom,
  getRoomsByPG,
  updateRoom,
  deleteRoom,
  getRoomDetails
} from "./room.service.js";

export const create = asyncHandler(async (req, res) => {
  const room = await createRoom(req.body, req.user.id);

  res.status(201).json({
    success: true,
    data: room,
  });
});

export const getByPG = asyncHandler(async (req, res) => {
  const rooms = await getRoomsByPG(req.params.pgId, req.user.id);

  res.json({
    success: true,
    data: rooms,
  });
});

export const update = asyncHandler(async (req, res) => {
  const room = await updateRoom(
    req.params.id,
    req.user.id,
    req.body
  );

  res.json({
    success: true,
    data: room,
  });
});

export const remove = asyncHandler(async (req, res) => {
  await deleteRoom(req.params.id, req.user.id);

  res.json({
    success: true,
    message: "Room deleted successfully",
  });
});


export const details = asyncHandler(async (req, res) => {
  const room = await getRoomDetails(
    req.params.roomId,
    req.user.id
  );

  res.json({
    success: true,
    data: room,
  });
});