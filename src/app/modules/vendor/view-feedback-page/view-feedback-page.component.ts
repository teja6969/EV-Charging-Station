import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { EditVendorStation, FeedBackModel } from '../../../models/vendor';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-feedback-page',
  templateUrl: './view-feedback-page.component.html',
  styleUrl: './view-feedback-page.component.scss'
})
export class ViewFeedbackPageComponent implements OnInit {

  stationDetails!: Array<EditVendorStation>;
  feedbackDetails!: Array<FeedBackModel>;

  showFeedback = false;

  constructor(public sharedService: SharedService) { }
  
  ngOnInit(): void {
    this.stationDetails = [];
    this.retriveData();
  }

    retriveData(): void {
      this.sharedService.retriveVendorDetails().subscribe({
        next: (response: any) => {
          this.stationDetails = response;
        }, error: (error: HttpErrorResponse)=> {
          console.error('error', error)
        }
      });
    }


      editDetails(vendor : EditVendorStation): void {
        this.showFeedback = true;
        this.sharedService.getFeedback(vendor.stationID).subscribe({
          next: (data: Array<FeedBackModel>) => {
            this.feedbackDetails = data;
            console.log(data);
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
  
}
