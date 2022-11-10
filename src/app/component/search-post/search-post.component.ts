import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent implements OnInit {

  customer_id:any
  ads_id:any
  img_size:any
  allAdsList:any = []

  ads_top:any = []
  ads_rightupper:any = []
  ads_leftmiddle:any = []
  ads_middle:any = []

  postarr:any = []

  searchval:any
  p:number = 1

  constructor(private adsService:AdserviceService,private router:Router,
    private postService:PostserviceService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.customer_id = environment.CUSTOMER_ID
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.searchval = routeParams.get('value');
    this.getAllAdsList();
    this.getSearchedPost();
  }

  getSearchedPost() {
    // this.searchval = 'am'
    this.postService.getSearchedPost(this.searchval,environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.postarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.postarr = []
      }
    }, (err) => {
      this.postarr = []
    })
  }

  opennewsSec(id: any) {
    this.router.navigate(['/post/' + id]);
  }

  getShortName(user_name: any) {
    return user_name.slice(0, 61).trim() + (user_name.length > 60 ? "..." : "");
  }

  getAllAdsList() {
    this.ads_id = ''
    this.img_size = ''
    this.adsService.getAllAds(this.ads_id,this.img_size,this.customer_id).subscribe((res: any) => {
      this.allAdsList = res.body;
      this.allAdsList = this.allAdsList.map((dt: any) => JSON.parse(dt));

      /** Top Section */
      this.ads_top = this.allAdsList.filter((data: any) => data.ads_img_size === "1");
      /** Right Upper */
      this.ads_rightupper = this.allAdsList.filter((data: any) => data.ads_img_size === "2");
      /** Left Middle */
      this.ads_leftmiddle = this.allAdsList.filter((data: any) => data.ads_img_size === "3");
      /** Middle */
      this.ads_middle = this.allAdsList.filter((data: any) => data.ads_img_size === "4");
    })
  }

  openLink(url:any) {
    window.open(url);
  }

}
