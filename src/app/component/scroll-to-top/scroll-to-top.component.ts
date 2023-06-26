import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
})
export class ScrollToTopComponent implements OnInit {
  ngOnInit(): void {}
  isShow: boolean = false;
  topPosToStartShowing = 400;

  constructor(private viewportScroller: ViewportScroller) {}

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isShow = scrollPosition >= this.topPosToStartShowing;
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
