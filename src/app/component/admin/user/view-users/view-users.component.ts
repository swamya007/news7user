import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { UserService } from 'src/app/services/userService/user.service';
import { environment } from 'src/environments/environment';

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
  constructor(private userService: UserService, private router: Router, private masterService: MasterServiceService) { }

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
    this.userService.getUserDetails('', this.uid, this.cust_id, 'N').subscribe((data: any) => {
      this.allUser = data.body
      this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
    })
  }

  onKeydown(event: any) {
    event.preventDefault();
  }

  searchUser() {
    this.rolesearch = ''
    this.userService.getUserDetails(this.usersearch, '', this.cust_id, 'N').subscribe((data: any) => {
      if (data.code == 'success') {
        this.allUser = data.body;
        this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
      } else {
        this.allUser = []
      }
    }, (err) => {
      this.allUser = []
    })

  }

  searchRole() {
    this.usersearch = ''
    this.userService.getUserDetails(this.rolesearch, '', this.cust_id, 'R').subscribe((data: any) => {
      if (data.code == 'success') {
        this.allUser = data.body;
        this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
      } else {
        this.allUser = []
      }
    }, (err) => {
      this.allUser = []
    })
  }

  editUser(uid: any) {
    this.router.navigate([`/admin/user/edit/${uid}`]);
  }

  deleteUser(uid: any) {
    console.log(uid, 'this user is clicked')
  }



}
