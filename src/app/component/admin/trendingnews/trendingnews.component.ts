import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trendingnews',
  templateUrl: './trendingnews.component.html',
  styleUrls: ['./trendingnews.component.css']
})
export class TrendingnewsComponent implements OnInit {

  constructor( private viewstreanding : PostserviceService,private router: Router,
    private matDialog:MatDialog,private notification:NotificationService,
    private masterService:MasterServiceService,private spinnerService: LoaderService) { }

    trendingarray: any[] = []
    tagid:any=''
    tag_name:any = ''
    cust_id:any
    tagSearch: any = '';
    p: number = 1;
    ngOnInit(): void {
      this.cust_id = environment.CUSTOMER_ID
      this.getalltrending()
    }
    getalltrending() {

      this.spinnerService.show()
      this.viewstreanding.getTrendingNews(this.cust_id).subscribe((res: any) => {
        if (res.code == 'success') {
          this.spinnerService.hide()
  
          var data = res.body;
          this.trendingarray = data.map((dt: any) => JSON.parse(dt));
        } else {
          this.trendingarray = []
          this.spinnerService.hide()
  
        }
      }, (err) => {
        this.trendingarray = []
        this.spinnerService.hide()
  
      })
    }
}
