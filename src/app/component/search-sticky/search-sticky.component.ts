import { Component,  Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-sticky',
  templateUrl: './search-sticky.component.html',
  styleUrls: ['./search-sticky.component.css']
})
export class SearchStickyComponent implements OnInit {

  constructor(private router:Router) { }

  @Input()
  searchval:any
  ngOnInit(): void {
  }


  onKeydown(event: any) {
    event.preventDefault();
  }

  searchPost() {
    if(this.searchval) {
      this.router.navigate([`/search/${this.searchval}`]);
    }
  }
}
