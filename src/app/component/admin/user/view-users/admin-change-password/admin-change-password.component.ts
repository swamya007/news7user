import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModeluserDetails } from 'src/app/models/modeluserdetails';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {

  user:any = new ModeluserDetails()
  currentuser:any = {}

  constructor(public dialogRef: MatDialogRef<AdminChangePasswordComponent>,
    private notify:NotificationService,private userService:UserService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser()
  }

  changePassword() {
    if(this.user.user_login === null || this.user.user_login === '' || this.user.user_login === undefined) {
      this.notify.error("Please input username");
      return
    }
    if(this.user.user_email === null || this.user.user_email === '' || this.user.user_email === undefined) {
      this.notify.error("Please input user email");
      return
    }
    if(this.user.user_email) {
      var mail_format = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
      if (!this.user.user_email.match(mail_format)) {
        this.notify.error('Please input valid email')
        return
      }
    }
    if(this.user.user_pass === null || this.user.user_pass === '' || this.user.user_pass === undefined) {
      this.notify.error("Please input password");
      return
    }

    this.user.customer_id = this.currentuser.customer_id
    this.userService.updatePassword(this.user).subscribe((res: any) => {
      if (res.code == "success") {
        this.notify.success(res.message);
        this.close()
      } else {
        this.notify.error(res.message);
      }
      
    }, (err: any) => {
      this.notify.error(err.message)
    })
  }

  close() {
    this.dialogRef.close()
  }

}
