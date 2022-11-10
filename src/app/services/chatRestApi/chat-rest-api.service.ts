import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const MasterAPI:string = environment.CHAT_BASE_URL+'/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatRestApiService {

  constructor(private http: HttpClient) { }

  getChatData(tour_id: any,group_id:any) {
    return this.http.get<any>(MasterAPI + `/get?tour_id=${tour_id}&group_id=${group_id}`);
  }

  getRoomId(tour_id:any,part_one:any,part_two:any){
    return this.http.get<any>(MasterAPI +`/get-room-id?tour_id=${tour_id}&part_one=${part_one}&part_two=${part_two}`,);
  }

  getMessage(tour_id: any,room_id:any){
    return this.http.get<any>(MasterAPI +`/get-message?tour_id=${tour_id}&room_id=${room_id}`);
  }

  // getUserDetails(user_id: any) {
  //   return this.http.get<any>(MasterAPI + `/${user_id}`);
  // }
}
