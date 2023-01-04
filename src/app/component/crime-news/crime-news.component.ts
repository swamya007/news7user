import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';
import { News7_CONSTANTS } from 'src/new7constants/new7constants';
@Component({
  selector: 'app-crime-news',
  templateUrl: './crime-news.component.html',
  styleUrls: ['./crime-news.component.css']
})
export class CrimeNewsComponent implements OnInit {

  constructor(private postserviceService: PostserviceService,private router: Router) { }
  postarr:any = []

  ngOnInit(): void {
    this.getLatestNews()
  }

  getShortName(user_name: any) {
    return user_name.slice(0, 46).trim() + (user_name.length > 45 ? "..." : "");
  }

  getLatestNews() {
    this.postserviceService.getLatestNews(1, environment.CUSTOMER_ID, News7_CONSTANTS.LOOKUPS.crime).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.postarr = data.map((dt: any) => JSON.parse(dt));
        if(this.postarr.length > 6) {
          this.postarr = this.postarr.slice(0,3)
        }
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
