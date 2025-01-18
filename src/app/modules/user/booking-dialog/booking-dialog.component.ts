import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditVendorStation } from '../../../models/vendor';
import { predictTime, reservation, response } from '../../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

interface DialogData {
  leadData: EditVendorStation;
}

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrl: './booking-dialog.component.scss'
})
export class BookingDialogComponent implements OnInit {

  @Output() doneBooking: EventEmitter<string> = new EventEmitter();

  userBookingForm!: FormGroup;
  paymentForm!: FormGroup;

  loader: boolean = false;
  showEndTime = false;
  showUPI = true;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sentData: DialogData
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();


    this.userBookingForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      slotType: ['', Validators.required],
      batteryStatus: ['', Validators.required],
      startDate: [today, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      paymentType: ['U', Validators.required],
    });

    this.userBookingForm.controls['startTime'].valueChanges.subscribe(data => {
      this.caluclateEndTime();
    });

    this.paymentForm.controls['paymentType'].valueChanges.subscribe(data => {
      this.showUPI = this.paymentForm.controls['paymentType'].value == 'U' ? true: false;
    });
  }

  caluclateEndTime(): void {
    this.loader = true;
    this.showEndTime = false;
    const body = new predictTime();
    body.vendorid = this.sentData.leadData.vendorid;
    body.stationid = this.sentData.leadData.stationID;
    body.batterycapacity = Number(this.sentData.leadData.capacity);
    body.currentcharge = this.userBookingForm.controls['batteryStatus'].value ? this.userBookingForm.controls['batteryStatus'].value : 0;

    this.sharedService.predictTime(body).subscribe({
      next: (data: response) => {
        setTimeout(() => {
          this.loader = false;
          this.showEndTime = true;

          const responseMessage = data.message;
          const timeRegex = /(\d+)\s*hours?\s*and\s*(\d+)\s*minutes?/;
          const match = responseMessage.match(timeRegex);

          if (match) {
            const sTime = this.userBookingForm.controls['startTime'].value
            const [time, period] = sTime.split(' ');
            const [shours, sminutes] = time.split(':').map(Number);

            const ehours = parseInt(match[1], 10);
            const eminutes = parseInt(match[2], 10);

            const h = shours + ehours;
            const m = sminutes + eminutes;

            const TotalEndTime = h + ':' + m + ' ' + period;

            this.userBookingForm.controls['endTime'].patchValue(TotalEndTime);
            this.userBookingForm.controls['endTime'].setValue(TotalEndTime);
            this.userBookingForm.controls['endTime'].updateValueAndValidity();
          } else {
            console.error("Failed to parse time from response message.");
            this.userBookingForm.controls['endTime'].patchValue('');
          }

        }, 3000);
      }, error: (err: HttpErrorResponse) => {
        this.loader = false;
        console.error(err);
      }
    });
  }

  formatDateTime(dateString: string, timeString: string): string {
    const date = new Date(dateString);
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const hours24 = period.toLowerCase() === 'pm' && hours !== 12 ? hours + 12 : hours === 12 && period.toLowerCase() === 'am' ? 0 : hours;
    date.setHours(hours24, minutes, 0, 0);
    return date.toISOString().slice(0, 19);
  }

  bookSlot() {
    const body = new reservation();
    body.evbrand = this.userBookingForm.controls['brand'].value;
    body.evmodel = this.userBookingForm.controls['model'].value;
    body.batteryStatus = this.userBookingForm.controls['batteryStatus'].value;
    body.stationID = this.sentData.leadData.stationID;
    body.vendorid = this.sentData.leadData.vendorid;
    body.slotType = this.userBookingForm.controls['slotType'].value;
    body.sdatet = this.formatDateTime(this.userBookingForm.controls['startDate'].value , this.userBookingForm.controls['startTime'].value);
    body.edatet = this.formatDateTime(this.userBookingForm.controls['startDate'].value , this.userBookingForm.controls['endTime'].value);
    body.paymentType = this.paymentForm.controls['paymentType'].value;
    body.status = 'C';

    this.sharedService.bookSlot(body).subscribe({
      next: (data) => {
        this.doneBooking.emit('done');
        this.dialogRef.close();
      }, error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    })
  }

}
