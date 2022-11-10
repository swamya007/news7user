import { Component } from '@angular/core';
import { NavigationEnd, Router ,ActivatedRoute} from '@angular/router';
import { SeoServiceService } from './services/seoService/seo-service.service';
import { filter, map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prameya';


constructor(private router : Router, public _seoService: SeoServiceService,private activatedRoute : ActivatedRoute ){}

  ngOnInit(): void {
    // let titleArr = window.location.href.split('/');
    // let title = titleArr[titleArr.length-1];
    // this.router.events.pipe(
    //   filter((event) => event instanceof NavigationEnd),
    //   map(() => this.activatedRoute),
    //   map((route) => {
    //     while (route.firstChild) route = route.firstChild;
    //     return route;
    //   }),
    //   filter((route) => route.outlet === 'primary'),
    //   mergeMap((route) => route.data)
    //  )
    //  .subscribe((event) => {
    //    this._seoService.updateTitle(title || 'Prameya');
    //    this._seoService.updateOgUrl(event['ogUrl']);
    //    this._seoService.updateDescription(event['title'] + event['description'])
    //  }); 
  }
}
