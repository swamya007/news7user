import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const MasterAPI: string = environment.BASE_URL + '/user';

const Masterapi: string = environment.BASE_URL + '/master';

@Injectable({
  providedIn: 'root'
})
export class TagserviceService {

  constructor(private HTTP: HttpClient) { }

  addnewtag(tag: any) {
    return this.HTTP.post<any>(Masterapi + `/add-tag`, { ...tag });
  }

 getalltag(tagid:any,tag_name:any, cust_id:any){
  return this.HTTP.get<any>(Masterapi + `/get-tag-details?tag_id=${tagid}&tag_name=${tag_name}&customer_id=${cust_id}`);
 }

}
