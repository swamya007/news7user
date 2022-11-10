import { Component, OnInit } from '@angular/core';
import { MediaServicesService } from 'src/app/services/media/media-services.service';
import { environment } from 'src/environments/environment';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-viewmedia',
  templateUrl: './viewmedia.component.html',
  styleUrls: ['./viewmedia.component.css']
})
export class ViewmediaComponent implements OnInit {
  cust_id: any;
  media_id: any;
  media_title: any;
  mediadetails: any;
  gridstatus: Boolean = true
  liststatus: Boolean = false
  viewdata: Boolean = true
  searchvalue:any
  currentuser: any;
  p: number = 1;
  constructor(private mediaservice:MediaServicesService,private router: Router,private loginService :LoginService) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.cust_id = environment.CUSTOMER_ID
    this.getallmediadetails();
  }

  searchMedia() {
    this.media_id='';
    if(this.searchvalue) {
      this.mediaservice.getmediaDetails(this.media_id, this.searchvalue,this.cust_id).subscribe((data: any) => {
        this.mediadetails = data.body
        this.mediadetails = this.mediadetails.map((dt: any) => JSON.parse(dt));
      })
    }
  }

  clear() {
    this.searchvalue = ''
    this.getallmediadetails();
  }

  showGrid() {
    this.gridstatus = true
    this.liststatus = false
    this.viewdata = true
  }

  showList() {
    this.gridstatus = false
    this.liststatus = true
    this.viewdata = false
  }

  getallmediadetails() {
    this.media_id='';
    this.media_title='';
    this.mediaservice.getmediaDetails(this.media_id, this.media_title,this.cust_id).subscribe((data: any) => {
      this.mediadetails = data.body
      this.mediadetails = this.mediadetails.map((dt: any) => JSON.parse(dt));
      console.log(this.mediadetails)
    })
  }
  editmedia(row: any) {
    localStorage.setItem('row', JSON.stringify(row));
    console.log(row,'r')
    this.router.navigate([`/admin/media/edit/${row.media_id}`]);


  }
}
