import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';
import { News7_CONSTANTS } from 'src/new7constants/new7constants';
@Component({
  selector: 'app-business-news',
  templateUrl: './business-news.component.html',
  styleUrls: ['./business-news.component.css'],
})
export class BusinessNewsComponent implements OnInit {
  constructor(
    private postserviceService: PostserviceService,
    private router: Router
  ) {}
  postarr: any = [];
  firstpostbussiness: any = {};
  nextthree: any = [];

  ngOnInit(): void {
    this.getLatestNews();
  }
  getLatestNews() {
    this.postserviceService
      .getLatestNews(
        1,
        environment.CUSTOMER_ID,
        News7_CONSTANTS.LOOKUPS.business
      )
      .subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;
            this.postarr = data?.map((dt: any) => JSON.parse(dt));
            this.firstpostbussiness =
              this.postarr && this.postarr.length ? this.postarr[0] : {};
            this.nextthree = this.postarr?.slice(1, 3);
          } else {
            this.postarr = [];
          }
        },
        (err) => {
          this.postarr = [];
        }
      );
  }

  opennewsSec(id: any) {
    window.location.href = '/post/' + id;
  }
  getShortName(user_name: any) {
    if (user_name !== undefined) {
      return (
        user_name?.slice(0, 101).trim() + (user_name.length > 100 ? '...' : '')
      );
    } else {
      return user_name;
    }
  }

  // getShortName(user_name: any) {
  //   if(user_name.length > 100) {
  //     return user_name.slice(0, 101).trim() + (user_name.length > 100 ? "..." : "");
  //   } else {
  //     return user_name;
  //   }
  // }
}
