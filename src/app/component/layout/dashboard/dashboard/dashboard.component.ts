import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommentModalComponent } from 'src/app/component/admin/comments-mangement/commentModal/comment-modal/comment-modal.component';
import { postModel } from 'src/app/models/postModel';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  draft: any;
  cust_id: any;
  currentuser: any;
  draft_id: any = '';
  draftarr: any = [];
  dashboardarr: any = [];
  postarr: any = [];
  publishingarr: any = [];
  publishedarr: any = [];
  commentarr: any = [];
  constructor(private loginService: LoginService, private draftService: PostserviceService,
    private notification: NotificationService, private masterService: MasterServiceService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cust_id = environment.CUSTOMER_ID
    this.currentuser = this.loginService.getCurrentUser();
    this.draft = new postModel();
    this.getDraftAll();
    this.getDashboardCount();
    this.getLatestNews();
    this.getPublishingDetails();
    this.getPublishedDetails();
    this.getCommentDetails();
  }
  saveDraft() {
    if (!this.draft.post_title) {
      this.notification.error("Enter post title");
      return;
    }
    if (!this.draft.post_content) {
      this.notification.error("Enter post content");
      return;
    }
    this.draft.customer_id = this.cust_id;
    this.draft.flag = 'I';
    this.draftService.draftpost(this.draft).subscribe(res => {
      if (res.code == "success") {
        this.notification.success(res.message);
        window.location.reload();
      } else {
        this.notification.error(res.message)
      }
    }, (err: any) => {
      this.notification.error(err.message)
    })
  }

  getDraftAll() {
    this.draftService.getDraftDetails(this.currentuser.user_id, this.draft_id, this.cust_id, '').subscribe(res => {
      if (res.code == 'success') {
        var data = res.body;
        this.draftarr = data.map((dt: any) => JSON.parse(dt));
        this.draftarr = this.draftarr.slice(0, 3);
      } else {
        this.draftarr = []
      }
    }, (err) => {
      this.draftarr = []
    })
  }
  getDashboardCount() {
    this.masterService.getDashboardCount(this.cust_id).subscribe(res => {
      if (res.code == 'success') {
        var data = res.body;
        this.dashboardarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.dashboardarr = []
      }
    }, (err) => {
      this.dashboardarr = []
    })
  }
  getLatestNews() {
    this.draftService.getLatestNews(1, environment.CUSTOMER_ID, '').subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.postarr = data.map((dt: any) => JSON.parse(dt));
        this.postarr = this.postarr.slice(0, 7);
      } else {
        this.postarr = []
      }
    }, (err: any) => {
      this.postarr = []
    })
  }
  getPublishingDetails() {
    this.masterService.getPublishingDetails(this.cust_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.publishingarr = data.map((dt: any) => JSON.parse(dt));
        this.publishingarr = this.publishingarr.slice(0, 3);
      } else {
        this.publishingarr = []
      }
    }, (err: any) => {
      this.publishingarr = []
    })
  }
  getPublishedDetails() {
    this.masterService.getPublishedDetails(this.cust_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.publishedarr = data.map((dt: any) => JSON.parse(dt));
        this.publishedarr = this.publishedarr.slice(0, 3);
      } else {
        this.publishedarr = []
      }
    }, (err: any) => {
      this.publishedarr = []
    })
  }
  getCommentDetails() {
    this.masterService.getCommentDetails(this.cust_id).subscribe(res => {
      if (res.code == 'success') {
        var data = res.body;
        this.commentarr = data.map((dt: any) => JSON.parse(dt));
        this.commentarr = this.commentarr.slice(0, 3);
      } else {
        this.commentarr = []
      }
    }, (err: any) => {
      this.commentarr = []
    })
  }
  opennewsSec(slug: any) {
    this.router.navigate(['/post/' + slug]);
  }
  editdraft(draft_id: any) {
    this.router.navigate([`/admin/drafts/edit/${draft_id}`]);
  }
  viewdraft() {
    this.router.navigate([`/admin/drafts/view`]);
  }
  openDialog(event: any) {
    const dialogRef = this.dialog.open(CommentModalComponent, {
      height: '95%',
      width: '100%',
      data: { value: event },

    });
  }
  viewMore() {
    this.router.navigate([`/admin/post/view`]);
  }
  formatAMPM(dt: any) {

    if (dt) {
      var split_data = dt.split(" ");
      var dt1 = split_data[0]
      var time = ''
      if (split_data.length > 1) {
        time = split_data[1]
      } else {
        time = '00:00'
      }

      dt = dt1 + " " + time

      var date = new Date(dt);
      var hours = date.getHours();
      var minutes: any = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    } else {
      return '00:00 AM';
    }


  }
}
