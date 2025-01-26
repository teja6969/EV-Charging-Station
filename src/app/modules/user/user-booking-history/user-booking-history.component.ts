import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { reservation } from '../../../models/user';
import { EditVendorStation } from '../../../models/vendor';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackPageComponent } from '../feedback-page/feedback-page.component';

@Component({
  selector: 'app-user-booking-history',
  templateUrl: './user-booking-history.component.html',
  styleUrl: './user-booking-history.component.scss'
})
export class UserBookingHistoryComponent implements OnInit {

  bookingData: reservation[] = [];

  constructor(public sharedService : SharedService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.retriveData();
  }

  retriveData() {
    this.sharedService.userBookingHistory(this.sharedService.loggedInUser.userId).subscribe({
      next: (data: Array<reservation>)  => {
        this.bookingData = data;
      }, error: (error: HttpErrorResponse) => {
        console.error(error)
      }
    })
  }

  formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 

    return `${day}-${month}-${year} ${hours}:${minutes} ${amPm}`;
  }

  getBookingStatus(startDateTime: string, endDateTime: string): string {
    const sysDateTime = new Date();
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
  
    if (sysDateTime < start) {
      return 'B';
    } else if (sysDateTime >= start && sysDateTime < end) {
      return 'I';
    } else {
      return 'C';
    }
  }


  openGoogleMaps(details : reservation) {
    this.sharedService.retrivelatandlong(details.vendorid, details.stationID.toString()).subscribe({
      next:(data: EditVendorStation) => {
        if (data.latitude && data.longitude) {
          const googleMapsUrl = `https://www.google.com/maps?q=${data.latitude},${data.longitude}`;
          window.open(googleMapsUrl, '_blank');  // Opens in a new tab
        } else {
          alert('Location coordinates are not available yet.');
        }
      }
    });
  }

  showFeedback(details: reservation) {
        const dialogRef = this.dialog.open(FeedbackPageComponent, {
          data: { leadData: details }
        });
  }


  

}
