import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.scss'
})
export class VendorDashboardComponent {

  totalSlots = 300;
  availableSlots = 143;
  bookings!: number;
  viewSelection?: string = 'y';

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


  constructor() {
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
}
