import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/component/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
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

  constructor(private userService: UserService, private loginService: LoginService,
     private viewstag: TagserviceService, private post: PostserviceService, 
     private notify: NotificationService,  private tagserivce: TagserviceService,
     private router: Router,private masterService: MasterServiceService,private matDialog: MatDialog,private spinnerService: LoaderService) { }
  post_id: any = ''
  draft_id: any = ''
  post_name: any = ''
  currentuser: any={};
  draftarr: any[] = []
  p: number = 1;
  searchval:any
  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.getalldrafts();
  }
  searchPost() {
    if(this.searchval) {
      this.post.getDraftDetails(this.currentuser.user_id,this.draft_id,this.currentuser.customer_id,this.searchval).subscribe((res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.draftarr = data.map((dt: any) => JSON.parse(dt));
          console.log('this.postarr====',this.draftarr)
        } else {
          this.draftarr = []
        }
      }, (err) => {
        this.draftarr = []
      })
    }
  }
  getalldrafts() {
    this.spinnerService.show()

    this.searchval = ''
    this.post.getDraftDetails(this.currentuser.user_id,this.draft_id,this.currentuser.customer_id,'').subscribe((res: any) => {
      if (res.code == 'success') {
        this.spinnerService.hide()

        var data = res.body;
        this.draftarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.draftarr = []
        this.spinnerService.hide()

      }
    }, (err) => {
      this.draftarr = []
      this.spinnerService.hide()

    })
  }
  editdraft(draft_id: any) {
    this.router.navigate([`/admin/drafts/edit/${draft_id}`]);
  }
  back(){

    this.router.navigate([`/admin/post/view`]);
  }
  deleteDraft(id:any){
    const dialogRef = this.matDialog.open(DeleteConfirmationModalComponent);
    dialogRef.afterClosed().subscribe((result:any) => {      
      if(result){
        this.draftDelete(id);
      }
    });
    return;
  }
  draftDelete(id:any){
    this.spinnerService.show()

    var funct = 'DRAFT';
    this.masterService.bulkDeletion(funct,id,0,this.currentuser.customer_id).subscribe(res=>{
      if(res.code === "success"){
        this.spinnerService.hide()

        this.notify.success("Draft deleted successfully");
       window.location.reload();
      }else {
        this.notify.error(res.message);
        this.spinnerService.hide()

      }
    })
  }
}