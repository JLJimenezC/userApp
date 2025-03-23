import { Component, inject } from '@angular/core';
import { IUser, IUserResponse } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  arrUsers: IUser[] = [];
  userServices = inject(UsersService);
  nextLink: string = '';
  previousLing: string = '';

  ngOnInit() {
    this.loadUsers();
  }
  async loadUsers(url: string = '') {
    try {
      let response: IResponse = await this.userServices.getAll(url);
      this.arrUsers = response.results;
    } catch (error) {
      console.log(error);
    }
  }
  
}
