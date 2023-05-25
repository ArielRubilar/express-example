import { Course, NewCourse } from "../course.type";

export interface CourseService {
    getAllCourse: () => Promise<Course[]>,
    getCourse: (id: string) => Promise<Course>,
    deleteCourse: (id: string) => Promise<void>,
    addCourse: (newCourse: NewCourse) => Promise<Course>
}
