import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from '../../../services/shared.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrl: './user-home-page.component.scss'
})
export class UserHomePageComponent implements AfterViewInit {

  showBooking = false;
  showHistory = false;
  showProfile = false;
  showHelp = false;
  showConfirmationPage = false;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(public sharedService: SharedService, private observer: BreakpointObserver,private route: ActivatedRoute, private router: Router ) {
    this.showBooking = true;
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

    if(value == 'Booking') {
      this.showBooking = true;
    }
    if(value == 'History') {
      this.showHistory = true;
    }
    if(value == 'Profile') {
      this.showProfile = true;
    }
    if(value == 'Help') {
      this.showHelp = true;
    }
  }

  clearPageSelection() {
    this.showBooking = false;
    this.showHistory = false;
    this.showProfile = false;
    this.showHelp = false;
    this.showConfirmationPage = false;
  }

  getConfirmation(value: string) {
    if(value == 'show') {
      this.clearPageSelection();
      this.showConfirmationPage = true;
    }
  }


}
