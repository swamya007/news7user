import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mediamodel } from 'src/app/models/mediamodel';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addmedia',
  templateUrl: './addmedia.component.html',
  styleUrls: ['./addmedia.component.css']
})
export class AddmediaComponent implements OnInit {
  media!: any;
  public files: any[] = [];
  upload_status: Boolean = false
  currentuser: any = {}

  constructor(private masterService: MasterServiceService, private notify: NotificationService,
    private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.media = new mediamodel();
    this.currentuser = this.loginService.getCurrentUser();
  }

  async onFileChangeThroughInputFile(event: any) {

    this.media.mulfile = <File>event.target.files[0];

    let type: any = this.media.mulfile.type;

    if (type === 'image/jpeg' || type === 'image/png') {
      this.media.filetype = 'Image'
      this.upload_status = true
      this.media.media_ext = type.split("/")[1]

      await this.showImage();
    }
    if (type === 'application/pdf') {
      this.media.filetype = 'Document'
      this.upload_status = false
      this.media.media_ext = 'pdf'
    }
    if (type === 'video/mp4') {
      this.media.filetype = 'Video'
      this.upload_status = false
      this.media.media_ext = 'mp4'
    }
    if (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.media.filetype = 'Document'
      this.upload_status = false
      this.media.media_ext = 'xlsx'
    }
    if (type === 'text/plain') {
      this.media.filetype = 'Document'
      this.upload_status = false
      this.media.media_ext = 'txt'
    }

  }

  showImage() {
    setTimeout(() => {
      let media_file: any = document.querySelector('#media_img_id');
      media_file.src = URL.createObjectURL(this.media.mulfile);
    }, 500);
  }

  async onFileChangeDragNDrop(pFileList: File[]) {

    this.media.mulfile = <File>pFileList[0];

    let type: any = this.media.mulfile.type;

    if (type === 'image/jpeg' || type === 'image/png') {
      this.media.filetype = 'Image'
      this.upload_status = true
      this.media.media_ext = type.split("/")[1]

      await this.showImage();
    }
    if (type === 'application/pdf') {
      this.media.filetype = 'Document'
      this.upload_status = false
      this.media.media_ext = 'pdf'
    }
    if (type === 'video/mp4') {
      this.media.filetype = 'Video'
      this.upload_status = false
      this.media.media_ext = 'mp4'
    }
    if (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.media.filetype = 'Document'
      this.upload_status = false
      this.media.media_ext = 'xlsx'
    }
    if (type === 'text/plain') {
      this.media.filetype = 'Document'
      this.upload_status = false
      this.media.media_ext = 'txt'
    }
  }

  uploadFile() {

    var reader = new FileReader();
    reader.readAsDataURL(this.media.mulfile);
    reader.onload = function () {
      // console.log(reader.result);
    };
    this.media.flag = 'I'
    this.media.customer_id = environment.CUSTOMER_ID
    this.media.createdby = this.currentuser.user_id
    setTimeout(() => {
      this.media.base64file = reader.result
      this.masterService.createMedia(this.media).subscribe((res: any) => {
        if (res.code == "success") {
          this.notify.success(res.message);
          this.router.navigate(['/admin/media/view']);
        } else {
          this.notify.error(res.message)
        }
      }, (err: any) => {
        this.notify.error(err.message)
      })
    }, 1000);
  }
  // onfileselectedbanner(event: any) {
  //   this.article.mediathumbnails = <File>event.target.files[0];
  //   let bannerImg!: any;
  //   const URL = window.URL || window.webkitURL;
  //   const Img = new Image();
  //   if ((this.article.mediathumbnails.type != 'image/jpeg') && (this.article.mediathumbnails.type != 'image/png')) {
  //     this.Notification.error('This is not valid file format. Please upload jpg/png file only.');
  //     this.article.mediathumbnails = ''
  //     bannerImg = document.querySelector('#thumbnailImage')
  //     bannerImg.src = 'assets/img/noimg.jpg';
  //     this.artThumbCheck.nativeElement.value = '';
  //   }
  //   else {
  //     Img.src = URL.createObjectURL(this.article.mediathumbnails);
  //     Img.onload = (e: any) => {

  //       const path = e.path || (e.composedPath && e.composedPath());

  //       const height = path[0].height;
  //       const width = path[0].width;
  //       console.log(height, width);
  //       if (height != 600 || width != 1200) {
  //         this.Notification.error('Please choose image with 600 height and 1200 width.');
  //         this.article.mediathumbnails = ''
  //         bannerImg = document.querySelector('#thumbnailImage')
  //         bannerImg.src = 'assets/img/noimg.jpg';
  //         this.artThumbCheck.nativeElement.value = '';
  //       } else {
  //         bannerImg = document.querySelector('#thumbnailImage');
  //         bannerImg.src = URL.createObjectURL(this.article.mediathumbnails);
  //       }
  //     }
  //   }

  // }
}
