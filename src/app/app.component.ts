import { Component } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { SeoServiceService } from './services/seoService/seo-service.service';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'prameya';

  constructor(
    private router: Router,
    public _seoService: SeoServiceService,
    private activatedRoute: ActivatedRoute,
    private Title: Title
  ) {
    this.router.events.subscribe((event: any) => {
      try {
        if (!event?.url.includes('/post')) {
          this.Title.setTitle('Prameya');
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  ngOnInit(): void {
    // const savedContent = localStorage.getItem('editorContent');
    // if (savedContent) {
    //   // Set it to your editor component
    //   // You may need to inject the editor component and call a method to set the content.
    // }
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
