import {IUser,IUserResponse,IPassword} from "./iuser.interface"

export interface IResponse{
    results:IUser[],
    meta:IUserResponse,
    password:IPassword
}