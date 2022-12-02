import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mediamodel } from 'src/app/models/mediamodel';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from 'src/environments/environment';
import {
  DataUrl,
  DOC_ORIENTATION,
  NgxImageCompressService,
  UploadResponse,
} from 'ngx-image-compress';
@Component({
  selector: 'app-addmedia',
  templateUrl: './addmedia.component.html',
  styleUrls: ['./addmedia.component.css']
})
export class AddmediaComponent implements OnInit {
  imgResultAfterCompress: DataUrl = '';
  media!: any;
  public files: any[] = [];
  upload_status: Boolean = false
  cropimage: Boolean = false
  currentuser: any = {}
  imgResultBeforeCompress:any;
  sizeOfOriginalImage!:number;
  sizeOFCompressedImage!:number;
  localCompressedURl:any;
  file: any;
  localUrl: any;
  fileName!:string;
  beforecompressed:boolean = false;
  aftercompressed:boolean = false;
  constructor(private spinnerService: LoaderService, private masterService: MasterServiceService, private notify: NotificationService,
    private router: Router, private loginService: LoginService, private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {
    this.media = new mediamodel();
    this.currentuser = this.loginService.getCurrentUser();
  }

  async onFileChangeThroughInputFile(event: any) {
    this.media.mulfile = <File>event.target.files[0];
    this.imgResultBeforeCompress = this.media.mulfile;
    let type: any = this.media.mulfile.type;
    this.fileName = this.media.mulfile['name'];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    } 
    if (type === 'image/jpeg' || type === 'image/png') {
      this.media.filetype = 'Image'
      this.upload_status = true
      this.cropimage = true
      this.media.media_ext = type.split("/")[1]
      await this.showImage();
    }
    if (type === 'application/pdf') {
      this.media.filetype = 'Document'
      this.upload_status = false
      this.cropimage = false
      this.media.media_ext = 'pdf'
    }
    if (type === 'video/mp4') {
      this.media.filetype = 'Video'
      this.upload_status = false
      this.cropimage = false
      this.media.media_ext = 'mp4'
    }
    if (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.media.filetype = 'Document'
      this.upload_status = false
      this.cropimage = false
      this.media.media_ext = 'xlsx'
    }
    if (type === 'text/plain') {
      this.media.filetype = 'Document'
      this.upload_status = false
      this.cropimage = false
      this.media.media_ext = 'txt'
    }
  }

  showImage() {
    setTimeout(() => {
      let media_file: any = document.querySelector('#media_img_id');
      media_file.src = URL.createObjectURL(this.media.mulfile);
      console.log(this.media, 'type')
    }, 500);
  }

  async onFileChangeDragNDrop(pFileList: File[]) {
    this.media.mulfile = <File>pFileList[0];
    let type: any = this.media.mulfile.type;
    this.imgResultBeforeCompress = this.media.mulfile;
    this.fileName = this.media.mulfile['name'];
    if (pFileList && pFileList[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      reader.readAsDataURL(pFileList[0]);
    }
    if (type === 'image/jpeg' || type === 'image/png') {
      this.media.filetype = 'Image'
      this.upload_status = true
      this.cropimage = true
      this.media.media_ext = type.split("/")[1]
      await this.showImage();
    }
    if (type === 'application/pdf') {
      this.media.filetype = 'Document'
      this.upload_status = false
      this.cropimage = false
      this.media.media_ext = 'pdf'
    }
    if (type === 'video/mp4') {
      this.media.filetype = 'Video'
      this.upload_status = false
      this.cropimage = false
      this.media.media_ext = 'mp4'
    }
    if (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.media.filetype = 'Document'
      this.upload_status = false
      this.cropimage = false
      this.media.media_ext = 'xlsx'
    }
    if (type === 'text/plain') {
      this.media.filetype = 'Document'
      this.upload_status = false
      this.cropimage = false
      this.media.media_ext = 'txt'
    }
  }

  uploadImgType:any;
  uploadFile() {
    this.spinnerService.show()
    var reader = new FileReader();
    reader.readAsDataURL(this.media.mulfile);
    reader.onload = function () {
      // console.log(reader.result);
    };
    this.media.flag = 'I'    
    this.media.customer_id = environment.CUSTOMER_ID
    this.media.createdby = this.currentuser.user_id
    console.log(this.media);
    setTimeout(() => {
      if (this.uploadImgType === 'compressed') {
        this.media.base64file = this.imgResultAfterCompress;
      } else {
        this.media.base64file = reader.result;
      }
      this.masterService.createMedia(this.media).subscribe((res: any) => {
        if (res.code == "success") {
          this.spinnerService.hide()
          this.notify.success(res.message);
          this.router.navigate(['/admin/media/view']);
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

  compress() {
    this.compressFile(this.localUrl, this.fileName);
  }

  compressFile(image: string,fileName: any) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1024*1024);
      console.warn('Size in bytes is now:',  this.sizeOfOriginalImage);
      
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1024*1024)
          console.warn('Size in bytes after compression:',  this.sizeOFCompressedImage);
          // create file from byte
          const imageName = fileName;
          // call method that creates a blob from dataUri
          const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
          const imageFile = new File([result], imageName, { type: 'image/jpeg' });
          console.log("file size:",imageFile['size']/(1024*1024));
        }
      );
    }

    dataURItoBlob(dataURI:any) {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });    
      return blob;
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
  