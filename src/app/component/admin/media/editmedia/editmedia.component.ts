import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mediamodel } from 'src/app/models/mediamodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editmedia',
  templateUrl: './editmedia.component.html',
  styleUrls: ['./editmedia.component.css']
})
export class EditmediaComponent implements OnInit {
  media_id: any
  updatemedia = new mediamodel();
  catarr: any;
  currentuser: any = {}
  imageBase64: any

  constructor(private spinnerService: LoaderService, private masterService: MasterServiceService, private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginService, private notify: NotificationService) {

  }

  aspectRatio: number = 5 / 4;
  croppedImage: any = '';

  imageCroppedBase64(image: any) {
    this.croppedImage = image;
  }

  private toDataURL(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  reset() {
    location.reload()
  }

  fullImage() {
    let that = this;
    this.toDataURL(this.updatemedia.media_url, function (dataUrl: any) {
      that.croppedImage = dataUrl;
    })
  }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.updatemedia = JSON.parse(localStorage.getItem('row') || "");

    let that = this;
    this.toDataURL(this.updatemedia.media_url, function (dataUrl: any) {
      that.imageBase64 = dataUrl;
    })
    setTimeout(() => {
      this.imageCroppedBase64(that.imageBase64)
    }, 800);
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.media_id = Number(routeParams.get('id'));
  }

  copyToClipboard() {
    // Get the text field
    var copyText: any = document.getElementById("media_url");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  }

  updateMedia() {
    this.spinnerService.show()

    this.updatemedia.base64file = this.croppedImage
    this.updatemedia.flag = 'U'
    this.updatemedia.customer_id = environment.CUSTOMER_ID
    this.updatemedia.createdby = this.currentuser.user_id
    this.updatemedia.filetype = 'Image'
    this.updatemedia.media_ext = this.croppedImage.split(";")[0].split("data:image/")[1];

    this.masterService.createMedia(this.updatemedia).subscribe((res: any) => {
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
  }

}
