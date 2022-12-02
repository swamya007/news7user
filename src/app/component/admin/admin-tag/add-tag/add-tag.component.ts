import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tagModel } from 'src/app/models/tagModel';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {

  constructor(private spinnerService: LoaderService,private loginService: LoginService, private notify: NotificationService,private router:Router,private tagserivce : TagserviceService,) { }
  tag: any
  
  currentuser: any = {};
  ngOnInit(): void {
    this.tag = new tagModel()
    
  }

  getSlug() {
    this.tag.slug = this.tag.tag_name.replace(/[^\w\s]/gi, "").replaceAll(" ", "-").toLowerCase();
  }

  addtag() {
    this.spinnerService.show()

    this.tag.createdby = this.currentuser.user_id;
    this.tag.flag = 'I';
    this.tag.tag_id = null;
    this.tag.customer_id = 1
    
    this.tagserivce.addnewtag(this.tag).subscribe((res: any) => {
      if (res.code == "success") {
        this.spinnerService.hide()

        this.notify.success(res.message);
        
        this.router.navigate(['/admin/tag/view']);
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
