import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification/notification.service';
import { UserService } from '../services/userService/user.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent implements OnInit {
  verify_user: any = {};
  otpis: any;
  isverified: boolean = false;
  display: boolean = false;
  constructor(
    private notify: NotificationService,
    private userservic: UserService
  ) {}

  ngOnInit(): void {}
  verifyuser() {
    console.log(this.verify_user.otp);
    if (!this.verify_user.otp) {
      this.notify.error('please enter OTP');
      return;
    } else {
      if (this.verify_user.otp == this.otpis) {
        this.isverified = true;
        this.notify.success('User Verified Successfully');
      } else {
        this.notify.success('User Not verified');
      }
    }
  }
  sendotp() {
    if (!this.verify_user.username) {
      this.notify.error('please enter UserName');
      return;
    }
    this.userservic
      .forgetpassword({ key: this.verify_user.username })
      .subscribe(
        (res) => {
          if (res.code == 'success') {
            this.notify.success('Your OTP is : ' + res.body.code);
            this.display = true;
            this.otpis = res.body.code;
          } else {
            this.notify.error(res.message);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  changepass() {}
}
