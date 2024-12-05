import { Component, Inject, OnInit } from '@angular/core';
import { ADAPTER_TYPES, STATE_LIST } from '../../../enums/states';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { EditVendorStation, SlotType } from '../../../models/vendor';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  leadData: EditVendorStation;

}

@Component({
  selector: 'app-edit-charging-station',
  templateUrl: './edit-charging-station.component.html',
  styleUrl: './edit-charging-station.component.scss'
})
export class EditChargingStationComponent implements OnInit {


  states = STATE_LIST;
  slotTypes = ADAPTER_TYPES;

  selectedChargingStationName = '';
  RetriveDetailModel: EditVendorStation = new EditVendorStation();
  

  selectedLatitude = '';
  selectedLongitude = '';


  vendorDetailsForm!: FormGroup;
  chargingStationDetailsForm!: FormGroup;
  locationDetailsForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private sharedService: SharedService, 
    public dialogRef: MatDialogRef<EditChargingStationComponent>,
    @Inject(MAT_DIALOG_DATA) public sentData: DialogData
  ) 
    
    {
    this.selectedChargingStationName = '';
    this.selectedLatitude = '16.511155726922123';
    this.selectedLongitude = '81.55834699794315';
  }

  ngOnInit(): void {
    this.retriveData(this.sentData.leadData);
    this.RetriveDetailModel.stationID = this.sentData.leadData.stationID;
    this.initializeForm();
  }

  initializeForm() {
    this.vendorDetailsForm = this.fb.group({
      vendorName: [this.RetriveDetailModel.vendorName, Validators.required],
      stationName: [this.RetriveDetailModel.stationName, Validators.required],
      landmark: [this.RetriveDetailModel.landmark, Validators.required],
      city: [this.RetriveDetailModel.city, Validators.required],
      state: [this.RetriveDetailModel.state, Validators.required],
      zipCode: [this.RetriveDetailModel.pincode, Validators.required]
    });

    this.chargingStationDetailsForm = this.fb.group({
      slots: [this.RetriveDetailModel.slot, Validators.required],
      capacity: [this.RetriveDetailModel.capacity, Validators.required],
      vehicleType: [this.RetriveDetailModel.vType, Validators.required],
      slotType: [this.RetriveDetailModel.sl, Validators.required]
    });

    this.locationDetailsForm = this.fb.group({
      latitude: [{value: this.selectedLatitude, disabled: true}, Validators.required],
      longitude: [{value: this.selectedLongitude, disabled: true}, Validators.required],
    })
  }

  retriveData(data: EditVendorStation): void {
    this.RetriveDetailModel.vendorName = data.vendorName;
    this.RetriveDetailModel.stationName = data.stationName;
    this.RetriveDetailModel.landmark = data.landmark;
    this.RetriveDetailModel.city = data.city;
    this.RetriveDetailModel.state = data.state;
    this.RetriveDetailModel.pincode = data.pincode;

    this.RetriveDetailModel.slot = data.slot;
    this.RetriveDetailModel.capacity = data.capacity;
    this.RetriveDetailModel.vType = data.vType.toString();
    this.RetriveDetailModel.sl = data.sl;

    this.selectedLatitude = data.latitude.toString();
    this.selectedLongitude = data.longitude.toString();

    
  }



  addStation() {
    this.selectedChargingStationName = this.vendorDetailsForm.controls['stationName'].value;
  }

  latChange(value: string) {
    this.selectedLatitude = value;
    this.locationDetailsForm.controls['latitude'].patchValue(this.selectedLatitude);
    this.locationDetailsForm.controls['latitude'].updateValueAndValidity();
  }

  lngChange(value: string) {
    this.selectedLongitude = value;
    this.locationDetailsForm.controls['longitude'].patchValue(this.selectedLongitude);
    this.locationDetailsForm.controls['longitude'].updateValueAndValidity();
  }

  submitVendor(): void {
    const body = new EditVendorStation();
    body.vendorid = this.sharedService.loggedInUser.userId;
    body.stationID = this.RetriveDetailModel.stationID;
    body.vendorName = this.vendorDetailsForm.controls['vendorName'].value;
    body.stationName = this.vendorDetailsForm.controls['stationName'].value;
    body.landmark = this.vendorDetailsForm.controls['landmark'].value;
    body.city = this.vendorDetailsForm.controls['city'].value;
    body.state = this.vendorDetailsForm.controls['state'].value;
    body.pincode = this.vendorDetailsForm.controls['zipCode'].value;
    body.phone = this.sharedService.loggedInUser.phone;
    body.email = this.sharedService.loggedInUser.email;
    body.slot = this.chargingStationDetailsForm.controls['slots'].value;
    body.capacity = this.chargingStationDetailsForm.controls['capacity'].value;
    body.vType = this.chargingStationDetailsForm.controls['vehicleType'].value;

    const selectedSlotTypes: Array<string> = this.chargingStationDetailsForm.controls['slotType'].value;
    selectedSlotTypes.forEach(typ => {
      const slotBody = new SlotType();
      slotBody.slotType = typ;
      body.sl.push(slotBody);
    });

    body.latitude = this.locationDetailsForm.controls['latitude'].value;
    body.longitude = this.locationDetailsForm.controls['longitude'].value;

    this.sharedService.updateVendorStationDetails(body).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        //this.showConfirmation.emit('show');
      }, error: (error: HttpErrorResponse) => {
        console.error('Error', error);
      }
    });
    
  }

}
