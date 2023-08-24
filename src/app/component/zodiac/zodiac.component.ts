import { Component, Input, OnInit } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-zodiac',
  templateUrl: './zodiac.component.html',
  styleUrls: ['./zodiac.component.css'],
})
export class ZodiacComponent implements OnInit {
  customer_id: any;
  ads_id: any;
  img_size: any;
  page = 1;
  count = 0;
  tableSize = 10;
  p: number = 1;
  data: any;
  crimesnews: any = [];
  sportsnews: any = [];
  currentIndex = 0;
  currentSlide = 0;
  currentSlide1 = 0;
  allAdsList: any = [];

  translateValue = `-${this.currentSlide * 100}%`;

  currentSlides1 = 0;
  translateValue1 = `-${this.currentSlide1 * 100}%`;
  // tableSizes = [3, 6, 9, 12];

  // postarr: any = []
  // firstpostbussiness: any = {}
  // nextthree: any = [];

  ads_rightupper: any = [];
  ads_leftmiddle: any = [];

  category_arr: any = [];
  category_one: any = [];
  category_two: any = [];
  category_three: any = [];
  catname: any;
  cat_name: any;
  postarr: any;
  polticesnews: any = [];
  entermentaarr: any = [];
  odishaarr: any = [];
  homenews: any = [];
  womensnews: any = [];
  // sportsnews: any = [];
  technologynews: any = [];
  // polticesnews: any = [];
  // entermentaarr: any=[];
  campusnews: any = [];
  scincenews: any = [];
  twinnews: any = [];
  bahu_charchita_khabar_all: any = [];
  @Input()
  ads_list: any = [];

  @Input()
  post_array_upper: any = [];

  @Input()
  post_array_lower: any = [];
  constructor(
    private adsService: AdserviceService,
    private postserviceService: PostserviceService,
    private router: Router,
    private masterservice: MasterServiceService,
    private activatedRoute: ActivatedRoute,
    private transferState: TransferState
  ) {}

  ngOnInit(): void {
    this.customer_id = environment.CUSTOMER_ID;
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.cat_name = routeParams.get('slug');

    this.getWithoutHeaderCategory();
    this.getAllnews();
    this.getAllAdsList();
  }

  getWithoutHeaderCategory() {
    this.masterservice
      .getWithoutHeaderCategory(environment.CUSTOMER_ID)
      .subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;
            this.category_arr = data.map((dt: any) => JSON.parse(dt));
          } else {
            this.category_arr = [];
          }
        },
        (err) => {
          this.category_arr = [];
        }
      );
  }

  openLink(url: any) {
    window.open(url);
  }
  opennewsSec(id: any, flag: any) {
    if (flag === 'Y') {
      window.location.href = '/' + id;
    } else {
      this.router.navigate(['/' + id]);
    }
  }
  getAllAdsList() {
    this.ads_id = '';
    this.img_size = '';
    this.adsService
      .getAllAds(this.ads_id, this.img_size, this.customer_id, 'U')
      .subscribe((res: any) => {
        this.allAdsList = res.body;

        if (this.allAdsList && this.allAdsList.length > 0) {
          this.allAdsList = this.allAdsList.map((dt: any) => JSON.parse(dt));
          /** Right Upper */
          this.ads_rightupper = this.allAdsList.filter(
            (data: any) => data.ads_img_size === '2'
          );

          /** Left Middle */
          this.ads_leftmiddle = this.allAdsList.filter(
            (data: any) => data.ads_img_size === '3'
          );
        }
      });
  }

  getAllnews() {
    this.postserviceService.getallnews().subscribe(
      (res: any) => {
        if (res.code == 'success') {
          this.data = res.body;
          this.data = this.data?.map((dt: any) => JSON.parse(dt));
          this.odishaarr = this.data[0].odisha || [];
          this.crimesnews = this.data[0].crime || [];
          this.bahu_charchita_khabar_all =
            this.data[0].bahu_charchita_khabar_all || [];

          this.homenews = this.data[0].home || [];
          this.womensnews = this.data[0].women || [];
          this.sportsnews = this.data[0].sports || [];
          this.technologynews = this.data[0].technology || [];
          this.polticesnews = this.data[0].politics || [];
          this.entermentaarr = this.data[0].entertainment || [];
          this.campusnews = this.data[0].campus_muse || [];
          this.scincenews = this.data[0].science || [];
          this.twinnews = this.data[0].twin_city || [];
        } else {
          this.postarr = [];
        }
      },
      (err) => {
        this.postarr = [];
      }
    );
  }

  moveSlideleft(direction: any) {
    if (this.ads_leftmiddle) {
      if (direction === 'plus') {
        if (this.currentSlide1 !== this.ads_leftmiddle.length - 1) {
          this.currentSlide1 += 1;
          this.translateValue1 = `-${this.currentSlide1 * 100}%`;
        }
      } else {
        if (this.currentSlide1 !== 0) {
          this.currentSlide1 -= 1;
          this.translateValue1 = `-${this.currentSlide1 * 100}%`;
        }
      }
    }
  }

  getShortName(user_name: any) {
    return user_name.slice(0, 46).trim() + (user_name.length > 45 ? '...' : '');
  }

  getShortAuthorName(user_name: any) {
    return user_name.slice(0, 14).trim() + (user_name.length > 13 ? '...' : '');
  }

  getShortPostContent(user_name: any) {
    return (
      user_name.slice(0, 130).trim() + (user_name.length > 129 ? '...' : '')
    );
  }

  openCategory(url: any) {
    this.router.navigate([url]);
  }
}
