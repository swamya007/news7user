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
  p: number = 1;

  singlemedia:any = {}
  mediaarray:any = []

  mediasearchval: any

  firstone:Boolean = true
  secondone:Boolean = false

  constructor(private mediaservice: MediaServicesService, private loginService: LoginService,
    public dialogRef: MatDialogRef<ChoosemediaComponent>) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getallmediadetails();
  }

  searchMedia() {
    this.mediaservice.getmediaDetails('', this.mediasearchval, this.currentuser.customer_id).subscribe((data: any) => {
      this.mediadetails = data.body
      this.mediadetails = this.mediadetails.map((dt: any) => JSON.parse(dt));
    })
  }

  close() {
    this.dialogRef.close();
  }

  getallmediadetails() {
    this.media_id = '';
    this.media_title = '';
    this.mediasearchval = ''
    this.mediaservice.getmediaDetails(this.media_id, this.media_title, this.currentuser.customer_id).subscribe((data: any) => {
      this.mediadetails = data.body
      this.mediadetails = this.mediadetails.map((dt: any) => JSON.parse(dt));
    })
  }

  sendData(data: any) {
    this.dialogRef.close(data);
  }

  
  copyToClipboard() {
    // Get the text field
    var copyText: any = document.getElementById("media_url");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  }

  goToFirstOne() {
    this.firstone = true
    this.secondone = false
  }

  openMediaDetails(id:any) {
    this.firstone = false
    this.secondone = true
    this.media_title = '';
    this.mediaservice.getmediaDetails(id, this.media_title, this.currentuser.customer_id).subscribe((data: any) => {
      this.mediaarray = data.body
      this.mediaarray = this.mediaarray.map((dt: any) => JSON.parse(dt));
      this.singlemedia = this.mediaarray[0]
    })
  }
}
