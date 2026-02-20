import Room from "./room.model.js";
import PG from "../pg/pg.model.js";

export const createRoom = async (data, ownerId) => {
    const { pgId, roomNumber, totalBeds } = data;

    const pg = await PG.findOne({ _id: pgId, ownerId });
    if (!pg) throw new Error("PG not found or not authorized");

    const beds = [];

    for (let i = 1; i <= totalBeds; i++) {
        beds.push({
            bedNumber: i,
            isOccupied: false,
            studentId: null,
        });
    }

    return await Room.create({
        pgId,
        ownerId,
        roomNumber,
        totalBeds,
        beds,
    });
};

export const getRoomsByPG = async (pgId, ownerId) => {
    return await Room.find({ pgId, ownerId });
};

export const updateRoom = async (roomId, ownerId, data) => {
    const room = await Room.findOne({ _id: roomId, ownerId });

    if (!room) throw new Error("Room not found");

    if (data.totalBeds !== undefined) {
        const newTotal = data.totalBeds;
        const currentTotal = room.totalBeds;

        // Count occupied beds
        const occupiedCount = room.beds.filter(
            (bed) => bed.isOccupied
        ).length;

        if (newTotal < occupiedCount) {
            throw new Error("Cannot reduce beds below occupied count");
        }

        // 🔹 Case 1: Increasing beds
        if (newTotal > currentTotal) {
            for (let i = currentTotal + 1; i <= newTotal; i++) {
                room.beds.push({
                    bedNumber: i,
                    isOccupied: false,
                    studentId: null,
                });
            }
        }

        // 🔹 Case 2: Decreasing beds
        if (newTotal < currentTotal) {
            room.beds = room.beds.filter(
                (bed) => bed.bedNumber <= newTotal
            );
        }

        room.totalBeds = newTotal;
    }

    // Update roomNumber if provided
    if (data.roomNumber) {
        room.roomNumber = data.roomNumber;
    }

    return await room.save();
};

export const deleteRoom = async (roomId, ownerId) => {
    const room = await Room.findOne({ _id: roomId, ownerId });

    if (!room) throw new Error("Room not found");

    if (room.occupiedBeds > 0) {
        throw new Error("Cannot delete room with active students");
    }

    await room.deleteOne();
};