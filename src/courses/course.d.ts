export interface Course {
    id: number,
    name: string
}

export type NewCourse = Omit<Course, 'id'>