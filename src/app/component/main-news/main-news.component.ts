import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-news',
  templateUrl: './main-news.component.html',
  styleUrls: ['./main-news.component.css']
})
export class MainNewsComponent implements OnInit {
  slideIndex: number = 0;
  myTimer: any;
  constructor() { }

  ngOnInit(): void {
    this.showImage(this.slideIndex);
  }

  currentImage(n: number){
    clearInterval(this.myTimer);
    this.myTimer = setTimeout(() => {
      this.plusSlides(n + 1);
    }, 4000);
    this.showImage(this.slideIndex = n);
  }

  showImage(n: number) {
    // alert(n)
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
}
