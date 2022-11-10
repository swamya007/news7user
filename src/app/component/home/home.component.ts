import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  customer_id:any
  ads_id:any
  img_size:any
  allAdsList:any = []

  ads_top:any = []
  ads_rightupper:any = []
  ads_leftmiddle:any = []
  ads_middle:any = []

  searchval:any

  constructor(private adsService:AdserviceService,private router:Router) { }

  ngOnInit(): void {
    this.customer_id = environment.CUSTOMER_ID
    this.getAllAdsList();
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

  searchPost() {
    if(this.searchval) {
      this.router.navigate([`/search/${this.searchval}`]);
    }
  }

}
