import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';
import { News7_CONSTANTS } from 'src/new7constants/new7constants';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
})
export class BusinessComponent implements OnInit {
  customer_id: any;
  ads_id: any;
  img_size: any;
  allAdsList: any = [];
  postarr: any = [];
  ads_rightupper: any = [];
  ads_leftmiddle: any = [];
  firstpostbussiness: any = {};
  nextthree: any = [];

  constructor(
    private adsService: AdserviceService,
    private postserviceService: PostserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customer_id = environment.CUSTOMER_ID;
    this.getAllAdsList();
    this.getLatestNews();
  }

  getAllAdsList() {
    this.ads_id = '';
    this.img_size = '';
    this.adsService
      .getAllAds(this.ads_id, this.img_size, this.customer_id, 'U')
      .subscribe((res: any) => {
        this.allAdsList = res.body;
        this.allAdsList = this.allAdsList.map((dt: any) => JSON.parse(dt));

        /** Right Upper */
        this.ads_rightupper = this.allAdsList.filter(
          (data: any) => data.ads_img_size === '2'
        );
        /** Left Middle */
        this.ads_leftmiddle = this.allAdsList.filter(
          (data: any) => data.ads_img_size === '3'
        );
      });
  }

  openLink(url: any) {
    window.open(url);
  }

  getShortName(user_name: any) {
    return user_name.slice(0, 46).trim() + (user_name.length > 45 ? '...' : '');
  }

  getShortAuthorName(user_name: any) {
    return user_name.slice(0, 14).trim() + (user_name.length > 13 ? '...' : '');
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

            console.log(this.postarr);
          } else {
            this.postarr = [];
          }
        },
        (err) => {
          this.postarr = [];
        }
      );
  }

  openpost(id: any) {
    this.router.navigate(['/post/' + id]);
  }

  opennewsSec(id: any) {
    window.location.href = '/post/' + id;
  }
}
