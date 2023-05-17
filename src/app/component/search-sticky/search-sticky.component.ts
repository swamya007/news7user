import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-sticky',
  templateUrl: './search-sticky.component.html',
  styleUrls: ['./search-sticky.component.css']
})
export class SearchStickyComponent implements OnInit {

  @Input()
  searchval:any

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onKeydown(event: any) {
    event.preventDefault();
  }

  searchPost() {
    if(this.searchval) {
      this.router.navigate([`/newsearch/${this.searchval}`]);
    }
  }

}
