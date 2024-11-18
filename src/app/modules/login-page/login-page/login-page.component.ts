import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserResponse } from '../../../models/user';
import { SharedService } from '../../../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  showUserLogin = false;
  showvendorLogin = false;
  invalidCredentials = false;

  constructor(private fb: FormBuilder, private sharedService: SharedService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hide = signal(true);
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  showLoginType(type: string) {
    this.invalidCredentials = false;
    this.loginForm.markAsUntouched();
    if(type == 'user') {
      this.showUserLogin = true;
      this.showvendorLogin = false;
    } 
    
    if(type == 'vendor') {
      this.showvendorLogin = true;
      this.showUserLogin = false;
    }


  }

  clearForm() {
    this.loginForm.controls['username'].patchValue('');
    this.loginForm.controls['password'].patchValue('');
    if(this.invalidCredentials) {
      this.loginForm.markAllAsTouched();
    }
  }

  login(): void {
    const body = new User();
    body.username = this.loginForm.controls['username'].value;
    body.password = this.loginForm.controls['password'].value;


    this.sharedService.userLogin(body).subscribe({
      next: (data: UserResponse) => {
        this.invalidCredentials = false;
        this.sharedService.loggedInUser = data;
        this.sharedService.isUserLoggedIn = true;

        console.log(data);
      }, error: (error: HttpErrorResponse) => {
        this.invalidCredentials = true;
        this.clearForm();
      } 
    });

  }
}