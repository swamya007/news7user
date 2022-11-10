import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';
import { News7_CONSTANTS } from 'src/new7constants/new7constants';

@Component({
  selector: 'app-main-news',
  templateUrl: './main-news.component.html',
  styleUrls: ['./main-news.component.css']
})
export class MainNewsComponent implements OnInit {
  slideIndex: number = 0;
  myTimer: any;
  postarr:any = []

  constructor(private postserviceService: PostserviceService, private router:Router) { }


  ngOnInit(): void {
    this.showImage(this.slideIndex);
    this.getLatestNews()
  }

  getShortName(user_name: any) {
    return user_name.slice(0, 61).trim() + (user_name.length > 60 ? "..." : "");
  }

  getLatestNews() {
    this.postserviceService.getLatestNews(1,environment.CUSTOMER_ID,News7_CONSTANTS.LOOKUPS.none).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.postarr = data.map((dt: any) => JSON.parse(dt));
        if (this.postarr.length > 0) {
          this.postarr = this.postarr.slice(0, 4)
        }
      } else {
        this.postarr = []
      }
    }, (err) => {
      this.postarr = []
    })
  }

  currentImage(n: number){
    clearInterval(this.myTimer);
    this.myTimer = setTimeout(() => {
      this.plusSlides(n + 1);
    }, 4000);
    this.showImage(this.slideIndex = n);
  }

  showImage(n: number) {
    let i;
    let slides: any = document.getElementsByClassName("myImages");
    let dots: any = document.getElementsByClassName("dot");
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "flex";
    dots[this.slideIndex - 1].className += " active";
    setTimeout(() => {
      this.plusSlides(1);
    }, 4000);
  }

  plusSlides(n: number){
    clearInterval(this.myTimer);
    if (n < 0){
      this.showImage(this.slideIndex -= 1);
    } else {
      this.showImage(this.slideIndex += 1);
    }

    //COMMENT OUT THE LINES BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    // if (n === -1){
    //   this.myTimer = setInterval(() => {
    //     this.plusSlides(n + 2);
    //   }, 4000);
    // } else {
    //   this.myTimer = setTimeout(() => {
    //     this.plusSlides(n + 1);
    //   }, 4000);
    // }
  }

  opennewsSec(id: any) {
    this.router.navigate(['/post/' + id]);
  }
}
