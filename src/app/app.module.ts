import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './modules/login-page/login-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsComponent } from './components/vendor-maps/google-maps/google-maps.component';
import { VendorHomePageComponent } from './modules/vendor/vendor-home-page/vendor-home-page.component';
import { VendorDashboardComponent } from './modules/vendor/vendor-dashboard/vendor-dashboard.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { VendorChargingStationComponent } from './modules/vendor/vendor-charging-station/vendor-charging-station.component';
import { ConfirmationPageComponent } from './components/vendor-maps/confirmation-page/confirmation-page.component';
import { VendorViewChargingStationsComponent } from './modules/vendor/vendor-view-charging-stations/vendor-view-charging-stations.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    ConfirmationPageComponent,
    LoginPageComponent,
    VendorHomePageComponent,
    VendorDashboardComponent,
    VendorChargingStationComponent,
    VendorViewChargingStationsComponent
  ],
  imports: [
    BrowserModule,
    BaseChartDirective,
    ReactiveFormsModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
