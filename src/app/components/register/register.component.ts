import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AuthenticationService } from '../../_services';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  Designation: any = ['admin', 'manager', 'staff'];
  Gender:any=['male','female','other']
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }


  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
          gender: ['', Validators.required],
          phone: ['', [Validators.required, Validators.pattern("[6789][0-9_-]{9}")]],
          username: ['', Validators.required],
          role:['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  
                  this.router.navigate(['/login']);
              },
              error => {
                this.error = error;
                  this.loading = false;
              });
  }
}
