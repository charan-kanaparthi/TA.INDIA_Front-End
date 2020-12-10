import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../_models';
import { UserService, AuthenticationService } from '../../_services/';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' ,
styleUrls: ['home.component.css']}
)
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;

    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        console.log
    }

    ngOnInit() {
        this.loading = true;
      
    }

    logout() {
        this.authenticationService.logout()
        this.router.navigate(['/login']);
        console.log("hi")
    }

}