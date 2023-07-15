export class User {
    id?: number;
    name: string;
    email: string;
    login: string;
    password: string;
    
    constructor(name: string, email: string, login: string, password: string) {
      this.name = name;
      this.email = email;
      this.login = login;
      this.password = password;
    }
  }