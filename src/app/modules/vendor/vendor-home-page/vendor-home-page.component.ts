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

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(public sharedService: SharedService, private observer: BreakpointObserver,private route: ActivatedRoute, private router: Router ) {}

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

}
