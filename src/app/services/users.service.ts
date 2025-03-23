import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { catchError, lastValueFrom} from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'https://peticiones.online/api/users';
  user: IUser[] = [];

  getAll(url: string): Promise<IResponse> {
    url = 'https://peticiones.online/api/users';
    return lastValueFrom(this.httpClient.get<IResponse>(url));
  }

  getByID(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`));
  }

  deleteUser(id: string): Promise<void> {
    return lastValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/${id}`));
  }

  createUser(user: IUser): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.post<IUser>(this.baseUrl, user).pipe(
        catchError((error) => {
          console.error('Error creating user', error);
          throw error;
        })
      )
    );
  }

  updateUser(id: string, user: IUser): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.put<IUser>(`${this.baseUrl}/${id}`, user).pipe(
        catchError((error) => {
          console.error('Error updating user', error);
          throw error; 
        })
      )
    );
  }


}


