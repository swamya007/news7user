import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-odia-topstories',
  templateUrl: './odia-topstories.component.html',
  styleUrls: ['./odia-topstories.component.css'],
})
export class OdiaTopstoriesComponent implements OnInit {
  postarr: any = [];
  nextthree: any = [];
  constructor(
    private postserviceService: PostserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLatestNews();
  }

  getShortName(user_name: any) {
    if (user_name.length > 35) {
      return (
        user_name.slice(0, 26).trim() + (user_name.length > 35 ? '...' : '')
      );
    } else {
      return user_name;
    }
  }
  getShortAuthorName(user_name: any) {
    return user_name.slice(0, 14).trim() + (user_name.length > 13 ? '...' : '');
  }
  opennewsSec(id: any) {
    window.location.href = '/post/' + id;
  }
  getLatestNews() {
    this.postserviceService
      .getLatestNewsodia(1, environment.CUSTOMER_ID, '')
      .subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;
            this.postarr = data.map((dt: any) => JSON.parse(dt));
            if (this.postarr.length > 0) {
              this.postarr = this.postarr.slice(0, 5);
            }
          } else {
            this.postarr = [];
          }
        },
        (err) => {
          this.postarr = [];
        }
      );
  }
}
