import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-vendor-landing-page',
  templateUrl: './vendor-landing-page.component.html',
  styleUrl: './vendor-landing-page.component.scss'
})
export class VendorLandingPageComponent implements OnInit {

  constructor(public sharedService: SharedService) {}

  ngOnInit(): void {
    
  }

}
