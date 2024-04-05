import { Course } from "../courses/course";
import { Student } from "../students/student";

export class ExamResult {
    constructor(
        public id: number,
        public score: number,
        public course: Course,
        public student: Student
    ) { }
}