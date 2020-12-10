import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { User } from '../../_models';
import { UserService, AuthenticationService } from '../../_services/';
import { Router } from '@angular/router';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  loading = false;
    currentUser: User;
    userFromApi: User;
    users:User[]
    displayedColumns: string[] = ['id', 'name', 'gender','phone', 'role','username','delete'];
    displayedColumnsManager: string[] = ['id', 'name', 'gender','phone', 'role','username'];
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
        this.getAllUsers()
         
    }

    logout() {
        this.authenticationService.logout()
        this.router.navigate(['/login']);
        console.log("hi")
    }
  
    getAllUsers(){
      this.userService.getAll()
      .pipe(first())
      .subscribe(
          data => {
              
              this.users=data
              if(this.currentUser.role=='manager'){
                // console.log('hjdbfjwe')

               this.users= this.users.filter(this.filterStaff);
              }
              // console.log(this.users)
          },
          error => {
              
              this.loading = false;
          });
    }
    filterStaff(user){
      console.log(user.role);
      console.log(user.role=='staff')
      return user.role=='staff'
    }
    deleteUser(id){
      console.log(id)
      this.userService.deleteUser(id).pipe(first())
      .subscribe(
          data => {
              
              console.log(data)
              this.getAllUsers()
          },
          error => {
              
              this.loading = false;
          });
    }
}