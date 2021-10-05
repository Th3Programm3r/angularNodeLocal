import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>('http://localhost:3001/users');
    }

    register(user: User) {
        return this.http.post('http://localhost:3001/register', user);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:3001/delete/${id}`);
    }
    getUser(username:String){
        return this.http.get<any>(`http://localhost:3001/user/${username}`);
    }
    update(user:User){
        return this.http.post('http://localhost:3001/update', user);
    }
  
}