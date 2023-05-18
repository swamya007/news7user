import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentModel } from 'src/app/models/commentModel';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';
import { Title, Meta } from '@angular/platform-browser';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
// import { LoginService } from 'src/app/services/loginService/login.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  id!: any;
  post_name: any = '';
  currentuser: any = {};
  postarr: any;
  news: any = {};
  customer_id: any;
  ads_id: any;
  img_size: any;
  allAdsList: any = [];
  ads_rightupper: any = [];
  ads_leftmiddle: any = [];
  nextthree: any = [];
  comments: any = [];
  author_post: any = [];
  comment_page_no: number = 1;
  post_page_no: number = 1;
  comment_obj: any;
  data: any;
  polticesnews: any;
  entermentaarr: any;
  sportsnews: any;
  crimesnews: any;
  comment_count: number = 0;
  navUrl!: string;
  currentIndex = 0;
  currentSlide = 0;
  translateValue = `-${this.currentSlide * 100}%`;

  currentSlides = 0;
  translateValues = `-${this.currentSlides * 100}%`;
  cat: any;
  catname: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private notify: NotificationService,
    private post: PostserviceService,
    private titleService: Title,
    private postserviceService: PostserviceService,
    private adsService: AdserviceService,
    private Title: Title,
    private spinnerService: LoaderService,
    private Meta: Meta,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    activatedRoute.params.subscribe((val) => {
      const routeParams = this.activatedRoute.snapshot.paramMap;
      this.id = routeParams.get('Id');
      this.comment_page_no = 1;
      this.post_page_no = 1;
      this.comment_count = 0;
      this.comment_obj = new CommentModel();
      this.getAllAdsList();
      this.post.getPostBySlugodia(this.id, environment.CUSTOMER_ID).subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;
            this.postarr = data?.map((dt: any) => JSON.parse(dt));
            this.news =
              this.postarr && this.postarr.length ? this.postarr[0] : {};
            if (this.news.tags) {
              this.news.tags = this.news.tags.replaceAll(',', ', ');
            }
            this.news.post_content_sanitized =
              this.sanitizer.bypassSecurityTrustHtml(this.news.post_content);
            //if(isPlatformBrowser(PLATFORM_ID)) {
            // let div = document.querySelector('.article-text-section');
            // if (div) {
            //   div.innerHTML = this.news.post_content;
            // }
            //}
            this.Title.setTitle(this.news.post_title);
            let imgURL = this.news.guid;
            let newsTitle = this.news.post_title;
            let newsDesc = this.news.meta_description;
            let postURL = this.news.permalink;
            let tags = [
              { name: 'twitter:card', content: 'summary' },
              { name: 'twitter:image', content: imgURL },
              { name: 'twitter:title', content: newsTitle },
              { name: 'twitter:description', content: newsDesc },
              { name: 'og:type', content: 'article' },
              { name: 'og:title', content: newsTitle },
              { name: 'og:description', content: newsDesc },
              { name: 'description', content: newsDesc },
              { name: 'og:url', content: postURL },
              { name: 'og:image', content: imgURL },
            ];
            tags.forEach((tag: any) => {
              this.Meta.updateTag(tag);
            });
            this.comment_obj.comment_post_id = this.news.id;
            this.getCommentsByPost(this.news.id);
            this.getPostByAuthor();
          } else {
            this.postarr = [];
          }
        },
        (err) => {
          this.postarr = [];
        }
      );
    });
  }
  isLoggedIn = false;

  ngOnInit(): void {
    //this.isLoggedIn = this.loginService.isLoggedIn();
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.id = routeParams.get('Id');
    this.comment_page_no = 1;
    this.post_page_no = 1;
    this.comment_count = 0;
    this.comment_obj = new CommentModel();
    this.getallpost();
    this.getAllAdsList();
    this.getAllairticlenews();
    // this.getIPAddress();
    // this.getBrowserName();
    this.post.getPostBySlugodia(this.id, environment.CUSTOMER_ID).subscribe(
      (res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.postarr = data?.map((dt: any) => JSON.parse(dt));
          this.news =
            this.postarr && this.postarr.length ? this.postarr[0] : {};
          if (this.news.tags) {
            this.news.tags = this.news.tags.replaceAll(',', ', ');
          }
          this.news.post_content_sanitized =
            this.sanitizer.bypassSecurityTrustHtml(this.news.post_content);
          //if(isPlatformBrowser(PLATFORM_ID)) {
          // let div = document.querySelector('.article-text-section');
          // if (div) {
          //   div.innerHTML = this.news.post_content;
          // }
          //}
          this.Title.setTitle(this.news.post_title);
          let imgURL = this.news.guid;
          let newsTitle = this.news.post_title;
          let newsDesc = this.news.meta_description;
          let postURL = this.news.permalink;
          let tags = [
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:image', content: imgURL },
            { name: 'twitter:title', content: newsTitle },
            { name: 'twitter:description', content: newsDesc },
            { name: 'og:type', content: 'article' },
            { name: 'og:title', content: newsTitle },
            { name: 'og:description', content: newsDesc },
            { name: 'description', content: newsDesc },
            { name: 'og:url', content: postURL },
            { name: 'og:image', content: imgURL },
          ];
          tags.forEach((tag: any) => {
            this.Meta.updateTag(tag);
          });
          this.comment_obj.comment_post_id = this.news.id;
          this.getCommentsByPost(this.news.id);
          this.getPostByAuthor();
        } else {
          this.postarr = [];
        }
      },
      (err) => {
        this.postarr = [];
      }
    );
  }

  prevSlide() {
    this.currentIndex =
      this.currentIndex === 0
        ? this.ads_rightupper.length - 1
        : this.currentIndex - 1;
  }

  nextSlide() {
    this.currentIndex =
      this.currentIndex === this.ads_rightupper.length - 1
        ? 0
        : this.currentIndex + 1;
  }

  moveSlide(direction: any) {
    if (this.ads_rightupper) {
      if (direction === 'plus') {
        if (this.currentSlide !== this.ads_rightupper.length - 1) {
          this.currentSlide += 1;
          this.translateValue = `-${this.currentSlide * 100}%`;
        }
      } else {
        if (this.currentSlide !== 0) {
          this.currentSlide -= 1;
          this.translateValue = `-${this.currentSlide * 100}%`;
        }
      }
    }
  }
  getPostByAuthor() {
    console.log(this.postarr[0].category, 'dkkd');

    this.post
      .getPostByCategoryIDodia(
        1,
        this.postarr[0].category,
        environment.CUSTOMER_ID
      )
      .subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;
            this.author_post = data?.map((dt: any) => JSON.parse(dt));
            this.author_post = this.author_post.filter(
              (a: any) => a.slug !== this.id
            );
            this.nextthree = this.author_post?.slice(0, 7);
            console.log('time', this.nextthree);
          } else {
            this.author_post = [];
          }
        },
        (err) => {
          this.author_post = [];
        }
      );
  }
  getPostBycategory() {
    console.log(this.postarr[0].category, 'dkkd');
    // this.postarr[0].category= this.cat.replace(/,/g, "")
    if (this.postarr[0].category) {
      this.cat = this.postarr[0].category.split(',')[0];
    }

    if (this.postarr[0].category_name) {
      this.catname = this.postarr[0].category_name.split(',')[0];
    }
    console.log(this.cat, 'k');
    this.post
      .getPostByCategoryIDodia(1, this.cat, environment.CUSTOMER_ID)
      .subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;
            this.author_post = data?.map((dt: any) => JSON.parse(dt));
            this.author_post = this.author_post.filter(
              (a: any) => a.slug !== this.id
            );
            console.log('this.author_post==', this.author_post);
            this.nextthree = this.author_post?.slice(1, 7);
            console.log(this.nextthree, 'king');
          } else {
            this.author_post = [];
          }
        },
        (err) => {
          this.author_post = [];
        }
      );
  }

  getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.comment_obj.comment_author_ip = res.ip;
    });
  }

  getBrowserName() {
    if (
      (navigator.userAgent.indexOf('Opera') ||
        navigator.userAgent.indexOf('OPR')) != -1
    ) {
      this.comment_obj.comment_agent = 'Opera';
    } else if (navigator.userAgent.indexOf('Edg') != -1) {
      this.comment_obj.comment_agent = 'Edge';
    } else if (navigator.userAgent.indexOf('Chrome') != -1) {
      this.comment_obj.comment_agent = 'Chrome';
    } else if (navigator.userAgent.indexOf('Safari') != -1) {
      this.comment_obj.comment_agent = 'Safari';
    } else if (navigator.userAgent.indexOf('Firefox') != -1) {
      this.comment_obj.comment_agent = 'Firefox';
    } else if (navigator.userAgent.indexOf('MSIE') != -1) {
      //IF IE > 10
      this.comment_obj.comment_agent = 'IE';
    } else {
      this.comment_obj.comment_agent = 'Unknown';
    }
  }

  getAllAdsList() {
    this.ads_id = '';
    this.img_size = '';
    this.adsService
      .getAllAds(this.ads_id, this.img_size, environment.CUSTOMER_ID, 'U')
      .subscribe((res: any) => {
        this.allAdsList = res.body;
        this.allAdsList = this.allAdsList.map((dt: any) => JSON.parse(dt));
        /** Right Upper */
        this.ads_rightupper = this.allAdsList.filter(
          (data: any) => data.ads_img_size === '2'
        );
        /** Left Middle */
        this.ads_leftmiddle = this.allAdsList.filter(
          (data: any) => data.ads_img_size === '3'
        );
      });
  }

  openLink(url: any) {
    window.open(url);
  }

  edit(uid: any) {
    this.router.navigate([`/admin/post/edit/${uid}`]);
  }
  getShortName(user_name: any) {
    return user_name.slice(0, 46).trim() + (user_name.length > 45 ? '...' : '');
  }

  onChange(ob: MatCheckboxChange) {
    if (ob.checked) {
      this.comment_obj.remember_me = true;
    } else {
      this.comment_obj.remember_me = false;
    }
  }

  savePostComment() {
    this.spinnerService.show();

    this.comment_obj.flag = 'I';
    this.comment_obj.customer_id = environment.CUSTOMER_ID;
    this.post.savePostComment(this.comment_obj).subscribe(
      (res: any) => {
        if (res.code == 'success') {
          this.comment_obj.comment_content = '';
          this.comment_obj.comment_author = '';
          this.comment_obj.comment_author_email = '';
          this.comment_obj.comment_author_url = '';
          this.comment_obj.remember_me = false;
          this.getCommentsByPost(this.news.id);
          this.spinnerService.hide();
        } else {
          this.spinnerService.hide();
          this.notify.error(res.message);
        }
      },
      (err: any) => {
        this.notify.error(err.message);
      }
    );
  }
  opennewsSec(id: any, flag: any) {
    if (flag === 'Y') {
      window.location.href = '/post/' + id;
    } else {
      this.router.navigate(['/post/' + id]);
    }
  }
  getallpost() {
    this.spinnerService.show();
    this.post.getPostBySlugodia(this.id, environment.CUSTOMER_ID).subscribe(
      (res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.postarr = data?.map((dt: any) => JSON.parse(dt));
          this.news =
            this.postarr && this.postarr.length ? this.postarr[0] : {};
          if (this.news.tags) {
            this.news.tags = this.news.tags.replaceAll(',', ', ');
          }
          if (isPlatformBrowser(PLATFORM_ID)) {
            let div = document.querySelector('.article-text-section');
            if (div) {
              div.innerHTML = this.news.post_content;
            }
          }

          this.Title.setTitle(this.news.post_title);
          this.comment_obj.comment_post_id = this.news.id;
          this.getCommentsByPost(this.news.id);
          // this.getPo(this.news.id);
          this.getPostBycategory();
          this.spinnerService.hide();
        } else {
          this.postarr = [];
        }
      },
      (err) => {
        this.spinnerService.hide();
        this.postarr = [];
      }
    );
  }

  moveSlide2(directions: number) {
    this.currentSlides += directions;
    this.translateValues = `-${this.currentSlide * 100}%`;
  }
  // getPostByAuthor(post_id: any) {

  //   this.post.getPostByAuthor(this.news.post_author, post_id, environment.CUSTOMER_ID).subscribe((res: any) => {
  //     if (res.code == 'success') {
  //       var data = res.body;
  //       this.author_post = data?.map((dt: any) => JSON.parse(dt));
  //       console.log('this.author_post==',this.author_post)
  //     } else {
  //       this.author_post = []
  //     }
  //   }, (err) => {
  //     this.author_post = []
  //   })
  // }

  // getPostByAuthor() {

  //   console.log(this.postarr[0].category,'dkkd')

  //       this.post.getPostByCategoryID(1,  this.postarr[0].category, environment.CUSTOMER_ID).subscribe((res: any) => {
  //         if (res.code == 'success') {
  //           var data = res.body;
  //           this.author_post = data?.map((dt: any) => JSON.parse(dt));
  //           this.author_post = this.author_post.filter((a:any) => a.slug !== this.id);
  //           this.nextthree = this.author_post?.slice(0, 7);
  //           console.log('time',this.nextthree)

  //         } else {
  //           this.author_post = []
  //         }
  //       }, (err) => {
  //         this.author_post = []
  //       })
  //     }

  public createNavigationUrl(type: string) {
    //let shareUrl = 'https://prameya/post/';
    let shareUrl = `${environment.PLATFORM_BASEURL}/post/${this.id}`;
    let searchParams = new URLSearchParams();

    switch (type) {
      case 'facebook':
        searchParams.set('u', shareUrl);
        this.navUrl =
          'https://www.facebook.com/sharer/sharer.php?' + searchParams;
        window.open(this.navUrl);
        break;
      case 'twitter':
        searchParams.set('url', shareUrl);
        this.navUrl = 'https://twitter.com/share?' + searchParams;
        window.open(this.navUrl);
        break;
      case 'whatsapps':
        searchParams.set('url', shareUrl);
        this.navUrl = 'https://api.whatsapp.com/send?text=' + searchParams;
        window.open(this.navUrl);
    }
  }

  getCommentsByPost(post_id: any) {
    this.post
      .getCommentByPost(this.comment_page_no, post_id, environment.CUSTOMER_ID)
      .subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;
            this.comments = data?.map((dt: any) => JSON.parse(dt));
            this.comment_count = this.comments[0].comment_count;
          } else {
            this.comments = [];
          }
        },
        (err) => {
          this.comments = [];
        }
      );
  }

  prevComment() {
    this.comment_page_no = this.comment_page_no - 1;
    this.getCommentsByPost(this.news.id);
  }

  nextComment() {
    this.comment_page_no = this.comment_page_no + 1;
    this.getCommentsByPost(this.news.id);
  }
  // opennewsSec(id: any) {
  //   window.location.href = '/post/' + id;
  // }

  // opennewsSec(id: any) {
  //   this.router.navigate(['/post/' + id]);
  // }
  openUrl(url: any) {
    if (url) {
      window.open(url);
    }
  }

  getAllairticlenews() {
    this.postserviceService.getallairticle().subscribe(
      (res: any) => {
        if (res.code == 'success') {
          this.data = res.body;
          this.data = this.data?.map((dt: any) => JSON.parse(dt));
          this.crimesnews = this.data[0].crime || [];
          this.sportsnews = this.data[0].sports || [];
          this.polticesnews = this.data[0].politics || [];
          this.entermentaarr = this.data[0].entertainment || [];
          console.log(this.entermentaarr, 'data');
        } else {
          this.postarr = [];
        }
      },
      (err) => {
        this.postarr = [];
      }
    );
  }

  updateSEO_Tags() {
    this.Title.setTitle(this.news.post_title);
    let imgURL = this.news.guid;
    let newsTitle = this.news.post_title;
    let newsDesc = this.news.meta_description;
    let postURL = this.news.permalink;
    let tags = [
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:image', content: imgURL },
      { name: 'twitter:title', content: newsTitle },
      { name: 'twitter:description', content: newsDesc },
      { name: 'og:title', content: newsTitle },
      { name: 'og:description', content: newsDesc },
      { name: 'description', content: newsDesc },
      { name: 'og:url', content: postURL },
      { name: 'og:image', content: imgURL },
    ];
    tags.forEach((tag: any) => {
      this.Meta.updateTag(tag);
    });
  }

  // ngAfterViewInit(): void {
  //   $('#carousel-example').on(
  //     'slide.bs.carousel',
  //     function (e: { relatedTarget: any; direction: string }) {
  //       /*
  //         CC 2.0 License Iatek LLC 2018 - Attribution required
  //     */
  //       var $e = $(e.relatedTarget);
  //       var idx = $e.index();
  //       var itemsPerSlide = 5;
  //       var totalItems = $('.carousel-item').length;

  //       if (idx >= totalItems - (itemsPerSlide - 1)) {
  //         var it = itemsPerSlide - (totalItems - idx);
  //         for (var i = 0; i < it; i++) {
  //           // append slides to end
  //           if (e.direction == 'left') {
  //             $('.carousel-item').eq(i).appendTo('.carousel-inner');
  //           } else {
  //             $('.carousel-item').eq(0).appendTo('.carousel-inner');
  //           }
  //         }
  //       }
  //     }
  //   );
  // }
}
