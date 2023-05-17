import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';
import { News7_CONSTANTS } from 'src/new7constants/new7constants';

@Component({
  selector: 'app-featured-stories',
  templateUrl: './featured-stories.component.html',
  styleUrls: ['./featured-stories.component.css'],
})
export class FeaturedStoriesComponent implements OnInit {
  postarr: any = [];
  nextthree: any = [];
  page = 1;
  count = 0;
  tableSize = 8;
  tableSizes = [3, 6, 9, 12];
  slidearray: any = [];
  slidearrayfeature: any = [];
  constructor(
    private postserviceService: PostserviceService,
    private router: Router,
    private master: MasterServiceService
  ) {}
  ngOnInit(): void {
    this.getLatestNews();
    this.getslide();
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  getShortName(user_name: any) {
    return user_name.slice(0, 70).trim() + (user_name.length > 69 ? '...' : '');
  }

  getLatestNews() {
    this.postserviceService
      .getLatestNewsodia(1, environment.CUSTOMER_ID, '')
      .subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;
            this.postarr = data.map((dt: any) => JSON.parse(dt));
            if (this.postarr.length > 0) {
              this.postarr = this.postarr.slice(0, 6);
              console.log(this.postarr, 'swaaaa');
            }
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

  getslide() {
    this.master.getslider(environment.CUSTOMER_ID).subscribe(
      (res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.slidearrayfeature = data.map((dt: any) => JSON.parse(dt));
          console.log(this.slidearrayfeature, 'kkk');
          if (this.slidearrayfeature.length > 3) {
            this.slidearray = this.slidearrayfeature.slice(5);
            console.log(this.slidearrayfeature, 'slidearray222');
          }
        } else {
          this.slidearrayfeature = [];
        }
      },
      (err) => {
        this.slidearrayfeature = [];
      }
    );
  }
}
