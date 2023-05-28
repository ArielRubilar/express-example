import { CourseDoc, Course, CourseRawDoc } from "./course.model"


const addCourse = async (newCourse: CourseRawDoc) => {
    const courseRawDoc = { name: newCourse.name }
    const course = new Course(courseRawDoc)
    const createdCourseDoc = await course.save()
    return createdCourseDoc
}

const deleteCourseById = async (id: string): Promise<void> => {
    await Course.deleteOne({ _id: id })
}

const findCourseById = async (id: string) => {
    const courseDoc = await Course.findById(id)
    return courseDoc
}

const getAllCourses = async () => {
    const courseDocs = await Course.find({})
    return courseDocs
}

export interface CourseMongoDB {
    addCourse: (rawDoc: CourseRawDoc) => Promise<CourseDoc>,
    deleteCourseById: (id: string) => Promise<void>,
    getAllCourses: () => Promise<CourseDoc[]>,
    findCourseById: (id: string) => Promise<CourseDoc | null>
}

export default function createCoursesMongoDB(): CourseMongoDB {

    return {
        addCourse,
        deleteCourseById,
        getAllCourses,
        findCourseById
    }
}