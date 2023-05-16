import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';

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

  constructor(    private postserviceService: PostserviceService,    private router: Router,

    ) { }

  ngOnInit(): void {
    this.getAllnews();
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

  opennewsSec(id: any,flag:any) {
    if(flag === 'Y') {
      window.location.href='/post/' + id;
    } else {
      this.router.navigate (['/post/' + id]) ;
    }
    
  }

}
