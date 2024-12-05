import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { EditVendorStation } from '../../../models/vendor';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditChargingStationComponent } from '../edit-charging-station/edit-charging-station.component';

@Component({
  selector: 'app-vendor-view-charging-stations',
  templateUrl: './vendor-view-charging-stations.component.html',
  styleUrl: './vendor-view-charging-stations.component.scss'
})
export class VendorViewChargingStationsComponent  implements OnInit {

  stationDetails!: Array<EditVendorStation>;

  constructor(private sharedService: SharedService, private dialog: MatDialog) {}

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
    const dialogRef = this.dialog.open(EditChargingStationComponent, {
      data: {leadData : vendor}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.retriveData();
    });
  }

}
