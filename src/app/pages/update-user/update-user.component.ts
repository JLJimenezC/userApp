import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';  // Asegúrate de que la ruta del servicio sea correcta
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  userForm: FormGroup;
  @Input() idUser: string = ''; 

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
        Validators.pattern(/^[\w.-]+@[a-zA-Z_]+?\.[a-zAZ]{2,3}$/),
      ]),
      imagen: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    const idUserFromRoute =this.idUser;  
    if (idUserFromRoute) {
      this.idUser = idUserFromRoute;
      this.loadUserData(idUserFromRoute);
    }
  }


  loadUserData(id: string): void {
    this.usersService.getByID(id).then(
      (user) => {
        this.userForm.patchValue(user);  
      },
      (error) => {
        console.error('Error loading user data:', error);
      }
    );
  }


  updateUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if (this.idUser) {
      const updatedUser: IUser = this.userForm.value;
      this.usersService.updateUser(this.idUser, updatedUser).then(
        (response) => {
          console.log('User updated successfully:', response);
          this.userForm.reset();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

}
