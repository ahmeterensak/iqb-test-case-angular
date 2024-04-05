import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../student';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ExamResultService } from '../../exam-results/exam-result.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-student-list',
  imports: [CommonModule, MatTableModule, MatFormFieldModule, FormsModule, MatInputModule, MatSelectModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  @Input() students: Student[];

  @Input() selectedStudent: Student | undefined;

  @Output() selectedStudentValueChanged = new EventEmitter<Student>();

  averageScoresOfCompletedCourses: any[];

  displayedColumns: string[] = ['id', 'fullName', 'number', 'email', 'gsmNumber'];

  currentFilterColumn: string = 'id';

  dataSource = new MatTableDataSource<Student>();

  constructor(private examResultService: ExamResultService) {
    this.students = [];
    this.averageScoresOfCompletedCourses = [];
  }

  ngOnInit(): void {
    this.fetchAverageScoresOfCompletedCourses();
    this.dataSource.data = this.students;
  }

  // catches student selection from student table and triggers an event to pass selectedStudent value to app.component

  onStudentSelection(student: Student | undefined) {
    if (student === this.selectedStudent) {
      student = undefined;
    }

    this.selectedStudent = student;
    this.onSelectedStudentValueChanged(student);
  }

  // event trigger for passing value of selectedStudent to app.component
  onSelectedStudentValueChanged(newStudent: Student | undefined) {
    this.selectedStudentValueChanged.emit(newStudent);
  }

  // gets completed courses data by student id from object array which fetched on ngOnInit
  getCompletedCourses(studentId: number): any[] {
    return this.averageScoresOfCompletedCourses.filter(courseInfo => courseInfo[0] === studentId);
  }

  // fetches all completed courses data from db on init
  fetchAverageScoresOfCompletedCourses() {
    this.examResultService.getAllAverageScoresOfCompletedCoursesWithStudentId().subscribe(
      data => this.averageScoresOfCompletedCourses = data
    );
  }


  //Filter Functions

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (student: Student, filter: string) => {
      const value = this.getDisplayedColumnValue(student).toLowerCase();
      return value.includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  updateFilterColumn(column: string) {
    this.currentFilterColumn = column;
    this.applyFilter('');
  }

  getDisplayedColumnValue(student: Student): string {
    switch (this.currentFilterColumn) {

      case 'id':
        return student.id.toString();

      case 'fullName':
        return student.fullName;

      case 'number':
        return student.number.toString();

      case 'email':
        return student.email;

      case 'gsmNumber':
        return student.gsmNumber;

      default:
        return '';
    }
  }
}
