import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';  
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
        Validators.pattern(/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
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

        this.userForm.patchValue({
          nombre: user.first_name,
          apellido: user.last_name,
          email: user.email,
          imagen: user.image,  
        });
      },
      (error) => {
        console.error('Error loading user data:', error);
      }
    );
  }


  updateUser(): void {
    console.log('Formulario válido?', this.userForm.valid);
    Object.keys(this.userForm.controls).forEach(key => {
      console.log(`${key}: ${this.userForm.get(key)?.valid}`);
    });
  
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      alert('El formulario es inválido. Por favor, corrija los errores.');
      return;
    }
  
    if (this.idUser) {
      const updatedUser: IUser = this.userForm.value;
      this.usersService.updateUser(this.idUser, updatedUser).then(
        (response) => {

          console.log('Respuesta de la API:', response);
          alert('¡Usuario actualizado correctamente!');
          this.userForm.reset();
        },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
          alert('Hubo un error al actualizar el usuario. Intenta nuevamente.');
        }
      );
    }
  }
  

}
