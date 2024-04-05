import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgForm } from '@angular/forms';
import { Course } from '../course';
import { CourseService } from '../course.service';



@Component({
  selector: 'app-course-add',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './course-add.component.html',
  styleUrl: './course-add.component.css'
})
export class CourseAddComponent {
  course: Course

  constructor(private courseService: CourseService, private snackBar: MatSnackBar) {
    this.course = {} as Course;
  }

  // saves course to db and resets form inputs
  onSubmit(course: Course, form: NgForm) {
    this.courseService.addCourse(course).subscribe(newCourse => {
      const message = "New Course Added Successfully";
      this.showSnackBar(message);
      course = {} as Course;
      form.resetForm();
    })
  }
  // notification
  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000
    });
  }
}
