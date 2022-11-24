import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tagModel } from 'src/app/models/tagModel';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {

  constructor(private spinnerService: LoaderService,private tagserivce : TagserviceService,private router:Router,private activatedRoute: ActivatedRoute,private notify: NotificationService) { }

  updattags = new tagModel()
  ngOnInit(): void {
    this.updattags = JSON.parse(localStorage.getItem('data') || "");

  }

  getSlug() {
    this.updattags.slug = this.updattags.tag_name.replace(/[^\w\s]/gi, "").replaceAll(" ", "-").toLowerCase();
  }

  updatetag() {
    this.spinnerService.show()
    this.updattags.flag = 'U';
    this.updattags.customer_id = environment.CUSTOMER_ID
    this.tagserivce.addnewtag(this.updattags).subscribe((res: any) => {
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
