import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { ModeluserDetails } from 'src/app/models/modeluserdetails';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/userService/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  role: any = []
  userData = new ModeluserDetails();
  hide = false;
  isChecked: Boolean = false

  dropdownSettings: IDropdownSettings = {};
  currentuser: any = {};

  constructor(private userService: UserService, private router: Router, private loginService:LoginService,
    private notify: NotificationService, private masterService: MasterServiceService) { }

  ngOnInit(): void {
   
    this.currentuser = this.loginService.getCurrentUser();
    this.getRoles();
    this.userData.customer_id = this.currentuser.customer_id

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'role',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1000,
      allowSearchFilter: true
    };
  }

  generatePassword() {
    this.userData.user_pass = this.masterService.makeRandom(10);
  }

  onChange(ob: MatCheckboxChange) {
    if (ob.checked) {
      this.userData.user_notification = 'Y'
    } else {
      this.userData.user_notification = 'N'
    }
  }

  getRoles() {
    this.masterService.getRoles(this.currentuser.customer_id).subscribe((res: any) => {
      this.role = res.body;
      this.role = this.role.map((g: string) => JSON.parse(g));
    })
  }

  userFormData(form: any) {
    this.userData.user_status = 1;
    this.userData.flag = 'I';
    this.userData.customer_id = 2;
    let roles = '';
    if(this.userData.role !== null && this.userData.role !== undefined && this.userData.role !== '') {
      var result = this.userData?.role?.map(function(val: any) {
        return val.id;
      }).join(',');
      roles = result;
    }
    const payload = { ...this.userData, role: roles};
    this.userService.createUser(payload).subscribe((res: any) => {
      if (res.code == "success") {
        this.notify.success(res.message);
        form.reset();
        this.router.navigate(['/admin/user/view']);
      } else {
        this.notify.error(res.message);
        // this.userData.role = [];
      }
    }, (err: any) => {
      this.notify.error(err.message)
      // this.userData.role = [];
    })
  }

}
