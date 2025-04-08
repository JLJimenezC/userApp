import {IUser,IUserResponse,IPassword} from "./iuser.interface"

export interface IResponse{
    page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: IUser[];
}