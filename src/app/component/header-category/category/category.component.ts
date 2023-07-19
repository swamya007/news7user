import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';
import { News7_CONSTANTS } from 'src/new7constants/new7constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
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
  category_name: any;
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
  constructor(
    private adsService: AdserviceService,
    private postserviceService: PostserviceService,
    private router: Router,
    private masterservice: MasterServiceService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((val) => {
      const routeParams = this.activatedRoute.snapshot.paramMap;
      // this.cat_name = routeParams.get('slug');
      // console.log('Here')

      // this.customer_id = environment.CUSTOMER_ID
      // if (this.ads_list.length > 0) {
      //   /** Right Upper */
      //   this.ads_rightupper = this.ads_list.filter((data: any) => data.ads_img_size === "2");
      //   /** Left Middle */
      //   this.ads_leftmiddle = this.ads_list.filter((data: any) => data.ads_img_size === "3");
      // }
      // this.getWithoutHeaderCategory();

      // if (this.post_array_upper && this.post_array_upper[0].category_name) {
      //   this.category_one = this.post_array_upper[0].category_name.split(",");
      //   console.log('Category One====', this.category_one)
      // }
      // if (this.post_array_upper && this.post_array_upper[1].category_name) {
      //   this.category_two = this.post_array_upper[1].category_name.split(",");
      //   console.log('Category Two====', this.category_two)
      // }
      // if (this.post_array_upper && this.post_array_upper[4].category_name) {
      //   this.category_three = this.post_array_upper[4].category_name.split(",");
      //   console.log('Category Three====', this.category_three)
      // }
    });
  }

  @Input()
  ads_list: any = [];

  @Input()
  post_array_upper: any = [];

  @Input()
  post_array_lower: any = [];

  @Input()
  post_array: any = [];

  ngOnInit(): void {
    this.customer_id = environment.CUSTOMER_ID;
    const routeParams = this.activatedRoute.snapshot.paramMap;
    // this.cat_name = routeParams.get('slug');
    if (this.ads_list && this.ads_list.length > 0) {
      /** Right Upper */
      this.ads_rightupper = this.ads_list.filter(
        (data: any) => data.ads_img_size === '2'
      );
      /** Left Middle */
      this.ads_leftmiddle = this.ads_list.filter(
        (data: any) => data.ads_img_size === '3'
      );
    }
    this.getWithoutHeaderCategory();
    // if (this.post_array_upper && this.post_array_upper[0].category_name) {
    //   this.category_one = this.post_array_upper[0].category_name.split(",");
    //   console.log('Category====', this.category_one)
    // }
    // if (this.post_array_upper && this.post_array_upper[1].category_name) {
    //   this.category_two = this.post_array_upper[1].category_name.split(",");
    //   console.log('Category====', this.category_two)
    // }
    // if (this.post_array_upper && this.post_array_upper[4].category_name) {
    //   this.category_three = this.post_array_upper[4].category_name.split(",");
    //   console.log('Category====', this.category_three)
    // }
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

  getWithoutHeaderCategory() {
    this.masterservice
      .getWithoutHeaderCategory(environment.CUSTOMER_ID)
      .subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;
            this.category_arr = data.map((dt: any) => JSON.parse(dt));
            console.log(this.category_arr, 'cat-name');
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

  getAllairticlenews() {
    this.postserviceService.getallairticle().subscribe(
      (res: any) => {
        if (res.code == 'success') {
          this.data = res.body;
          this.data = this.data?.map((dt: any) => JSON.parse(dt));
          this.crimesnews = this.data[0].crime || [];
          this.sportsnews = this.data[0].sports || [];
          this.polticesnews = this.data[0].politics || [];
          this.entermentaarr = this.data[0].entertainment || [];
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
