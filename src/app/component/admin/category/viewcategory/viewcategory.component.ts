import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/component/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {
  categorySearch: any = '';
  currentuser: any = {}
  catarr: any = []
  catadata: any[] = []
  catid: any = ''
  p: number = 1;
  cust_id: any;
  checkedList: any = [];
  selectedAll!: boolean;
  constructor(private Categorydata: CategoryServiceService, private router: Router, private loginservice: LoginService,
    private masterService: MasterServiceService, private notification: NotificationService, private matDialog: MatDialog, private spinnerService: LoaderService) { }

  ngOnInit(): void {
    this.selectedAll = false;
    this.currentuser = this.loginservice.getCurrentUser();
    this.getallcategory();
    //this.searchCategory();
    this.cust_id = environment.CUSTOMER_ID;
  }

  getallcategory() {
    this.Categorydata.getAllCategory(this.catid, this.categorySearch, this.currentuser.customer_id).subscribe((res: any) => {
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

  searchCategory() {
    this.spinnerService.show()
    this.Categorydata.getAllCategory('', this.categorySearch, this.currentuser.customer_id).subscribe((res: any) => {
      console.log('hi', this.catid, this.categorySearch, this.currentuser.customer_id)
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));
        this.spinnerService.hide()
      } else {
        this.catarr = []
        this.spinnerService.hide()
      }
    }, (err) => {
      this.catarr = []
      this.spinnerService.hide()
    })
  }

  onKeydown(event: any) {
    event.preventDefault();
  }

  editcat(data: any) {
    localStorage.setItem('data', JSON.stringify(data));
    this.router.navigate([`/admin/category/edit/${data.category_id}`]);
  }

  view(slug: any) {
    this.router.navigate([`/category/${slug}`]);
  }

  deleteCategory(id: any) {
    console.log(id, 'this user is clicked')
    const dialogRef = this.matDialog.open(DeleteConfirmationModalComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.categoryDelete(id);
      }
    });
    return;
  }

  // checkUncheckAll() {
  //   for (var i = 0; i < this.catarr.length; i++) {
  //     this.catarr[i].isSelected = this.masterSelected;
  //   }
  // }

  // checkIfAllSelected(info: any) {
  //   this.masterSelected = this.catarr.every(function (item: any) {
  //     return item.isSelected == true;
  //   })
  // }



  deletetours() {

    var funct = 'CATEGORY';
    const exampleModal = document.getElementById('exampleModal');
    // this.checkedList = [];
    for (let i = 0; i < this.catarr.length; i++) {
      if (this.catarr[i].selected) {
        this.checkedList.push(this.catarr[i].category_id);
      }
    }
    console.log(this.checkedList, 'dd')
    if (this.checkedList.length == 0) {
      this.notification.error('Please select ');
      this.spinnerService.hide();
      return;
    }

    this.masterService.bulkDeletion(funct, this.checkedList, 0, this.currentuser.customer_id)
      .subscribe(
        (res: any) => {
          this.checkedList = [];
          if (res.code === 'success') {
            this.spinnerService.hide();
            this.notification.success(' deletion successful');

            this.getallcategory();
          } else {
            this.spinnerService.hide();
            this.notification.error(res.message);
          }
        },
        (err: any) => {
          this.spinnerService.hide();
          this.notification.error(err.message);
        }
      );

    if (exampleModal) {
      exampleModal.style.display = 'none';
    }
  }

  redirectfn() {
    const exampleModal = document.getElementById('exampleModal');
    for (let i = 0; i < this.catarr.length; i++) {
      if (this.catarr[i].selected)
        this.checkedList.push(this.catarr[i].category_id);
    }

    if (this.checkedList.length == 0) {
      this.notification.error('Please select atleast one .');
    }

    if (this.checkedList.length != 0) {
      if (exampleModal) {
        exampleModal.style.display = 'inline';
      }
    }
  }
  cancelfn() {
    const exampleModal = document.getElementById('exampleModal');

    if (exampleModal) {
      exampleModal.style.display = 'none';
    }
  }

  categoryDelete(id: any) {
    this.spinnerService.show()
    var funct = 'CATEGORY';
    this.checkedList = []
    for (var i = 0; i < this.catarr.length; i++) {
      if (this.catarr[i].isSelected)
        this.checkedList.push(this.catarr[i].uid);
    }
    this.masterService.bulkDeletion(funct, id, 0, this.cust_id).subscribe(res => {
      if (res.code === "success") {
        this.spinnerService.hide()

        this.notification.success("Category deleted successfully");
        window.location.reload();
      } else {
        this.notification.error(res.message);
        this.spinnerService.hide()

      }
    })
  }


}
