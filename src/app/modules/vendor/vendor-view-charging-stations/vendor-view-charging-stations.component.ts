import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { SaveVendorStation } from '../../../models/vendor';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditChargingStationComponent } from '../edit-charging-station/edit-charging-station.component';

@Component({
  selector: 'app-vendor-view-charging-stations',
  templateUrl: './vendor-view-charging-stations.component.html',
  styleUrl: './vendor-view-charging-stations.component.scss'
})
export class VendorViewChargingStationsComponent  implements OnInit {

  stationDetails!: Array<SaveVendorStation>;

  constructor(private sharedService: SharedService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.stationDetails = [];
    this.sharedService.retriveVendorDetails().subscribe({
      next: (response: any) => {
        this.stationDetails = response;
      }, error: (error: HttpErrorResponse)=> {
        console.error('error', error)
      }
    });
  }

  editDetails(vendor : SaveVendorStation): void {
    const dialogRef = this.dialog.open(EditChargingStationComponent, {
      data: {leadData : vendor}
    });
  }

}
