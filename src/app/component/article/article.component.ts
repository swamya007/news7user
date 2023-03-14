import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentModel } from 'src/app/models/commentModel';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';
import { Title, Meta } from '@angular/platform-browser';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
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
  comments: any = [];
  author_post: any = [];
  comment_page_no: number = 1;
  post_page_no: number = 1;
  comment_obj: any;
  comment_count: number = 0;
  navUrl!: string;
  nextthree: any = [];
  cat: any;
  catname: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private notify: NotificationService,
    private post: PostserviceService,
    private adsService: AdserviceService,
    private titleService: Title,
    private spinnerService: LoaderService,
    private meta: Meta,
    private loginservice: LoginService
  ) {
    activatedRoute.params.subscribe((val) => {
      const routeParams = this.activatedRoute.snapshot.paramMap;
      this.id = routeParams.get('Id');
      this.comment_page_no = 1;
      this.post_page_no = 1;
      this.comment_count = 0;
      this.comment_obj = new CommentModel();
      this.getallpost();
      this.getAllAdsList();
      this.getIPAddress();
      this.getBrowserName();
    });
  }
  isLoggedIn = false;

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.id = routeParams.get('Id');
    this.isLoggedIn = this.loginservice.isLoggedIn();
    this.comment_page_no = 1;
    this.post_page_no = 1;
    this.comment_count = 0;
    this.comment_obj = new CommentModel();
    this.getallpost();
    this.getAllAdsList();
    this.getIPAddress();
    this.getBrowserName();
    console.log(this.id, 'lion');
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
      .getPostByCategoryID(1, this.cat, environment.CUSTOMER_ID)
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

  getallpost() {
    this.spinnerService.show();
    this.post.getPostBySlug(this.id, environment.CUSTOMER_ID).subscribe(
      (res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.postarr = data?.map((dt: any) => JSON.parse(dt));
          this.news =
            this.postarr && this.postarr.length ? this.postarr[0] : {};
          if (this.news.tags) {
            this.news.tags = this.news.tags.replaceAll(',', ', ');
          }

          this.titleService.setTitle(this.news.post_title);
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

  opennewsSec(id: any) {
    window.location.href = '/post/' + id;
  }

  openUrl(url: any) {
    if (url) {
      window.open(url);
    }
  }

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
    }
  }
}
