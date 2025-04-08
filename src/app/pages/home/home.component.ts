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
  currentPage: number = 1;
  totalPages: number = 0;

  ngOnInit() {
    this.loadUsers();
  }
  async loadUsers(page: number = 1) {
    try {
      const response = await this.userServices.getAll(page);
      
  
      if (response) {
        this.arrUsers = response.results;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  loadPage(isNext: boolean) {
    const nextPage = isNext ? 
      this.currentPage + 1 : 
      this.currentPage - 1;

    if (nextPage > 0 && nextPage <= this.totalPages) {
      this.loadUsers(nextPage);
    }
  }
  
}
