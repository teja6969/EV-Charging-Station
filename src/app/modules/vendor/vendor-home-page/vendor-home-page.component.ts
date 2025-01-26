import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-home-page',
  templateUrl: './vendor-home-page.component.html',
  styleUrl: './vendor-home-page.component.scss'
})
export class VendorHomePageComponent implements AfterViewInit {

  showDashboard = false;
  showChargingStation = false;
  showStations = false;
  showFeedback = false;
  showConfirmationPage = false;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(public sharedService: SharedService, private observer: BreakpointObserver,private route: ActivatedRoute, private router: Router ) {
    this.showDashboard = true;
  }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=> {
      if(res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }

  logout() {
    this.sharedService.clearLoggedInUser();
    this.router.navigateByUrl('');
  }

  pageChange(value: string) {
    this.clearPageSelection();

    if(value == 'Dashboard') {
      this.showDashboard = true;
    }
    if(value == 'ChargingStation') {
      this.showChargingStation = true;
    }
    if(value == 'ViewStation') {
      this.showStations = true;
    }
    if(value == 'feedback') {
      this.showFeedback = true;
    }
  }

  clearPageSelection() {
    this.showDashboard = false;
    this.showChargingStation = false;
    this.showStations = false;
    this.showFeedback = false;
    this.showConfirmationPage = false;
  }

  getConfirmation(value: string) {
    if(value == 'show') {
      this.clearPageSelection();
      this.showConfirmationPage = true;
    }
  }

}
