import { Injectable } from '@angular/core';
import { RegisterUser, User, UserResponse } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoints } from '../endpoints';
import { RetriveVendor, SaveVendorStation } from '../models/vendor';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isUserLoggedIn = false;
  loggedInUser = new UserResponse();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private http: HttpClient) { }

  clearLoggedInUser() {
    this.isUserLoggedIn = false;
    this.loggedInUser = new UserResponse();
  }

  userLogin(request: User) {
    return this.http.post<UserResponse>(endpoints.login, request, this.httpOptions);
  }

  registerUser(request: RegisterUser) {
    return this.http.post<string>(endpoints.register, request, this.httpOptions);
  }

  saveVendorStationDetails(request: SaveVendorStation) {
    return this.http.post<string>(endpoints.saveVendorDetails, request, this.httpOptions);
  }

  retriveVendorDetails(): Observable<any> {
    return this.http.get<SaveVendorStation>(endpoints.retriveVendorDetails, this.httpOptions);
  }
}
