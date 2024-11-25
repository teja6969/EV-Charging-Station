import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-vendor-home-page',
  templateUrl: './vendor-home-page.component.html',
  styleUrl: './vendor-home-page.component.scss'
})
export class VendorHomePageComponent implements OnInit {

  constructor(public sharedService: SharedService) {}

  ngOnInit(): void {
    
  }

}
