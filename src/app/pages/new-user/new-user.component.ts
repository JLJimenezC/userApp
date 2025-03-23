import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css',
})
export class NewUserComponent {
  userForm: FormGroup;

  constructor(private usersService: UsersService) {
    this.userForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
      ]),
      imagen: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const newUser: IUser = this.userForm.value;

    this.usersService.createUser(newUser).then(
      (response) => {
        console.log('User created successfully:', response);
        this.userForm.reset();
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}
