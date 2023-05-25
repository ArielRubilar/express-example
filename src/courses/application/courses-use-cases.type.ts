import { Course, NewCourse } from "../domain/course.type";

export interface CoursesUseCases {
    getAllCourse: () => Promise<Course[]>,
    getCourse: (id: string) => Promise<Course>,
    deleteCourse: (id: string) => Promise<void>,
    addCourse: (newCourse: NewCourse) => Promise<Course>
}
