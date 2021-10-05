import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../user';
import { UserService} from '../user.service';
import {AuthenticationService } from '../auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    currentUser: User;
    users :User[]= [];
    check:boolean=false;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
        this.getUser();
        if(this.currentUser.username==="admin"){
            this.check=true;
        }
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
        window.location.reload();
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
    private getUser() {
        this.userService.getUser(this.currentUser.username)
            .pipe(first())
            .subscribe(user => this.currentUser = user);
    }
}