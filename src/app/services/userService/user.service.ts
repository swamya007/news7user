import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiClient } from '../apiService/api.service';
import { Observable } from 'rxjs';
//import { UserRegModel } from 'src/app/Models/userRegModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const MasterAPI: string = environment.BASE_URL + '/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private HTTP: HttpClient, private ApiClient: ApiClient) { }

  createUser(user: any) {
    return this.HTTP.post<any>(MasterAPI + `/add-user`, { ...user });
  }
  getUserDetails(searchval:any,uid: any,cust_id:any,type:any) {
    return this.HTTP.get<any>(MasterAPI + `/get-user-details?searchval=${searchval}&uid=${uid}&customer_id=${cust_id}&type=${type}`);
  }
  updateProfile(user: any) {
    return this.HTTP.post<any>(MasterAPI + `/update-profile`, { ...user });
  }
  deleteUser(userid: any) {
    return this.HTTP.get<any>(MasterAPI + `/deleteUser?id=${userid}`);
  }
  changepassword(user: any) {
    return this.HTTP.post<any>(MasterAPI + `/change-password`, { ...user });
  }
  bulkDeletion(functions: any, deleteids: any, userid: any, customerid: any) {
    return this.HTTP.get<any>(MasterAPI + `/bulk-deletion?function=${functions}&&deleteids=${deleteids}&&userid=${userid}&&customerid=${customerid}`);
  }
  forgetpassword(data: any) {
    return this.HTTP.post<any>(MasterAPI + `/forgot-password-get-otp`, { ...data });
  }

}
