import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';
import { UserService } from 'src/app/services/userService/user.service';
import { CommentModalComponent } from './commentModal/comment-modal/comment-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/services/loaderService/loader.service';

@Component({
  selector: 'app-comments-mangement',
  templateUrl: './comments-mangement.component.html',
  styleUrls: ['./comments-mangement.component.css']
})

export class CommentsMangementComponent implements OnInit {

  constructor(private spinnerService: LoaderService,private userService: UserService, private loginService: LoginService, private viewstag: TagserviceService, private post: PostserviceService, private notify: NotificationService, router: Router, private tagserivce: TagserviceService,public dialog: MatDialog) { }
  post_id: any = ''
  post_name: any = ''
  currentuser: any = {};
  postarr: any[] = []
  p: number = 1;
  searchval:any = ''

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getallpost();
  }

  getallpost() {
    this.spinnerService.show()

    this.searchval = ''
    this.post.getPostForManageComments(this.searchval,this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        this.spinnerService.hide()

        var data = res.body;
        console.log(res.body);
        this.postarr = data.map((dt: any) => JSON.parse(dt));
        console.log(this.postarr);
      } else {
        this.postarr = []
        this.spinnerService.hide()

      }
    }, (err) => {
      this.postarr = []
      this.spinnerService.hide()

    })
  }

  searchpost() {
    this.post.getPostForManageComments(this.searchval,this.currentuser.customer_id).subscribe((res: any) => {
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


  openDialog(event:any) {
    const dialogRef = this.dialog.open(CommentModalComponent, {
      height: '95%',
      width: '100%',
      data: {value:event},

    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }
}
