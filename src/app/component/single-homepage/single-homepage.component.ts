import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-homepage',
  templateUrl: './single-homepage.component.html',
  styleUrls: ['./single-homepage.component.css']
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
  entermentaarr: any=[];
  campusnews: any = []
  scincenews:any = []
  twinnews: any = [];
  latestnews:any = [];
  page = 1;
  count = 0;
  tableSize = 8;
  tableSizes = [3, 6, 9, 12];
  slidearray: any = [];
  slidearrayfeature: any = [];
  bahu_charchita_khabar:any = []

  constructor(    private postserviceService: PostserviceService,    private router: Router,private master: MasterServiceService

    ) { }

  ngOnInit(): void {
    this.getAllnews();
    this.getslide()
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  getAllnews(){
    this.postserviceService.getallnews().subscribe(
      (res: any) => {
        if (res.code == 'success') {
          this.data = res.body;
          this.data =  this.data?.map((dt: any) => JSON.parse(dt));
           this.odishaarr =  this.data[0].odisha || [];
           console.log(this.data,'ss')
           this.crimesnews =  this.data[0].crime || [];
           console.log(this.odishaarr,'ss')
          this.bahu_charchita_khabar = this.data[0].bahu_charchita_khabar || []
           this.homenews =  this.data[0].home || [];
           this.womensnews =  this.data[0].women || [];
           this.sportsnews =  this.data[0].sports || [];
           this.technologynews =  this.data[0].technology || [];
           this.polticesnews =  this.data[0].politics || [];
           this.entermentaarr =  this.data[0].entertainment || [];
           this.campusnews =  this.data[0].campus_muse || [];
           this.scincenews =  this.data[0].science || [];
           this.twinnews =  this.data[0].twin_city || [];
          this.latestnews =this.data[0].latestnews || [];
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


  getslide() {
    this.master.getsliderodia(environment.CUSTOMER_ID).subscribe(
      (res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.slidearrayfeature = data.map((dt: any) => JSON.parse(dt));
          console.log(this.slidearrayfeature, 'kkk');
          if (this.slidearrayfeature.length > 3) {
            this.slidearray = this.slidearrayfeature.slice(5);
            console.log(this.slidearrayfeature,'array')
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
  opennewsSec(id: any,flag:any) {
    if(flag === 'Y') {
      window.location.href='/post/' + id;
    } else {
      this.router.navigate (['/post/' + id]) ;
    }
    
  }

}
