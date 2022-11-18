import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/component/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';
import { UserService } from 'src/app/services/userService/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  constructor(private userService: UserService, private loginService: LoginService, private viewstag: TagserviceService, private post: PostserviceService, private notify: NotificationService,
      private tagserivce: TagserviceService,private router: Router,private matDialog:MatDialog,
      private masterService: MasterServiceService,private notification:NotificationService,private Categorydata:CategoryServiceService) { }
  post_id: any = ''
  post_name: any = ''
  currentuser: any={};
  postarr: any[] = []
  p: number = 1;
  searchval:any
  catarr:any = []
  categorysearch:any = ''
  author_id!:any
  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getallpost();
    this.getallcategory()
  }

postbyauthor(){
this.author_id=this.currentuser.user_id

    this.post.getPostByAuthor(this.author_id,this.post_id,this.currentuser.customer_id).subscribe((res: any) => {
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


  searchCategory() {

    if(this.categorysearch != ''){
      this.post.getPostByCategoryID('',this.categorysearch,this.currentuser.customer_id).subscribe((res: any) => {
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
    } else {
      this.getallpost();
    }
    
  }
  getallcategory() {
    this.Categorydata.getAllCategory('', '',this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.catarr = []
    })
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
  deletePost(id:any){
    const dialogRef = this.matDialog.open(DeleteConfirmationModalComponent);
    dialogRef.afterClosed().subscribe((result:any) => {      
      if(result){
        this.postDelete(id);
      }
    });
    return;
  }
  postDelete(id:any){
    var funct = 'POST';
    this.masterService.bulkDeletion(funct,id,0,this.currentuser.customer_id).subscribe(res=>{
      if(res.code === "success"){
        this.notification.success("Post deleted successfully");
        window.location.reload();
      }else {
        this.notification.error(res.message);
      }
    })
  }
}
