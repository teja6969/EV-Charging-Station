import { Component, Input, OnInit } from '@angular/core';
import { reservation } from '../../../models/user';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.scss'
})
export class BookingHistoryComponent implements OnInit {

  @Input() ArrayOfbooking: Array<reservation> = [];
  
  constructor() {}

  ngOnInit(): void {
    
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


}
