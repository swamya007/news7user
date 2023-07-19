import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { makeStateKey, TransferState } from '@angular/platform-browser';
@Component({
  selector: 'app-single-homepage',
  templateUrl: './single-homepage.component.html',
  styleUrls: ['./single-homepage.component.css'],
})
export class SingleHomepageComponent implements OnInit {
  data: any;
  postarr: any;
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
  page = 1;
  count = 0;
  tableSize = 8;
  tableSizes = [3, 6, 9, 12];
  slidearray: any = [];
  slidearrayfeature: any = [];
  bahu_charchita_khabar: any = [];
  bahu_charchita_khabar_all: any = [];
  sliderdata: any = [];

  constructor(
    private title: Title,
    private Meta: Meta,
    private transferState: TransferState,
    private postserviceService: PostserviceService,
    private router: Router,
    private master: MasterServiceService
  ) {}

  ngOnInit(): void {
    this.getAllnews();
    this.getslide();
    this.title.setTitle(
      'odisha news| Odisha News | Latest Odisha Breaking News-Prameya News'
    );

    let tags = [
      { name: 'og:type', content: 'article' },
      {
        name: 'og:title',
        content:
          'odisha news| Odisha News | Latest Odisha Breaking News-Prameya News',
      },
      {
        name: 'og:description',
        content:
          'Prameya news provides the latest Odisha news,indiaand the world.it brings you todays news from Politics,Crime,Business,Enviroment,Technology,Bollywood,Cricket,videos,photos and exclusive Odisha Breaking News',
      },
      {
        name: 'description',
        content:
          'Prameya news provides the latest Odisha news,indiaand the world.it brings you todays news from Politics,Crime,Business,Enviroment,Technology,Bollywood,Cricket,videos,photos and exclusive Odisha Breaking News',
      },
      { name: 'og:url', content: 'https://www.prameyanews.com/' },
      { name: 'og:image', content: 'https://www.prameyanews.com/' },
      { name: 'keywords', content: 'Odisha News in English' },
      { name: 'canonical', content: 'https://www.prameyanews.com/' },
      { rel: 'canonical', href: 'https://www.prameyanews.com/' },
    ];
    tags.forEach((tag: any) => {
      this.Meta.updateTag(tag);
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  getAllnews() {
      this.postserviceService.getallnews().subscribe(
        (res: any) => {
          if (res.code == 'success') {
            this.data = res.body;
            this.data = this.data?.map((dt: any) => JSON.parse(dt));
            this.odishaarr = this.data[0].odisha || [];
            this.crimesnews = this.data[0].crime || [];
            // this.bahu_charchita_khabar =
            //   this.data[0].bahu_charchita_khabar || [];
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
            this.latestnews = this.data[0].latestnews || [];
            this.sliderdata = this.data[0].slider_data || [];

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
    return user_name.slice(0, 50).trim() + (user_name.length > 49 ? '...' : '');
  }

  getShortNamebhu(user_name: any) {
    return user_name.slice(0, 25).trim() + (user_name.length > 24 ? '...' : '');
  }

  getslide() {
    this.master.getsliderodia(environment.CUSTOMER_ID).subscribe(
      (res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.slidearrayfeature = data.map((dt: any) => JSON.parse(dt));
          if (this.slidearrayfeature.length > 3) {
            this.slidearray = this.slidearrayfeature.slice(5);
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
  opennewsSec(id: any, flag: any) {
    alert(flag)
    if (flag === 'Y') {
      window.location.href = '/' + id;
    } else {
      this.router.navigate(['/' + id]);
    }
  }
}
