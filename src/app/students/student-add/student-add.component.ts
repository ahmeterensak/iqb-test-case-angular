import { Component, Input } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent {
  student: Student;

  constructor(private studentService: StudentService, private snackBar: MatSnackBar) {
    this.student = {} as Student;
  }

  // saves course to db & resets form inputs & shows notification
  onSubmit(student: Student, form: NgForm) {
    this.studentService.addStudent(student).subscribe(newStudent => {
      const message = "New Student Added Successfully";
      this.showSnackBar(message);
      student = {} as Student;
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
