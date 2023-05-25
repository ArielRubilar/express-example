import { Document, Schema, model } from "mongoose";

export interface CourseRawDoc {
    name: string
}

export type CourseDoc = CourseRawDoc & Document

const courseSchema = new Schema<CourseDoc>({
    name: { type: String, required: true }
})

export const Course = model<CourseDoc>('Course', courseSchema)

