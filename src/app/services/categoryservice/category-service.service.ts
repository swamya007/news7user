import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const MasterAPI: string = environment.BASE_URL + '/user';

const Masterapi: string = environment.BASE_URL + '/master';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private HTTP: HttpClient) { }

  createCategory(category: any) {
    return this.HTTP.post<any>(Masterapi + `/add-category`, { ...category });
  }

  getAllCategory(cid:any,cat_name:any,customer_id:any) {
    return this.HTTP.get<any>(Masterapi + `/get-category-details?category_id=${cid}&category_name=${cat_name}&customer_id=${customer_id}`);
  }
}
