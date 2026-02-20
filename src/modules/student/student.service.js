import Student from "./student.model.js";
import Room from "../room/room.model.js";
import PG from "../pg/pg.model.js";

export const addStudent = async (data, ownerId) => {
  const {
    pgId,
    roomId,
    bedNumber,
    paymentType,
  } = data;

  // Check PG ownership
  const pg = await PG.findOne({ _id: pgId, ownerId });
  if (!pg) throw new Error("PG not found");

  // Check Room ownership
  const room = await Room.findOne({ _id: roomId, ownerId });
  if (!room) throw new Error("Room not found");

  // Find bed
  const bed = room.beds.find(
    (b) => b.bedNumber === bedNumber
  );

  if (!bed) throw new Error("Invalid bed number");

  if (bed.isOccupied) {
    throw new Error("Bed already occupied");
  }

  // Set due date
  let dueDate = new Date();
  if (paymentType === "MONTHLY") {
    dueDate.setMonth(dueDate.getMonth() + 1);
  } else {
    dueDate.setFullYear(dueDate.getFullYear() + 1);
  }

  const student = await Student.create({
    ...data,
    ownerId,
    paymentDueDate: dueDate,
  });

  // Mark bed occupied
  bed.isOccupied = true;
  bed.studentId = student._id;

  await room.save();

  return student;
};
export const changeStudentBed = async (
  studentId,
  newRoomId,
  newBedNumber,
  ownerId
) => {
  const student = await Student.findOne({
    _id: studentId,
    ownerId,
    isActive: true,
  });

  if (!student) throw new Error("Student not found");

  const oldRoom = await Room.findById(student.roomId);
  const newRoom = await Room.findOne({
    _id: newRoomId,
    ownerId,
  });

  if (!newRoom) throw new Error("New room not found");

  const newBed = newRoom.beds.find(
    (b) => b.bedNumber === newBedNumber
  );

  if (!newBed || newBed.isOccupied)
    throw new Error("New bed not available");

  // Free old bed
  const oldBed = oldRoom.beds.find(
    (b) => b.bedNumber === student.bedNumber
  );

  oldBed.isOccupied = false;
  oldBed.studentId = null;

  await oldRoom.save();

  // Assign new bed
  newBed.isOccupied = true;
  newBed.studentId = student._id;

  await newRoom.save();

  student.roomId = newRoomId;
  student.bedNumber = newBedNumber;

  await student.save();

  return student;
};
export const removeStudent = async (studentId, ownerId) => {
  const student = await Student.findOne({
    _id: studentId,
    ownerId,
  });

  if (!student) throw new Error("Student not found");

  const room = await Room.findById(student.roomId);

  const bed = room.beds.find(
    (b) => b.bedNumber === student.bedNumber
  );

  bed.isOccupied = false;
  bed.studentId = null;

  await room.save();

  student.isActive = false;
  await student.save();

  return student;
};

export const getStudents = async (
  ownerId,
  page = 1,
  limit = 10,
  includeInactive = false
) => {
  const skip = (page - 1) * limit;

  const filter = { ownerId };

  if (!includeInactive) {
    filter.isActive = true;
  }

  const students = await Student.find(filter)
    .populate("roomId", "roomNumber")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(filter);

  return {
    total,
    page,
    limit,
    students,
  };
};

export const getStudentByBed = async (
  roomId,
  bedNumber,
  ownerId
) => {
  return await Student.findOne({
    ownerId,
    roomId,
    bedNumber,
    isActive: true,
  }).populate("roomId", "roomNumber");
};
export const searchStudents = async (
  query,
  ownerId,
  includeInactive = false
) => {
  const filter = {
    ownerId,
    $text: { $search: query },
  };

  if (!includeInactive) {
    filter.isActive = true;
  }

  return await Student.find(filter)
    .populate("roomId", "roomNumber")
    .sort({ createdAt: -1 });
};