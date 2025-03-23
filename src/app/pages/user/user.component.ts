import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() idUser: string = '';
  myUser!:IUser
  userService= inject(UsersService)
  router = inject(Router);

  async ngOnInit(){
    let id= this.idUser
    console.log("This is the id: ",id)
    try{
      this.myUser = await this.userService.getByID(id)
    }catch(error){
      console.log(error)
    }
  }
  async deleteUser() {
    let id= this.idUser
    const confirmed = confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmed) {
      try {
        await this.userService.deleteUser(id); 
        alert("Usuario eliminado correctamente.");
        this.router.navigate(['/users']); 
      } catch (error) {
        console.log(error);
        alert("Hubo un error al eliminar el usuario.");
      }
    }
  }

}
