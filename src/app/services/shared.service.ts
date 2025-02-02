import { Injectable } from '@angular/core';
import { CityObject, pincodeObject, predictTime, RegisterUser, reservation, response, User, UserResponse } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoints } from '../endpoints';
import { EditVendorStation, FeedBackModel, RetriveVendor, SaveVendorStation } from '../models/vendor';

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
    return this.http.get<EditVendorStation>(endpoints.retriveVendorDetails, this.httpOptions);
  }

  updateVendorStationDetails(request: EditVendorStation) {
    return this.http.put<string>(endpoints.updateVendorDetails, request, this.httpOptions);
  }

  retriveDetailsByCity(request: CityObject) {
    return this.http.post<EditVendorStation>(endpoints.retriveDetailsByCity, request, this.httpOptions);
  }

  retriveDetailsByPincode(request: pincodeObject) {
    return this.http.post<EditVendorStation>(endpoints.retriveDetailsByPincode, request, this.httpOptions);
  }

  predictTime(request: predictTime) {
    return this.http.post<response>(endpoints.predictTime, request, this.httpOptions);
  }

  bookSlot(request: reservation) {
    return this.http.post<response>(endpoints.bookSlot, request, this.httpOptions);
  }

  changePassword(id: string, password: string) {
    return this.http.put<any>(endpoints.validateandupdatepassword, {userid: id, newPassword: password}, this.httpOptions);
  }

  userBookingHistory(id: string): Observable<any> {
    return this.http.post<Array<reservation>>(endpoints.userbookinghistory, {id: id}, this.httpOptions);
  }

  retrivelatandlong(id: string, stationId: string) {
    return this.http.post<EditVendorStation>(endpoints.retrivelatandlong, {vendorid: id, stationid: stationId}, this.httpOptions);
  }

  submitFeedback(request: FeedBackModel) {
    return this.http.post<any>(endpoints.feedback, request, this.httpOptions);
  }

  getFeedback(id: number) {
    return this.http.post<Array<FeedBackModel>>(endpoints.getfeedback, {stationID: id}, this.httpOptions);
  }

  getBookingHistory(id: string) {
    return this.http.post<any>(endpoints.vendorbookinghistory, {vendorid: id}, this.httpOptions);
  }

  cancelBookig(id: string, stat: string) {
    return this.http.post<any>(endpoints.cancelBooking, {rid: id, status: stat}, this.httpOptions);
  }

  checkSlots(id: number) {
    return this.http.post<any>(endpoints.checkSlot, {stationid: id}, this.httpOptions);
  }
}
