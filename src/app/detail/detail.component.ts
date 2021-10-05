import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import {AuthenticationService } from '../auth.service';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  currentUser: User;
  users :User[]= [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private location: Location
    ) { this.currentUser = this.authenticationService.currentUserValue;}

  ngOnInit(): void {
    this.getUser();
  }
  goBack():void{
    this.location.back();    
  }
  save(): void {
    if (this.currentUser) {
      console.log("Saving detail1");
      this.userService.update(this.currentUser).subscribe();
      this.goBack();
    }
  }
  private getUser() {
    this.userService.getUser(this.route.snapshot.paramMap.get('username')!)
        .pipe(first())
        .subscribe(user => this.currentUser = user);
  }
}
