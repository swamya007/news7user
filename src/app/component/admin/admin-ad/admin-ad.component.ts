import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdmodelTopContent } from 'src/app/models/adModel';
import { AdserviceService } from 'src/app/services/Adservice/adservice.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import { News7_CONSTANTS } from 'src/new7constants/new7constants';

@Component({
  selector: 'app-admin-ad',
  templateUrl: './admin-ad.component.html',
  styleUrls: ['./admin-ad.component.css']
})
export class AdminAdComponent implements OnInit {

  @ViewChild('artThumbCheckTopSec')
  artThumbCheckTopSec!: ElementRef;
  @ViewChild('artThumbCheckRightUpperSec')
  artThumbCheckRightUpperSec!: ElementRef;
  @ViewChild('artThumbCheckLeftMiddleSec')
  artThumbCheckLeftMiddleSec!: ElementRef;
  @ViewChild('artThumbCheckMiddleSec')
  artThumbCheckMiddleSec!: ElementRef;

  adsizelist: any = []
  currentuser: any = {}
  username: any

  constructor(private spinnerService: LoaderService,private masterService: MasterServiceService, private loginService: LoginService, private Notification: NotificationService, private router: Router, private notify: NotificationService, private adsservice: AdserviceService) { }

  adstopsec: any
  adsrightuppersec: any
  adsleftmiddlesec: any
  adsmiddlesec: any
  ngOnInit(): void {

    this.adstopsec = new AdmodelTopContent()
    this.adsrightuppersec = new AdmodelTopContent()
    this.adsleftmiddlesec = new AdmodelTopContent()
    this.adsmiddlesec = new AdmodelTopContent()
    this.currentuser = this.loginService.getCurrentUser();
    this.username = this.currentuser.user_nicename;
    this.getAdsSizeList();
  }

  getAdsSizeList() {
    this.masterService.getDropDownList(News7_CONSTANTS.LOOKUPS.adsize, environment.CUSTOMER_ID).subscribe((res: any) => {
      this.adsizelist = res.body;
    })
  }

  onfileselectedtopsec(event: any) {
    this.adstopsec.ads_mulfile = <File>event.target.files[0];

    this.adstopsec.ads_ext = this.adstopsec.ads_mulfile.type.split("/")[1]

    let bannerImg!: any;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    if ((this.adstopsec.ads_mulfile.type != 'image/jpeg') && (this.adstopsec.ads_mulfile.type != 'image/png')) {
      this.Notification.error('This is not valid file format. Please upload jpg/png file only.');
      this.adstopsec.ads_mulfile = ''
      bannerImg = document.querySelector('#thumbnailImage_topsec')
      bannerImg.src = 'assets/img/no-img.png';
      this.artThumbCheckTopSec.nativeElement.value = '';
    } else {
      Img.src = URL.createObjectURL(this.adstopsec.ads_mulfile);
      Img.onload = (e: any) => {

        const path = e.path || (e.composedPath && e.composedPath());

        const height = path[0].height;
        const width = path[0].width;
        console.log(height, width);
        if (height != 250 || width != 970) {
          this.Notification.error('Please choose image with given height and width which mentioned above.');
          this.adstopsec.ads_mulfile = ''
          bannerImg = document.querySelector('#thumbnailImage_topsec')
          bannerImg.src = 'assets/img/no-img.png';
          this.artThumbCheckTopSec.nativeElement.value = '';
        } else {
          bannerImg = document.querySelector('#thumbnailImage_topsec');
          bannerImg.src = URL.createObjectURL(this.adstopsec.ads_mulfile);
        }
      }
    }
  }

  onfileselectedrightuppersec(event: any) {
    this.adsrightuppersec.ads_mulfile = <File>event.target.files[0];

    this.adsrightuppersec.ads_ext = this.adsrightuppersec.ads_mulfile.type.split("/")[1]

    let bannerImg!: any;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    if ((this.adsrightuppersec.ads_mulfile.type != 'image/jpeg') && (this.adsrightuppersec.ads_mulfile.type != 'image/png')) {
      this.Notification.error('This is not valid file format. Please upload jpg/png file only.');
      this.adsrightuppersec.ads_mulfile = ''
      bannerImg = document.querySelector('#thumbnailImage_rightuppersec')
      bannerImg.src = 'assets/img/no-img.png';
      this.artThumbCheckRightUpperSec.nativeElement.value = '';
    } else {
      Img.src = URL.createObjectURL(this.adsrightuppersec.ads_mulfile);
      Img.onload = (e: any) => {

        const path = e.path || (e.composedPath && e.composedPath());

        const height = path[0].height;
        const width = path[0].width;
        console.log(height, width);
        if (height != 200 || width != 300) {
          this.Notification.error('Please choose image with given height and width which mentioned above.');
          this.adsrightuppersec.ads_mulfile = ''
          bannerImg = document.querySelector('#thumbnailImage_rightuppersec')
          bannerImg.src = 'assets/img/no-img.png';
          this.artThumbCheckRightUpperSec.nativeElement.value = '';
        } else {
          bannerImg = document.querySelector('#thumbnailImage_rightuppersec');
          bannerImg.src = URL.createObjectURL(this.adsrightuppersec.ads_mulfile);
        }
      }
    }
  }

  onfileselectedleftmiddlesec(event: any) {
    this.adsleftmiddlesec.ads_mulfile = <File>event.target.files[0];

    this.adsleftmiddlesec.ads_ext = this.adsleftmiddlesec.ads_mulfile.type.split("/")[1]

    let bannerImg!: any;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    if ((this.adsleftmiddlesec.ads_mulfile.type != 'image/jpeg') && (this.adsleftmiddlesec.ads_mulfile.type != 'image/png')) {
      this.Notification.error('This is not valid file format. Please upload jpg/png file only.');
      this.adsleftmiddlesec.ads_mulfile = ''
      bannerImg = document.querySelector('#thumbnailImage_leftmiddlesec')
      bannerImg.src = 'assets/img/no-img.png';
      this.artThumbCheckLeftMiddleSec.nativeElement.value = '';
    } else {
      Img.src = URL.createObjectURL(this.adsleftmiddlesec.ads_mulfile);
      Img.onload = (e: any) => {

        const path = e.path || (e.composedPath && e.composedPath());

        const height = path[0].height;
        const width = path[0].width;
        console.log(height, width);
        if (height != 600 || width != 300) {
          this.Notification.error('Please choose image with given height and width which mentioned above.');
          this.adsleftmiddlesec.ads_mulfile = ''
          bannerImg = document.querySelector('#thumbnailImage_leftmiddlesec')
          bannerImg.src = 'assets/img/no-img.png';
          this.artThumbCheckLeftMiddleSec.nativeElement.value = '';
        } else {
          bannerImg = document.querySelector('#thumbnailImage_leftmiddlesec');
          bannerImg.src = URL.createObjectURL(this.adsleftmiddlesec.ads_mulfile);
        }
      }
    }
  }

  onfileselectedmiddlesec(event: any) {
    this.adsmiddlesec.ads_mulfile = <File>event.target.files[0];

    this.adsmiddlesec.ads_ext = this.adsmiddlesec.ads_mulfile.type.split("/")[1]

    let bannerImg!: any;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    if ((this.adsmiddlesec.ads_mulfile.type != 'image/jpeg') && (this.adsmiddlesec.ads_mulfile.type != 'image/png')) {
      this.Notification.error('This is not valid file format. Please upload jpg/png file only.');
      this.adsmiddlesec.ads_mulfile = ''
      bannerImg = document.querySelector('#thumbnailImage_middlesec')
      bannerImg.src = 'assets/img/no-img.png';
      this.artThumbCheckMiddleSec.nativeElement.value = '';
    } else {
      Img.src = URL.createObjectURL(this.adsmiddlesec.ads_mulfile);
      Img.onload = (e: any) => {

        const path = e.path || (e.composedPath && e.composedPath());

        const height = path[0].height;
        const width = path[0].width;
        console.log(height, width);
        if (height != 90 || width != 728) {
          this.Notification.error('Please choose image with given height and width which mentioned above.');
          this.adsmiddlesec.ads_mulfile = ''
          bannerImg = document.querySelector('#thumbnailImage_middlesec')
          bannerImg.src = 'assets/img/no-img.png';
          this.artThumbCheckMiddleSec.nativeElement.value = '';
        } else {
          bannerImg = document.querySelector('#thumbnailImage_middlesec');
          bannerImg.src = URL.createObjectURL(this.adsmiddlesec.ads_mulfile);
        }
      }
    }
  }


  /*** Add Part  ***/

  addtopsec() {
    this.spinnerService.show()

    var reader = new FileReader();
    reader.readAsDataURL(this.adstopsec.ads_mulfile);
    reader.onload = function () {
      
    };

    this.adstopsec.ads_img_size = '1';
    this.adstopsec.flag = 'I';
    this.adstopsec.customer_id = environment.CUSTOMER_ID;
    this.adstopsec.createdby = this.currentuser.user_id
    this.adstopsec.ads_published_by = this.currentuser.user_id
    
    setTimeout(() => {
      this.adstopsec.base64file = reader.result
      console.log(this.adstopsec, 'dd')
      this.adsservice.addAd(this.adstopsec).subscribe((res: any) => {
        if (res.code === "success") {
          this.spinnerService.hide()
          this.notify.success(res.message);
          this.router.navigate(['/admin/ads/view']);
        } else {
          this.notify.error(res.message)
        }
      }, (err: any) => {
        this.notify.error(err.message)
      })
    }, 1000);
  }

  addrightuppersec() {
    this.spinnerService.show()

    var reader = new FileReader();
    reader.readAsDataURL(this.adsrightuppersec.ads_mulfile);
    reader.onload = function () {
      
    };

    this.adsrightuppersec.ads_img_size = '2';
    this.adsrightuppersec.flag = 'I';
    this.adsrightuppersec.customer_id = environment.CUSTOMER_ID;
    this.adsrightuppersec.createdby = this.currentuser.user_id
    this.adsrightuppersec.ads_published_by = this.currentuser.user_id
    
    setTimeout(() => {
      this.adsrightuppersec.base64file = reader.result
      console.log(this.adsrightuppersec, 'dd')
      this.adsservice.addAd(this.adsrightuppersec).subscribe((res: any) => {
        if (res.code === "success") {
          this.spinnerService.hide()

          this.notify.success(res.message);
          this.router.navigate(['/admin/ads/view']);
        } else {
          this.notify.error(res.message)
        }
      }, (err: any) => {
        this.notify.error(err.message)
      })
    }, 1000);
  }

  addleftmiddlesec() {
    this.spinnerService.show()

    var reader = new FileReader();
    reader.readAsDataURL(this.adsleftmiddlesec.ads_mulfile);
    reader.onload = function () {
      
    };

    this.adsleftmiddlesec.ads_img_size = '3';
    this.adsleftmiddlesec.flag = 'I';
    this.adsleftmiddlesec.customer_id = environment.CUSTOMER_ID;
    this.adsleftmiddlesec.createdby = this.currentuser.user_id
    this.adsleftmiddlesec.ads_published_by = this.currentuser.user_id

    setTimeout(() => {
      this.adsleftmiddlesec.base64file = reader.result
      console.log(this.adsleftmiddlesec, 'dd')
      this.adsservice.addAd(this.adsleftmiddlesec).subscribe((res: any) => {
        if (res.code === "success") {
          this.spinnerService.hide()

          this.notify.success(res.message);
          this.router.navigate(['/admin/ads/view']);
        } else {
          this.notify.error(res.message)
        }
      }, (err: any) => {
        this.notify.error(err.message)
      })
    }, 1000);
  }

  addmiddlesec() {
    this.spinnerService.show()


    var reader = new FileReader();
    reader.readAsDataURL(this.adsmiddlesec.ads_mulfile);
    reader.onload = function () {
      
    };

    this.adsmiddlesec.ads_img_size = '4';
    this.adsmiddlesec.flag = 'I';
    this.adsmiddlesec.customer_id = environment.CUSTOMER_ID;
    this.adsmiddlesec.createdby = this.currentuser.user_id
    this.adsmiddlesec.ads_published_by = this.currentuser.user_id

    setTimeout(() => {
      this.adsmiddlesec.base64file = reader.result
      console.log(this.adsmiddlesec, 'dd')
      this.adsservice.addAd(this.adsmiddlesec).subscribe((res: any) => {
        if (res.code === "success") {
          this.spinnerService.hide()

          this.notify.success(res.message);
          this.router.navigate(['/admin/ads/view']);
        } else {
          this.notify.error(res.message)
          this.spinnerService.hide()

        }
      }, (err: any) => {
        this.notify.error(err.message)
        this.spinnerService.hide()

      })
    }, 1000);
  }
}
