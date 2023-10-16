import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { EntryPopupComponent } from '../entry-popup/entry-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  headerarry: any[] = [];
  customer_id: any;
  morearray: any[] = [];
  newarray: any[] = [];

  ads_id: any;
  img_size: any;
  allAdsList: any = [];

  ads_middle: any = [];
  isLoggedIn = false;
  currentIndex = 0;
  currentSlide = 0;
  currentSlide1 = 0;

  translateValue = `-${this.currentSlide * 100}%`;

  currentSlides1 = 0;
  translateValue1 = `-${this.currentSlide1 * 100}%`;
  constructor(
    private masterAPI: MasterServiceService,
    private adsService: AdserviceService,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.customer_id = environment.CUSTOMER_ID;
    this.getallheaders();
    this.getAllAdsList();
  }
  home() {
    this.router.navigate(['/']);
  }
  moveSlideleft(direction: any) {
    if (this.ads_middle) {
      if (direction === 'plus') {
        if (this.currentSlide1 !== this.ads_middle.length - 1) {
          this.currentSlide1 += 1;
          this.translateValue1 = `-${this.currentSlide1 * 100}%`;
        }
      } else {
        if (this.currentSlide1 !== 0) {
          this.currentSlide1 -= 1;
          this.translateValue1 = `-${this.currentSlide1 * 100}%`;
        }
      }
    }
  }

  // closeDropdown() {
  //   const navbarToggler = document.querySelector('.navbar-toggler');
  //   const navbarCollapse = document.querySelector('.navbar-collapse');
  //   if (navbarToggler && navbarCollapse) {
  //     (navbarToggler as HTMLElement).click(); // Simulate clicking the toggler to close the dropdown
  //   }
  // }
  closeDropdown() {
    const navbarToggler =
      this.elementRef.nativeElement.querySelector('.navbar-toggler');
    const navbarCollapse =
      this.elementRef.nativeElement.querySelector('.navbar-collapse');
    if (navbarToggler && navbarCollapse) {
      this.renderer.setProperty(navbarToggler, 'aria-expanded', 'false');
      this.renderer.removeClass(navbarCollapse, 'show');
    }
  }
  durgapuja(){
    window.open("https://www.prameyanews.com/durgapuja");
  }
  getallheaders() {
    this.masterAPI.getAllheaders(environment.CUSTOMER_ID).subscribe(
      (res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.headerarry = data.map((dt: any) => JSON.parse(dt));
          if (this.headerarry.length > 10) {
            this.newarray = this.headerarry.slice(0, 10);
            this.morearray = this.headerarry.slice(10);
          } else {
            this.newarray = this.headerarry;
          }
        } else {
          this.headerarry = [];
        }
      },
      (err) => {
        this.headerarry = [];
      }
    );
  }

  getAllAdsList() {
    this.ads_id = '';
    this.img_size = '';
    this.adsService
      .getAllAds(this.ads_id, this.img_size, this.customer_id, 'U')
      .subscribe((res: any) => {
        this.allAdsList = res.body || [];
        this.allAdsList = this.allAdsList?.map((dt: any) => JSON.parse(dt));

        /** Middle */
        this.ads_middle = this.allAdsList.filter(
          (data: any) => data.ads_img_size === '4'
        );
        setTimeout(() => {}, 3000);
      });
  }

  openLink(url: any) {
    window.open(url);
  }
}
