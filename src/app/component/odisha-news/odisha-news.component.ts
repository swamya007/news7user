import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';
import { News7_CONSTANTS } from 'src/new7constants/new7constants';

@Component({
  selector: 'app-odisha-news',
  templateUrl: './odisha-news.component.html',
  styleUrls: ['./odisha-news.component.css']
})
export class OdishaNewsComponent implements OnInit {

  postarr:any = []

  constructor(private postserviceService: PostserviceService,private router: Router) { }

  ngOnInit(): void {
    this.getLatestNews()
    
  }
  
  getShortName(user_name: any) {
    if(user_name.length > 45) {
      return user_name.slice(0, 46).trim() + (user_name.length > 45 ? "..." : "");
    } else {
      return user_name;
    }
  }
  getShortAuthorName(user_name: any) {
    return user_name.slice(0, 14).trim() + (user_name.length > 13 ? "..." : "");
  }

  getLatestNews() {
    this.postserviceService.getLatestNews(1,environment.CUSTOMER_ID,News7_CONSTANTS.LOOKUPS.odisha).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.postarr = data.map((dt: any) => JSON.parse(dt));
        console.log(this.postarr,"hello")
         this.postarr = this.postarr.slice(0,5)
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
  
}
