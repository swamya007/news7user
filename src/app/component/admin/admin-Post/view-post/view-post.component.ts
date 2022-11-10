import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  constructor(private userService: UserService, private loginService: LoginService, private viewstag: TagserviceService, private post: PostserviceService, private notify: NotificationService,  private tagserivce: TagserviceService,private router: Router) { }
  post_id: any = ''
  post_name: any = ''
  currentuser: any={};
  postarr: any[] = []
  p: number = 1;
  searchval:any
  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getallpost();

  }
  searchPost() {
    this.post.getpostall(this.post_id,this.searchval,this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.postarr = data.map((dt: any) => JSON.parse(dt));
        console.log('this.postarr====',this.postarr)
      } else {
        this.postarr = []
      }
    }, (err) => {
      this.postarr = []
    })
  }

  getallpost() {
    this.post.getpostall(this.post_id,this.post_name,this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.postarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.postarr = []
      }
    }, (err) => {
      this.postarr = []
    })
  }

  editUser(uid: any) {
    this.router.navigate([`/admin/post/edit/${uid}`]);
  }

  viewdraft() {
    this.router.navigate([`/admin/drafts/view`]);
  }
}
