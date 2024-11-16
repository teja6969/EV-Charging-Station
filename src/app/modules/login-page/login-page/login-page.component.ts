import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  showUserLogin = false;
  showvendorLogin = false;

  constructor(private fb: FormBuilder) {}

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
    if(type == 'user') {
      this.showUserLogin = true;
      this.showvendorLogin = false;
    } 
    
    if(type == 'vendor') {
      this.showvendorLogin = true;
      this.showUserLogin = false;
    }


  }

  login() {
  }
}