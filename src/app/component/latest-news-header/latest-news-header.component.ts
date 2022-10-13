import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-latest-news-header',
  templateUrl: './latest-news-header.component.html',
  styleUrls: ['./latest-news-header.component.css']
})
export class LatestNewsHeaderComponent implements OnInit {
  slideIndex: number = 1;
  myTimer: any;
  constructor() { }

  ngOnInit(): void {
    this.showSlides(this.slideIndex);
  }

plusSlides(n: number) {
  clearInterval(this.myTimer);
  this.showSlides(this.slideIndex += n);
}

currentSlide(n: any) {
  this.showSlides(this.slideIndex = n);
}

showSlides(n: number) {
  var i;
  let slides: any = document.getElementsByClassName("mySlides");
  if (n > slides.length) { this.slideIndex = 1 }
  if (n < 1) { this.slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[this.slideIndex - 1].style.display = "block";
  setTimeout(() => {
    this.plusSlides(1);
  }, 6000);
}

}
