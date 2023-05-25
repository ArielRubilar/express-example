import { Course, NewCourse } from "../../course.type"
import { CourseDB } from '../db.types'
import { Course as CourseDoc } from "./course.model"
import { courseDocToCourse, newCourseToCourseRawDoc } from "./course-adapter"


const addCourse = async (newCourse: NewCourse): Promise<Course> => {
    const courseRawDoc = newCourseToCourseRawDoc(newCourse)
    const courseDoc = new CourseDoc(courseRawDoc)
    const createdCourseDoc = await courseDoc.save()
    return courseDocToCourse(createdCourseDoc)
}

const deleteCourseById = async (id: string): Promise<void> => {
    await CourseDoc.deleteOne({ _id: id })
}

const findCourseById = async (id: string): Promise<Course | null> => {
    const courseDoc = await CourseDoc.findById(id)
    if (!courseDoc) return null
    return courseDocToCourse(courseDoc)
}

const getAllCourses = async (): Promise<Course[]> => {
    const courseDocs = await CourseDoc.find({})
    return courseDocs.map(courseDocToCourse)
}

export default function createCoursesMongoDB(): CourseDB {

    return {
        addCourse,
        deleteCourseById,
        getAllCourses,
        findCourseById
    }
}