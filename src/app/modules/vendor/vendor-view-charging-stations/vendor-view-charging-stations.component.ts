import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { RetriveVendor, SaveVendorStation } from '../../../models/vendor';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterUser } from '../../../models/user';

@Component({
  selector: 'app-vendor-view-charging-stations',
  templateUrl: './vendor-view-charging-stations.component.html',
  styleUrl: './vendor-view-charging-stations.component.scss'
})
export class VendorViewChargingStationsComponent  implements OnInit {

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.retriveVendorDetails().subscribe({
      next: (response: any) => {
        console.log(response);
      }, error: (error: HttpErrorResponse)=> {
        console.error('error', error)
      }
    })
    
  }

}
