import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Course } from '../course';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule, MatInputModule, MatSelectModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  @Input() courses: Course[];

  @Input() selectedCourse: Course | undefined;

  @Output() selectedCourseValueChanged = new EventEmitter<Course>();

  displayedColumns: string[] = ['id', 'name'];

  currentFilterColumn: string = 'id';

  dataSource = new MatTableDataSource<Course>();

  constructor() {
    this.courses = [];
  }
  ngOnInit(): void {
    this.dataSource.data = this.courses;
  }

  // catches course selection from course table and triggers an event to pass selectedCourse value to app.component
  onCourseSelection(course: Course | undefined) {
    if (course === this.selectedCourse)
      course = undefined;

    this.selectedCourse = course;
    this.onSelectedCourseValueChanged(course);
  }

  // event trigger for passing value of selectedCourse to app.component
  onSelectedCourseValueChanged(newCourse: Course | undefined) {
    this.selectedCourseValueChanged.emit(newCourse);
  }

  // handles filtering process on Course table applies filter for every changes on filter input field 
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (course: Course, filter: string) => {
      const value = this.getDisplayedColumnValue(course).toLowerCase();
      return value.includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  // handles filter column changes to apply filter for
  updateFilterColumn(column: string) {
    this.currentFilterColumn = column;
    this.applyFilter('');
  }

  // returns student data by currentFilterColumn 
  getDisplayedColumnValue(course: Course): string {
    switch (this.currentFilterColumn) {

      case 'id':
        return course.id.toString();

      case 'name':
        return course.name;

      default:
        return '';
    }
  }
}
