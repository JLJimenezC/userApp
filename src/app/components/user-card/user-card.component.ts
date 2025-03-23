import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() myUser!: IUser;
  @Input() idUser: string = '';

  userService = inject(UsersService);
  router = inject(Router);

  async deleteUser(userId: string) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmed) {
      try {
        // Delete user
        await this.userService.deleteUser(userId);
        alert('Usuario eliminado correctamente.');

        // Navigate back to the users list
        this.router.navigate(['/users']);
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Hubo un error al eliminar el usuario.');
      }
    }
  }
}
