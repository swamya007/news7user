import { Component, OnInit } from '@angular/core';
import { MediaServicesService } from 'src/app/services/media/media-services.service';
import { environment } from 'src/environments/environment';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginService/login.service';
import { DeleteConfirmationModalComponent } from 'src/app/component/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';

@Component({
  selector: 'app-viewmedia',
  templateUrl: './viewmedia.component.html',
  styleUrls: ['./viewmedia.component.css']
})
export class ViewmediaComponent implements OnInit {
  cust_id: any;
  media_id: any;
  media_title: any;
  mediadetails: any;
  gridstatus: Boolean = true
  liststatus: Boolean = false
  viewdata: Boolean = true
  searchvalue: any
  currentuser: any;
  p: number = 1;
  constructor(private mediaservice: MediaServicesService, private router: Router,
    private loginService: LoginService, private matDialog: MatDialog, private masterService: MasterServiceService,
    private notification: NotificationService, private spinnerService: LoaderService) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.cust_id = environment.CUSTOMER_ID
    this.getallmediadetails();
  }

  searchMedia() {
    this.media_id = '';
    this.spinnerService.show()
    if (this.searchvalue) {
      this.mediaservice.getmediaDetails(this.media_id, this.searchvalue, this.cust_id).subscribe((data: any) => {
        this.mediadetails = data.body
        this.spinnerService.hide()
        this.mediadetails = this.mediadetails.map((dt: any) => JSON.parse(dt));
      })
    } else {
      this.spinnerService.hide()
    }
  }

  clear() {
    this.searchvalue = ''
    this.getallmediadetails();
  }

  showGrid() {
    this.gridstatus = true
    this.liststatus = false
    this.viewdata = true
    this.p = 1
  }

  showList() {
    this.gridstatus = false
    this.liststatus = true
    this.viewdata = false
    this.p = 1
  }

  getallmediadetails() {
    this.spinnerService.show()

    this.media_id = '';
    this.media_title = '';
    this.mediaservice.getmediaDetails(this.media_id, this.media_title, this.cust_id).subscribe((data: any) => {
      this.mediadetails = data.body
      this.spinnerService.hide()

      this.mediadetails = this.mediadetails.map((dt: any) => JSON.parse(dt));
      console.log(this.mediadetails)
    })
  }
  editmedia(row: any) {
    localStorage.setItem('row', JSON.stringify(row));
    console.log(row, 'r')
    this.router.navigate([`/admin/media/edit/${row.media_id}`]);

  }
  deleteMedia(data: any) {
    const dialogRef = this.matDialog.open(DeleteConfirmationModalComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.mediaDelete(data);
      }
    });
    return;
  }
  mediaDelete(data: any) {
    this.spinnerService.show()

    data.funct = 'MEDIA';
    data.delete_id = data.media_id;
    this.masterService.deleteMedia(data).subscribe(res => {
      if (res.code === "success") {
        this.spinnerService.hide()

        this.notification.success("Media deleted successfully");
        window.location.reload();
      } else {
        this.notification.error(res.message);
        this.spinnerService.hide()
      }
    })

  }
}
