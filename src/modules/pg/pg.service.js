import PG from "./pg.model.js";

export const createPG = async (data, ownerId) => {
  return await PG.create({
    ...data,
    ownerId,
  });
};

export const getAllPGs = async (ownerId) => {
  return await PG.find({ ownerId });
};

export const getPGById = async (id, ownerId) => {
  const pg = await PG.findOne({ _id: id, ownerId });
  if (!pg) throw new Error("PG not found");
  return pg;
};

export const updatePG = async (id, ownerId, data) => {
  const pg = await PG.findOneAndUpdate(
    { _id: id, ownerId },
    data,
    { new: true }
  );

  if (!pg) throw new Error("PG not found or not authorized");

  return pg;
};

export const deletePG = async (id, ownerId) => {
  const pg = await PG.findOneAndDelete({ _id: id, ownerId });

  if (!pg) throw new Error("PG not found or not authorized");

  return pg;
};