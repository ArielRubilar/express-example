import { Course, NewCourse } from "../../course.type";
import { CourseDoc, CourseRawDoc, } from "./course.model";

export const courseDocToCourse = (courseDoc: CourseDoc): Course => {
    return {
        id: courseDoc._id,
        name: courseDoc.name
    }
}

export const newCourseToCourseRawDoc = (newCourse: NewCourse): CourseRawDoc => {
    return {
        name: newCourse.name
    }
}