import { CourseRepository } from "../../../domain/course.repository";
import { Course, NewCourse } from "../../../domain/course.type";
import { CourseMongoDB } from "./course-mongo-repository";
import { CourseDoc, CourseRawDoc, } from "./course.model";

export default function createCoursesMongoRepository(courseDB: CourseMongoDB): CourseRepository {

    const courseDocToCourse = (courseDoc: CourseDoc): Course => {
        return {
            id: courseDoc._id,
            name: courseDoc.name
        }
    }

    const newCourseToCourseRawDoc = (newCourse: NewCourse): CourseRawDoc => {
        return {
            name: newCourse.name
        }
    }

    const addCourse = async (newCourse: NewCourse) => {
        const courseDoc = await courseDB.addCourse(newCourseToCourseRawDoc(newCourse))
        return courseDocToCourse(courseDoc)
    }

    const deleteCourseById = async (id: string) => {
        await courseDB.deleteCourseById(id)
    }
    const getAllCourses = async () => {
        const courseDocs = await courseDB.getAllCourses()
        return courseDocs.map(courseDocToCourse)
    }

    const findCourseById = async (id: string) => {
        const courseDoc = await courseDB.findCourseById(id)
        if (courseDoc !== null) return courseDocToCourse(courseDoc)
        return courseDoc
    }

    return {
        addCourse,
        deleteCourseById,
        getAllCourses,
        findCourseById
    }
}