import { NextFunction, Request, Response } from "express"

export type ExpressRouteFunc = (req: Request, res: Response, next: NextFunction) => void | Promise<void>

export interface CourseController {
    getAllCourses: ExpressRouteFunc,
    getCourse: ExpressRouteFunc,
    deleteCourse: ExpressRouteFunc,
    addCourse: ExpressRouteFunc
}