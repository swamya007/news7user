import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-admin-draft-view',
  templateUrl: './admin-draft-view.component.html',
  styleUrls: ['./admin-draft-view.component.css']
})
export class AdminDraftViewComponent implements OnInit {

  constructor(private userService: UserService, private loginService: LoginService, private viewstag: TagserviceService, private post: PostserviceService, private notify: NotificationService,  private tagserivce: TagserviceService,private router: Router) { }
  post_id: any = ''
  draft_id: any = ''
  post_name: any = ''
  currentuser: any={};
  draftarr: any[] = []
  p: number = 1;
  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getalldrafts();
  }
  getalldrafts() {
    this.post.getDraftDetails(this.draft_id,this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.draftarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.draftarr = []
      }
    }, (err) => {
      this.draftarr = []
    })
  }
  editdraft(draft_id: any) {
    this.router.navigate([`/admin/drafts/edit/${draft_id}`]);
  }
  back(){

    this.router.navigate([`/admin/post/view`]);
  }
}
