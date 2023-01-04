import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';
import { News7_CONSTANTS } from 'src/new7constants/new7constants';

@Component({
  selector: 'app-featured-stories',
  templateUrl: './featured-stories.component.html',
  styleUrls: ['./featured-stories.component.css']
})
export class FeaturedStoriesComponent implements OnInit {
  postarr:any = [];
  nextthree: any = [];
  page = 1;
  count = 0;
  tableSize = 8;
  tableSizes = [3, 6, 9, 12];

  constructor(private postserviceService: PostserviceService, private router:Router) { }
  ngOnInit(): void {
    this.getLatestNews()
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  getShortName(user_name: any) {
    return user_name.slice(0, 70).trim() + (user_name.length > 69 ? "..." : "");
  }
  
  getLatestNews() {
    this.postserviceService.getLatestNews(1,environment.CUSTOMER_ID,'').subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.postarr = data.map((dt: any) => JSON.parse(dt));
        if (this.postarr.length > 0) {
          this.postarr = this.postarr.slice(0, 6)
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

