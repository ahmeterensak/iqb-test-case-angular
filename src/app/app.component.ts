import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { Student } from './students/student';
import { StudentService } from './students/student.service';
import { CourseService } from './courses/course.service';
import { Course } from './courses/course';
import { ManageExamResultsComponent } from './exam-results/manage-exam-results/manage-exam-results.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { ExamResultService } from './exam-results/exam-result.service';
import { ExamResult } from './exam-results/exam-result';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentAddComponent } from './students/student-add/student-add.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, StudentListComponent, StudentAddComponent, CourseListComponent, CourseAddComponent, ManageExamResultsComponent, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'iqb-test-case-angular';

  @Input() students: Student[];
  @Input() courses: Course[];

  @Input() selectedStudent: Student | undefined;
  @Input() selectedCourse: Course | undefined;

  examResult: ExamResult;

  constructor(private studentService: StudentService, private examResultService: ExamResultService, private courseService: CourseService, private snackBar: MatSnackBar
  ) {
    this.examResult = {} as ExamResult;
    this.students = [];
    this.courses = [];
  }
  ngOnInit() {
    this.studentService.getStudents().subscribe(
      students => this.students = students,
    );

    this.courseService.getCourses().subscribe(
      courses => this.courses = courses
    )
  }

  // saves examresult to db & resets form and shows notification
  onSubmit(examResult: ExamResult, form: NgForm) {
    if (this.selectedStudent === undefined || this.selectedCourse === undefined)
      return;
    examResult.student = this.selectedStudent;
    examResult.course = this.selectedCourse;

    this.examResultService.addExamResult(examResult).subscribe(newExamResult => {
      this.resetForm(form);

      const message = `New Exam Result Added Successfully Course: ${newExamResult.course.name} Student Number: ${newExamResult.student.number} ${newExamResult.score}`;
      this.showSnackBar(message);
    }, error => {
      this.resetForm(form);

      this.showSnackBar("Already registered 3 exam result in this for this student cannot register more!");
    });
  }

  // listens selectedStudent value changes from student-list.components to manage exam result processes
  onSelectedStudentValueChanged(newStudent: Student) {
    this.selectedStudent = newStudent;
  }

  // listens selectedCourse value changes from course-list.components to manage exam result processes
  onSelectedCourseValueChanged(newCourse: Course) {
    this.selectedCourse = newCourse;
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }

  private resetForm(form: NgForm) {
    this.selectedStudent = undefined;
    this.selectedCourse = undefined;
    form.resetForm();
  }

}


