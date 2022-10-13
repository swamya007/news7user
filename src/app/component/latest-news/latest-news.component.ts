import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {
  news: any = [];
  constructor() { }

  ngOnInit(): void {
    this.generate();
  }
  generate() {
    for (let index = 0; index < 15; index++) {
      this.news[index] = index;
    }
    return this.news;
  }
}
