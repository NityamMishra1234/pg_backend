import { asyncHandler } from "../utils/asyncHandler.js";
import {
    addStudent,
    changeStudentBed,
    removeStudent,
    searchStudents,
    getStudentByBed,
    getStudents,
} from "./student.service.js";

export const create = asyncHandler(async (req, res) => {
    const student = await addStudent(req.body, req.user.id);

    res.status(201).json({
        success: true,
        message: "Student added successfully",
        data: student,
    });
});

export const changeBed = asyncHandler(async (req, res) => {
    const student = await changeStudentBed(
        req.params.id,
        req.body.newRoomId,
        req.body.newBedNumber,
        req.user.id
    );

    res.json({
        success: true,
        message: "Student bed changed",
        data: student,
    });
});

export const remove = asyncHandler(async (req, res) => {
    const student = await removeStudent(
        req.params.id,
        req.user.id
    );

    res.json({
        success: true,
        message: "Student removed (soft delete)",
        data: student,
    });
});
export const getByBed = asyncHandler(async (req, res) => {
    const { roomId, bedNumber } = req.params;

    const student = await getStudentByBed(
        roomId,
        Number(bedNumber),
        req.user.id
    );

    res.json({
        success: true,
        data: student,
    });
});

export const list = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const includeInactive =
        req.query.inactive === "true";

    const data = await getStudents(
        req.user.id,
        page,
        limit,
        includeInactive
    );

    res.json({
        success: true,
        ...data,
    });
});

export const search = asyncHandler(async (req, res) => {
    const includeInactive =
        req.query.inactive === "true";

    const students = await searchStudents(
        req.query.q,
        req.user.id,
        includeInactive
    );

    res.json({
        success: true,
        data: students,
    });
});