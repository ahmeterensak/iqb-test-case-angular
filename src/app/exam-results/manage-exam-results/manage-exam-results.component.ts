import { Component, Input } from '@angular/core';
import { Student } from '../../students/student';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from '../../students/student-list/student-list.component';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { Course } from '../../courses/course';
import { ExamResultService } from '../exam-result.service';
import { ExamResult } from '../exam-result';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-manage-exam-results',
  standalone: true,
  imports: [CommonModule, StudentListComponent, MatSelect, MatOption, MatFormField, MatLabel, MatListModule, MatGridListModule, MatTableModule],
  templateUrl: './manage-exam-results.component.html',
  styleUrl: './manage-exam-results.component.css'
})
export class ManageExamResultsComponent {

  @Input() students: Student[];
  @Input() courses: Course[];

  resultsForCourse: ExamResult[];
  resultsForStudent: ExamResult[];

  selectedStudent: Student | undefined;
  selectedCourse: Course | undefined;

  displayedResultCourseColumns: string[] = ['id', 'name', 'score'];
  displayedResultStudentColumns: string[] = ['fullName', 'number', 'score'];

  constructor(private examResultService: ExamResultService) {
    this.students = []
    this.courses = []
    this.resultsForStudent = []
    this.resultsForCourse = []
  }
  
  // Handles student selection from select component for viewing exam results for selected student
  onStudentSelected() {
    if (!this.selectedStudent) {
      this.resultsForCourse = [];
      return;
    }
    this.setFilteredCoursesByStudentId(this.selectedStudent.id);
  }

  // Handles course selection from select component for viewing exam results for selected course
  onCourseSelected() {
    if (!this.selectedCourse) {
      this.resultsForStudent = [];
      return;
    }
    this.setFilteredStudentsByCourseId(this.selectedCourse.id);
  }


  // fetches exam results from db by course id
  private setFilteredStudentsByCourseId(courseId: number) {
    this.examResultService.getStudentsByCourseId(courseId).subscribe(
      students => this.resultsForStudent = students,
    );
  }

  // fetches exam results from db by student id
  private setFilteredCoursesByStudentId(studentId: number) {
    this.examResultService.getCoursesByStudentdId(studentId).subscribe(
      courses => this.resultsForCourse = courses,
    );
  }
}
