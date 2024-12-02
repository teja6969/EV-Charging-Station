import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ADAPTER_TYPES, STATE_LIST } from '../../../enums/states';
import { SaveVendorStation, SlotType } from '../../../models/vendor';
import { SharedService } from '../../../services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-vendor-charging-station',
  templateUrl: './vendor-charging-station.component.html',
  styleUrl: './vendor-charging-station.component.scss'
})
export class VendorChargingStationComponent implements OnInit {

  @Output() showConfirmation: EventEmitter<string> = new EventEmitter();

  states = STATE_LIST;
  slotTypes = ADAPTER_TYPES;

  selectedChargingStationName = '';
  

  selectedLatitude = '';
  selectedLongitude = '';


  vendorDetailsForm!: FormGroup;
  chargingStationDetailsForm!: FormGroup;
  locationDetailsForm!: FormGroup;

  constructor(private fb: FormBuilder, private sharedService: SharedService) {
    this.selectedChargingStationName = '';
    this.selectedLatitude = '16.511155726922123';
    this.selectedLongitude = '81.55834699794315';
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.vendorDetailsForm = this.fb.group({
      vendorName: ['', Validators.required],
      stationName: ['', Validators.required],
      landmark: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
    });

    this.chargingStationDetailsForm = this.fb.group({
      slots: ['', Validators.required],
      capacity: ['', Validators.required],
      vehicleType: ['', Validators.required],
      slotType: ['', Validators.required]
    });

    this.locationDetailsForm = this.fb.group({
      latitude: [{value: this.selectedLatitude, disabled: true}, Validators.required],
      longitude: [{value: this.selectedLongitude, disabled: true}, Validators.required],
    })
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
    const body = new SaveVendorStation();
    body.vendorid = this.sharedService.loggedInUser.userId;
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

    this.sharedService.saveVendorStationDetails(body).subscribe({
      next: (response: any) => {
        this.showConfirmation.emit('show');
      }, error: (error: HttpErrorResponse) => {
        console.error('Error', error);
      }
    });
    
  }

}
