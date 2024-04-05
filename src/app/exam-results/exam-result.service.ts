import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ExamResult } from './exam-result';

@Injectable({
  providedIn: 'root'
})
export class ExamResultService {
  private baseUrl = 'http://localhost:8080/api/results';

  constructor(private http: HttpClient) {
  }
  getCoursesByStudentdId(studentId: number): Observable<ExamResult[]> {
    return this.http.get<ExamResult[]>((this.baseUrl + '/students/' + studentId));
  }
  getStudentsByCourseId(courseId: number): Observable<ExamResult[]> {
    return this.http.get<ExamResult[]>((this.baseUrl + '/courses/' + courseId));
  }
  addExamResult(examResult: ExamResult): Observable<ExamResult> {
    return this.http.post<ExamResult>(this.baseUrl, examResult);
  }

  getAllAverageScoresOfCompletedCoursesWithStudentId(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/getAllAveragesOfCompletedCoursesForStudents')
  }
}
