import { Component, OnInit, signal } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  showProfile = true
  passwordChangeFailed = false;
  passwordForm!: FormGroup;

  hide = signal(true);

  constructor(private fb: FormBuilder, public sharedService: SharedService) {}

  ngOnInit(): void {
    
  }

  initializeForm() {
    this.passwordForm = this.fb.group({
      currentPassword : [this.sharedService.loggedInUser.password, Validators.required],
      newPassword : ['', Validators.compose([Validators.minLength(6), Validators.required])],
      conifrmPassword : ['', Validators.required],
    });

  }

  changePassword() {
    this.showProfile = false;
    this.initializeForm();
  }

  comparePassword() {
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const confirmPassword = this.passwordForm.get('conifrmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      this.passwordForm.get('newPassword')?.setErrors({ mismatch: true });
      this.passwordForm.get('conifrmPassword')?.setErrors({ mismatch: true });
    } else {
      this.passwordForm.get('newPassword')?.setErrors(null);
      this.passwordForm.get('conifrmPassword')?.setErrors(null);
    }
  }

  validate() {
    const password = this.passwordForm.controls['newPassword'].value;
    this.sharedService.changePassword(this.sharedService.loggedInUser.userId, password).subscribe({
      next: (data: any) => {
        this.showProfile = true;
      }, error: (error: HttpErrorResponse) => {
        this.showProfile = false;
        this.passwordChangeFailed = true;
      }
    })
  }
  
  clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }

}
