import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditVendorStation } from '../../../models/vendor';

interface DialogData {
  leadData: EditVendorStation;
}

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrl: './booking-dialog.component.scss'
})
export class BookingDialogComponent implements OnInit {

  userBookingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sentData: DialogData
  ) { }

  ngOnInit(): void {
    
  }

    initializeForm() {
      this.userBookingForm = this.fb.group({
        brand: ['', Validators.required],
        model: ['', Validators.required],
      });
    }

}
