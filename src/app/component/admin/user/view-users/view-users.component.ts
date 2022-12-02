import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/component/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/userService/user.service';
import { environment } from 'src/environments/environment';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  alltournment: any
  allUser: any[] = []
  uid: any = ''
  status: any
  role: any
  customerId: any
  lan: any
  p: number = 1;
  userData: any
  cust_id: any
  usersearch: any
  rolesearch: any = ''
  constructor(private userService: UserService, private router: Router, private masterService: MasterServiceService,
    private matDialog: MatDialog, private notification: NotificationService, private spinnerService: LoaderService) { }

  ngOnInit(): void {
    this.cust_id = environment.CUSTOMER_ID
    this.getalluser();
    this.getRoles();
  }

  getRoles() {
    this.masterService.getRoles(this.cust_id).subscribe((res: any) => {
      this.role = res.body;
      this.role = this.role.map((g: string) => JSON.parse(g));
    })
  }

  getalluser() {
    this.spinnerService.show()
    this.userService.getUserDetails('', this.uid, this.cust_id, 'N').subscribe((data: any) => {
      this.allUser = data.body
      this.spinnerService.hide()
      this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
    })
  }

  onKeydown(event: any) {
    event.preventDefault();
  }

  searchUser() {
    this.rolesearch = ''
    this.spinnerService.show()
    this.userService.getUserDetails(this.usersearch, '', this.cust_id, 'N').subscribe((data: any) => {
      if (data.code == 'success') {
        this.allUser = data.body;
        this.spinnerService.hide()
        this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
      } else {
        this.allUser = []
        this.spinnerService.hide()
      }
    }, (err) => {
      this.allUser = []
      this.spinnerService.hide()
    })

  }

  searchRole() {
    this.usersearch = ''
    this.spinnerService.show()
    this.userService.getUserDetails(this.rolesearch, '', this.cust_id, 'R').subscribe((data: any) => {
      if (data.code == 'success') {
        this.allUser = data.body;
        this.spinnerService.hide()
        this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
      } else {
        this.allUser = []
        this.spinnerService.hide()
      }
    }, (err) => {
      this.allUser = []
      this.spinnerService.hide()
    })
  }

  openDialog() {
    const dialogRef1 = this.matDialog.open(AdminChangePasswordComponent,{width: '350px'});
  }

  editUser(uid: any) {
    this.router.navigate([`/admin/user/edit/${uid}`]);
  }

  deleteUser(uid: any) {
    const dialogRef = this.matDialog.open(DeleteConfirmationModalComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.userDelete(uid);
      }
    });
    return;
  }
  userDelete(uid: any) {
    var funct = 'USER';
    this.spinnerService.show()
    this.masterService.bulkDeletion(funct, uid, 0, this.cust_id).subscribe(res => {
      if (res.code === "success") {
        this.notification.success("User deleted successfully");
        //  window.location.reload();
        this.getalluser();
        this.spinnerService.hide()
      } else {
        this.notification.error(res.message);
        this.spinnerService.hide()
      }
    })
  }

}


