import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { reservation } from '../../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { EditVendorStation } from '../../../models/vendor';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.scss'
})
export class VendorDashboardComponent implements OnInit {

  totalSlots!: number;
  availableSlots!: number;
  bookings!: number;


  viewSelection?: string = 'y';

  bookingList: Array<reservation> = [];
  stationDetails!: Array<EditVendorStation>;

  monthlyData = [67, 59, 89, 70];
  yearlyData = [65, 59, 80, 81, 56, 55, 40, 100, 0, 20, 40, 35];

  monthlyChartLabel = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  yearlyChartLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



  // Chart.js configuration
  lineChartData: any[] = [];
  lineChartLabels: string[] = [];
  lineChartOptions = {
    responsive: true,
    elements: {
      line: {
        borderColor: '#002bff',
        borderWidth: 2,
        tension: 0
      },
      point: {
        backgroundColor: '#007bff',
        radius: 5
      }
    }
  };
  lineChartLegend = true;


  constructor(public shareddervice: SharedService) {
    this.bookings = this.totalSlots - this.availableSlots;
    this.updateChart();
  }

  updateChart() {
    if (this.viewSelection === 'm') {
      this.lineChartData = [{ data: this.monthlyData, label: 'Total Bookings' }];
      this.lineChartLabels = this.monthlyChartLabel;
    } else {
      this.lineChartData = [{ data: this.yearlyData, label: 'Total Bookings' }];
      this.lineChartLabels = this.yearlyChartLabel;
    }
  }

  changeButton(value: string) {
    this.viewSelection = value;
    this.updateChart();
  }


  ngOnInit(): void {
    this.totalSlots = 0;
    this.retriveData();
  }


  retriveData(): void {
    this.shareddervice.retriveVendorDetails().subscribe({
      next: (response: any) => {
        this.stationDetails = response;

        this.shareddervice.getBookingHistory(this.shareddervice.loggedInUser.userId).subscribe({
          next: (data: any) => {
            this.bookingList = data;
            this.stationDetails.forEach(detail => {
              var slot = detail.slot;
              this.totalSlots = this.totalSlots + slot;
            });
            this.bookings = this.bookingList.length;
            this.availableSlots = this.totalSlots - this.bookings;
          }, error: (e: HttpErrorResponse) => {
            console.error(e);
          } 
        });
      }, error: (error: HttpErrorResponse)=> {
        console.error('error', error)
      }
    });
  }
}
