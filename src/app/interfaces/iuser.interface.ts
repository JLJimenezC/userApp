export interface IUserResponse {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    results:     IUser[];
}

export interface IUser {
    _id:        string;
    id:         number;
    first_name: string;
    last_name:  string;
    username:   string;
    email:      string;
    image:      string;
    password:   string; // Se elimina el enum innecesario
}

export enum IPassword {
    User12345 = "user12345",
}
