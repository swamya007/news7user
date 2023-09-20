import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare const gtag: Function;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prameya';


constructor(private router : Router,private activatedRoute : ActivatedRoute, private  Title: Title){
  this.router.events.subscribe((event:any) => {
    if (event instanceof NavigationEnd) {
      gtag('config', environment.GOOGLE_ANALYTICS_ID, { 'page_path': event.urlAfterRedirects });
    }
    try{
      if(!event?.url.includes('/post')) {
        this.Title.setTitle('Prameya');
      }
    }catch(e) {
      console.log(e);
    }
  })
}


  ngOnInit(): void {

  }
  
}
