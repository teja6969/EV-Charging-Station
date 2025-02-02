import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { CityObject, pincodeObject } from '../../../models/user';
import { EditVendorStation } from '../../../models/vendor';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';

@Component({
  selector: 'app-user-booking-page',
  templateUrl: './user-booking-page.component.html',
  styleUrl: './user-booking-page.component.scss'
})
export class UserBookingPageComponent implements OnInit {

  searchForm!: FormGroup;
  stationDetails: Array<EditVendorStation> = [];

  latitude !: number;
  logitude !: number;

  @Output() showConfirmation: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder, private sharedService: SharedService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      city: [''],
      zip: ['']
    });
  }

  inputCity() {
    if (this.searchForm.controls['city'].value != '') {
      this.searchForm.controls['city'].setValidators(Validators.required);
      this.searchForm.controls['zip'].disable();
    } else {
      this.searchForm.controls['city'].setValidators(null);
      this.searchForm.controls['zip'].enable();
    }
  }

  inputZip() {
    if (this.searchForm.controls['zip'].value != '') {
      this.searchForm.controls['zip'].setValidators(Validators.required);
      this.searchForm.controls['city'].disable();
    } else {
      this.searchForm.controls['zip'].setValidators(null);
      this.searchForm.controls['city'].enable();
    }
  }

  clearData() {
    this.searchForm.controls['city'].setValidators(null);
    this.searchForm.controls['zip'].setValidators(null);
    this.searchForm.controls['city'].enable();
    this.searchForm.controls['zip'].enable();
    this.searchForm.controls['city'].patchValue('');
    this.searchForm.controls['zip'].patchValue('');
    this.stationDetails = [];
  }

  retriveData(): void {
    this.stationDetails = [];
    if (this.searchForm.controls['city'].value && this.searchForm.controls['city'].value != '') {
      const body = new CityObject();
      body.city = this.searchForm.controls['city'].value;
      this.sharedService.retriveDetailsByCity(body).subscribe({
        next: (data: any) => {
          this.stationDetails = data;
        }, error: (error: HttpErrorResponse) => {
          console.error('error', error)
        }
      });
    }


    if (this.searchForm.controls['zip'].value && this.searchForm.controls['zip'].value != '') {
      const body = new pincodeObject();
      body.pincode = this.searchForm.controls['zip'].value;
      this.sharedService.retriveDetailsByPincode(body).subscribe({
        next: (data: any) => {
          this.stationDetails = data;
        }, error: (error: HttpErrorResponse) => {
          console.error('error', error)
        }
      });
    }
  }

  bookSlot(details: EditVendorStation): void {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '65rem',
      height: '80vh',
      data: { leadData: details },
      panelClass: 'custom-modalbox',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.retriveData();
    });

    dialogRef.componentInstance.doneBooking.subscribe(res => {
      if(res == 'done') {
        this.showConfirmation.emit('show');
      }
    })
  }

  openGoogleMaps(details : EditVendorStation) {
    this.latitude = details.latitude;
    this.logitude = details.longitude;
    if (this.latitude && this.logitude) {
      const googleMapsUrl = `https://www.google.com/maps?q=${this.latitude},${this.logitude}`;
      window.open(googleMapsUrl, '_blank');  // Opens in a new tab
    } else {
      alert('Location coordinates are not available yet.');
    }
  }

}
