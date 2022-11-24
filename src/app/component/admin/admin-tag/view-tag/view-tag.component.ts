import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/component/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-tag',
  templateUrl: './view-tag.component.html',
  styleUrls: ['./view-tag.component.css']
})
export class ViewTagComponent implements OnInit {

  constructor( private viewstag : TagserviceService,private router: Router,
    private matDialog:MatDialog,private notification:NotificationService,
    private masterService:MasterServiceService,private spinnerService: LoaderService) { }
  tagarray: any[] = []
  tagid:any=''
  tag_name:any = ''
  cust_id:any
  tagSearch: any = '';
  p: number = 1;
  ngOnInit(): void {
    this.cust_id = environment.CUSTOMER_ID
    this.getalltag()
  }

  onKeydown(event: any) {
    event.preventDefault();
  }

  getalltag() {

    this.spinnerService.show()
    this.viewstag.getalltag(this.tagid,this.tag_name,this.cust_id).subscribe((res: any) => {
      if (res.code == 'success') {
        this.spinnerService.hide()

        var data = res.body;
        this.tagarray = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.tagarray = []
        this.spinnerService.hide()

      }
    }, (err) => {
      this.tagarray = []
      this.spinnerService.hide()

    })
  }

  edittag(data:any){
    localStorage.setItem('data', JSON.stringify(data));
    this.router.navigate([`/admin/tag/edit/${data.tag_id}`]);
  }
  
  searchtag() {
    this.viewstag.getalltag(this.tagid, this.tagSearch,this.cust_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.tagarray = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.tagarray = []
      }
    }, (err) => {
      this.tagarray = []
    })
  }
  deleteTag(id:any){
    console.log(id, 'this user is clicked')
      const dialogRef = this.matDialog.open(DeleteConfirmationModalComponent);
      dialogRef.afterClosed().subscribe((result:any) => {      
        if(result){
          this.tagDelete(id);
        }
      });
      return;
  }
  tagDelete(id:any){
    var funct = 'TAG';
    this.masterService.bulkDeletion(funct,id,0,this.cust_id).subscribe(res=>{
      if(res.code === "success"){
        this.notification.success("Tag deleted successfully");
       window.location.reload();
      }else {
        this.notification.error(res.message);
      }
    })
  }
}
