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
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  customer_id: any
  ads_id: any
  img_size: any

  // postarr: any = []
  firstpostbussiness: any = {}
  nextthree: any = [];

  ads_rightupper: any = []
  ads_leftmiddle: any = []

  category_arr: any = []

  category_one: any = []
  category_two: any = []
  category_three: any = []

  constructor(private adsService: AdserviceService, private postserviceService: PostserviceService, private router: Router,
    private masterservice: MasterServiceService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(val => {

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
    })
  }

  @Input()
  ads_list: any = []

  @Input()
  post_array_upper: any = []

  @Input()
  post_array_lower: any = []

  post_array: any = []

  ngOnInit(): void {
    this.customer_id = environment.CUSTOMER_ID
    if (this.ads_list.length > 0) {
      /** Right Upper */
      this.ads_rightupper = this.ads_list.filter((data: any) => data.ads_img_size === "2");
      /** Left Middle */
      this.ads_leftmiddle = this.ads_list.filter((data: any) => data.ads_img_size === "3");
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

  getWithoutHeaderCategory() {
    this.masterservice.getWithoutHeaderCategory(environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.category_arr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.category_arr = []
      }
    }, (err) => {
      this.category_arr = []
    })
  }

  openLink(url: any) {
    window.open(url);
  }

  getShortName(user_name: any) {
    return user_name.slice(0, 46).trim() + (user_name.length > 45 ? "..." : "");
  }

  getShortAuthorName(user_name: any) {
    return user_name.slice(0, 14).trim() + (user_name.length > 13 ? "..." : "");
  }

  opennewsSec(id: any) {
    this.router.navigate(['/post/' + id]);
  }

  openCategory(url: any) {
    this.router.navigate([url]);
  }

}
