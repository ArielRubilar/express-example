import { BusinessError } from "../../errors/business.error"

export class CourseNotFound implements BusinessError {
    status: string
    message: string

    constructor(message: string) {
        this.message = message
        this.status = 'NO OK'
    }
}