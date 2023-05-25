import { Course, NewCourse } from "../course.type"

export interface CourseDB {
    addCourse: (newCourse: NewCourse) => Promise<Course>,
    deleteCourseById: (id: string) => Promise<void>,
    findCourseById: (id: string) => Promise<Course | null>
    getAllCourses: () => Promise<Course[]>
}