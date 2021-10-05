import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './auth.service';
import { User } from './user';


//import './_content/app.less';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
export class AppComponent {
    currentUser: User=new User;
    title:string='angularNode';
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
        window.location.reload();
    }
}