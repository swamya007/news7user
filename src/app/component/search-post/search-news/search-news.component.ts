import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-news',
  templateUrl: './search-news.component.html',
  styleUrls: ['./search-news.component.css'],
})
export class SearchNewsComponent implements OnInit {
  @Input()
  postarr: any = [];

  @Input()
  p!: number;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  opennewsSec(id: any) {
    window.location.href = '/post/' + id;
  }

  getShortName(user_name: any) {
    return user_name.slice(0, 61).trim() + (user_name.length > 60 ? '...' : '');
  }
}
