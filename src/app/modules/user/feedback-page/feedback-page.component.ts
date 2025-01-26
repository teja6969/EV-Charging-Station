import { Component, Inject, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { reservation } from '../../../models/user';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FeedBackModel } from '../../../models/vendor';
import { HttpErrorResponse } from '@angular/common/http';

interface DialogData {
  leadData: reservation;
}

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrl: './feedback-page.component.scss'
})
export class FeedbackPageComponent implements OnInit {


  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder, public sharedService: SharedService,     public dialogRef: MatDialogRef<FeedbackPageComponent>,
      @Inject(MAT_DIALOG_DATA) public sentData: DialogData) {}

  ngOnInit(): void {
    this.initiateForm();
  }

   initiateForm() {
    this.feedbackForm = this.fb.group({
      feedback: ['', Validators.required],
      rate: ['1', Validators.required]
    })
   }

   formatLabel(value: number): string {
    return value ? value.toString() : '1';
   }

   submit() {
    const body = new FeedBackModel();
    body.feedbacktext = this.feedbackForm.controls['feedback'].value;
    body.rating = this.feedbackForm.controls['rate'].value;
    body.userId = this.sharedService.loggedInUser.userId;
    body.stationID = this.sentData.leadData.stationID;
    body.rid = this.sentData.leadData.rid;

    this.sharedService.submitFeedback(body).subscribe({
      next: (data: any) => {
        this.dialogRef.close();
      }, error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    })

   }

}
