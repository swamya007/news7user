import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentModel } from 'src/app/models/commentModel';
import { postModel } from 'src/app/models/postModel';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent implements OnInit {
  content: any
  comment:any
  post_content: any
  id: any
  post_id: any = ''
  post_name: any = ''
  currentuser: any = {};
  postarr: any[] = []

  comment_page_no: number = 1
  comments: any = []
  comment_count: number = 0

  masterSelected: boolean = false;
  selectedAll: any;

  constructor(public dialogRef: MatDialogRef<CommentModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private post: PostserviceService, 
  private loginService: LoginService,private notify:NotificationService) { }

  ngOnInit(): void {
    this.content = new postModel()
    this.comment = new CommentModel()
    this.currentuser = this.loginService.getCurrentUser();
    this.id = this.data.id;
    this.content = this.data.value
    this.getCommentsByPost(this.content.id)
  }

  selectAll() {
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].comment_approved === 'N') {
        this.comments[i].selected = this.selectedAll;
      }
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.comments.every(function (item: any) {
      return item.selected == true;
    })
  }

  approveComments() {
    this.comment.comment_post_id = this.comments[0].comment_post_id
    this.comment.customer_id = this.comments[0].customer_id
    this.comment.flag = 'A'
    this.comment.comment_ids = this.comments.filter((v: any) => v.selected).map(function (val: any) {
      return val.comment_id;
    }).join(',');
    console.log('this.comment===',this.comment)
    this.post.savePostComment(this.comment).subscribe((res: any) => {
      if (res.code == "success") {
        this.notify.success("Comment approved successfully")
        this.getCommentsByPost(this.content.id);
      } else {
        this.notify.error(res.message)
      }
    }, (err: any) => {
      this.notify.error(err.message)
    })
  }

  getCommentsByPost(post_id: any) {
    this.post.getCommentByPost(0, post_id, environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.comments = data?.map((dt: any) => JSON.parse(dt));
        this.comment_count = this.comments[0].comment_count
      } else {
        this.comments = []
      }
    }, (err) => {
      this.comments = []
    })
  }


}
