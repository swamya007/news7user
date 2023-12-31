import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-latest-news-header',
  templateUrl: './latest-news-header.component.html',
  styleUrls: ['./latest-news-header.component.css'],
})
export class LatestNewsHeaderComponent implements OnInit {
  slideIndex: number = 1;
  myTimer: any;
  postarr: any = [];
  ticker_id: any;
  catarr: any;
  constructor(
    private postserviceService: PostserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getLatestNews();
    // setTimeout(() => {
    //   this.showSlides(this.slideIndex);
    // }, 1000);
    this.getticker();
  }

  // getLatestNews() {
  //   this.postserviceService.getTrendingNews(environment.CUSTOMER_ID).subscribe(
  //     (res: any) => {
  //       if (res.code == 'success') {
  //         var data = res.body;
  //         this.postarr = data.map((dt: any) => JSON.parse(dt));
  //       } else {
  //         this.postarr = [];
  //       }
  //     },
  //     (err) => {
  //       this.postarr = [];
  //     }
  //   );
  // }

  opennewsSec(id: any, flag: any) {
    // if (flag === 'Y') {
    //   window.location.href = id;
    //   console.log(id, 'id');
    // } else {
    //   this.router.navigate([id]);
    // }

    // console.log('id:', id);
    if (flag === 'Y') {
      if (id) {
        window.location.href = id;
      }
    } else {
      this.router.navigate([id]);
    }
  }

  // plusSlides(n: number) {
  //   clearInterval(this.myTimer);
  //   this.showSlides((this.slideIndex += n));
  // }

  // currentSlide(n: any) {
  //   this.showSlides((this.slideIndex = n));
  // }

  getticker() {
    this.ticker_id = '';
    this.postserviceService
      .getTicker(this.ticker_id, environment.CUSTOMER_ID)
      .subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;
            this.catarr = data.map((dt: any) => JSON.parse(dt));
          } else {
            this.catarr = [];
          }
        },
        (err: any) => {}
      );
  }
  // showSlides(n: number) {
  //   var i;
  //   let slides: any = document.getElementsByClassName('mySlides');
  //   if (n > slides.length) {
  //     this.slideIndex = 1;
  //   }
  //   if (n < 1) {
  //     this.slideIndex = slides.length;
  //   }
  //   for (i = 0; i < slides.length; i++) {
  //     slides[i].style.display = 'none';
  //   }
  //   slides[this.slideIndex - 1].style.display = 'block';
  //   setTimeout(() => {
  //     this.plusSlides(1);
  //   }, 6000);
  // }
}
