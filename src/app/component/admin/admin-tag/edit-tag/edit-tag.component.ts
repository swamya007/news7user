import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tagModel } from 'src/app/models/tagModel';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {

  constructor(private tagserivce : TagserviceService,private router:Router,private activatedRoute: ActivatedRoute,private notify: NotificationService) { }

  updattags = new tagModel()
  ngOnInit(): void {
    this.updattags = JSON.parse(localStorage.getItem('data') || "");

  }

  getSlug() {
    this.updattags.slug = this.updattags.tag_name.replace(/[^\w\s]/gi, "").replaceAll(" ", "-").toLowerCase();
  }

  updatetag() {
    
    this.updattags.flag = 'U';
    this.updattags.customer_id = 1
    this.tagserivce.addnewtag(this.updattags).subscribe((res: any) => {
      if (res.code == "success") {
        this.notify.success(res.message);
        this.router.navigate(['/admin/tag/view']);
      } else {
        this.notify.error(res.message)
      }
    }, (err: any) => {
      this.notify.error(err.message)
    })

  }
}
