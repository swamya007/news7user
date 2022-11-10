import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MediaServicesService } from 'src/app/services/media/media-services.service';

@Component({
  selector: 'app-choosemedia',
  templateUrl: './choosemedia.component.html',
  styleUrls: ['./choosemedia.component.css']
})
export class ChoosemediaComponent implements OnInit {
  media_title!: string;
  media_id!: string;
  currentuser: any;
  mediadetails: any;

  constructor(private mediaservice:MediaServicesService,private loginService :LoginService,
    public dialogRef: MatDialogRef<ChoosemediaComponent>) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getallmediadetails();

  }
  getallmediadetails() {
    this.media_id='';
    this.media_title='';
    this.mediaservice.getmediaDetails(this.media_id, this.media_title,this.currentuser.customer_id).subscribe((data: any) => {
      this.mediadetails = data.body
      this.mediadetails = this.mediadetails.map((dt: any) => JSON.parse(dt));
      console.log(this.mediadetails)
    })
  }

  sendData(data:any) {
    this.dialogRef.close(data);
  } 
}
