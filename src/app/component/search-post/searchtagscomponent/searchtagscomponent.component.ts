import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-searchtagscomponent',
  templateUrl: './searchtagscomponent.component.html',
  styleUrls: ['./searchtagscomponent.component.css'],
})
export class SearchtagscomponentComponent implements OnInit {
  customer_id: any;
  ads_id: any;
  img_size: any;
  allAdsList: any = [];
  currentSlide1 = 0;

  translateValue1 = `-${this.currentSlide1 * 100}%`;

  ads_top: any = [];
  ads_rightupper: any = [];
  ads_leftmiddle: any = [];
  ads_middle: any = [];

  // postarr: any = [];

  searchval: any;
  p: number = 1;
  postarr: any = [];

  s!: number;
  data: any;
  odishaarr: any = [];
  crimesnews: any = [];
  homenews: any = [];
  womensnews: any = [];
  sportsnews: any = [];
  technologynews: any = [];
  polticesnews: any = [];
  entermentaarr: any = [];
  campusnews: any = [];
  scincenews: any = [];
  twinnews: any = [];
  latestnews: any = [];
  constructor(
    private adsService: AdserviceService,
    private router: Router,
    private postService: PostserviceService,
    private activatedRoute: ActivatedRoute,
    private postserviceService: PostserviceService
  ) {
    activatedRoute.params.subscribe((val) => {
      this.customer_id = environment.CUSTOMER_ID;
      const routeParams = this.activatedRoute.snapshot.paramMap;
      this.searchval = routeParams.get('tags');

      this.getAllAdsList();
      this.getSearchedPost();
      // this.getAllnews();
    });
  }

  ngOnInit(): void {
    this.customer_id = environment.CUSTOMER_ID;
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.searchval = routeParams.get('tags');
    // alert(this.searchval)
    this.getAllAdsList();
    this.getSearchedPost();
    this.getAllnews();
  }

  getSearchedPost() {
    // this.searchval = 'am'
    this.postService
      .getTagWisw(this.p, environment.CUSTOMER_ID, this.searchval)
      .subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;
            this.postarr = data.map((dt: any) => JSON.parse(dt));
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
  opennewsSecs(id: any) {
    window.location.href = '/' + id;
  }

  getShortName(user_name: any) {
    return user_name.slice(0, 61).trim() + (user_name.length > 60 ? '...' : '');
  }

  getAllAdsList() {
    this.ads_id = '';
    this.img_size = '';
    this.adsService
      .getAllAds(this.ads_id, this.img_size, this.customer_id, 'U')
      .subscribe((res: any) => {
        this.allAdsList = res.body;
        this.allAdsList = this.allAdsList.map((dt: any) => JSON.parse(dt));

        /** Top Section */
        this.ads_top = this.allAdsList.filter(
          (data: any) => data.ads_img_size === '1'
        );
        /** Right Upper */
        this.ads_rightupper = this.allAdsList.filter(
          (data: any) => data.ads_img_size === '2'
        );
        /** Left Middle */
        this.ads_leftmiddle = this.allAdsList.filter(
          (data: any) => data.ads_img_size === '3'
        );
        /** Middle */
        this.ads_middle = this.allAdsList.filter(
          (data: any) => data.ads_img_size === '4'
        );
      });
  }

  openLink(url: any) {
    window.open(url);
  }

  getAllnews() {
    this.postserviceService.getallnews().subscribe(
      (res: any) => {
        if (res.code == 'success') {
          this.data = res.body;
          this.data = this.data?.map((dt: any) => JSON.parse(dt));
          this.odishaarr = this.data[0].odisha || [];
          this.crimesnews = this.data[0].crime || [];

          this.homenews = this.data[0].home || [];
          this.womensnews = this.data[0].women || [];
          this.sportsnews = this.data[0].sports || [];
          this.technologynews = this.data[0].technology || [];
          this.polticesnews = this.data[0].politics || [];
          this.entermentaarr = this.data[0].entertainment || [];
          this.campusnews = this.data[0].campus_muse || [];
          this.scincenews = this.data[0].science || [];
          this.twinnews = this.data[0].twin_city || [];
          this.latestnews = this.data[0].latestnews || [];
        } else {
          this.postarr = [];
        }
      },
      (err) => {
        this.postarr = [];
      }
    );
  }

  opennewsSec(id: any, flag: any) {
    if (flag === 'Y') {
      window.location.href = '/' + id;
    } else {
      this.router.navigate(['/' + id]);
    }
  }
}
