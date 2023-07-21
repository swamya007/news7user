import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-category',
  templateUrl: './header-category.component.html',
  styleUrls: ['./header-category.component.css'],
})
export class HeaderCategoryComponent implements OnInit {
  customer_id: any;
  ads_id: any;
  img_size: any;
  allAdsList: any = [];
  postarr: any = [];
  post_array_lower: any;
  post_array_upper: any;
  ads_list: any;
  slug: any;
  post_cnt: number = 0;

  constructor(
    private adsService: AdserviceService,
    private postserviceService: PostserviceService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((val) => {
      this.customer_id = environment.CUSTOMER_ID;
      const routeParams = this.activatedRoute.snapshot.paramMap;
      this.slug = routeParams.get('slug');
      this.getAllAdsList();
      this.getNewsBySlug();
    });
  }

  ngOnInit(): void {
    this.customer_id = environment.CUSTOMER_ID;
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.slug = routeParams.get('slug');
    this.getAllAdsList();
    this.getNewsBySlug();
  }

  getNewsBySlug() {
    this.postserviceService
      .getPostByCategorySlugodia(1, this.slug, environment.CUSTOMER_ID)
      .subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;

            this.postarr = data?.map((dt: any) => JSON.parse(dt));
            this.post_cnt = this.postarr.length;
            this.postarr.forEach((element: any) => {
              if (element && element.category_name) {
                element.category_list = element.category_name.split(',');
              }
            });

            if (this.postarr.length > 0) {
              this.post_array_upper = this.postarr.slice(0, 5);
            } else {
              this.post_array_upper = [];
            }

            if (this.postarr.length > 5) {
              this.post_array_lower = this.postarr.slice(5, 15);
            } else {
              this.post_array_lower = [];
            }
          } else {
            this.postarr = [];
          }
        },
        (err: any) => {
          this.postarr = [];
        }
      );
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
        }
      });
  }
}
