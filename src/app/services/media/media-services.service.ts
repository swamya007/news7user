import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiClient } from '../apiService/api.service';
import { Observable } from 'rxjs';
//import { UserRegModel } from 'src/app/Models/userRegModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const MasterAPI: string = environment.BASE_URL + '/master';

@Injectable({
  providedIn: 'root'
})

export class MediaServicesService {

  constructor(private HTTP: HttpClient, private ApiClient: ApiClient) { }

  getmediaDetails(media_id: any,media_title:any,cust_id:any) {
    return this.HTTP.get<any>(MasterAPI + `/get-media-details?media_id=${media_id}&media_title=${media_title}&customer_id=${cust_id}`);
  }
}
