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
  currentuser :any = {}
  catarr: any[] = []
  catadata: any[] = []
  catid: any = ''
  p: number = 1;
  cust_id:any;
  constructor(private Categorydata: CategoryServiceService,private router: Router,private loginservice: LoginService,
    private masterService:MasterServiceService,private notification:NotificationService,private matDialog:MatDialog,private spinnerService: LoaderService) { }
 
  ngOnInit(): void {
    this.currentuser = this.loginservice.getCurrentUser();
    this.getallcategory();
    //this.searchCategory();
    this.cust_id = environment.CUSTOMER_ID;
  }

  getallcategory() {
    this.Categorydata.getAllCategory(this.catid, this.categorySearch,this.currentuser.customer_id).subscribe((res: any) => {
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
    this.Categorydata.getAllCategory('', this.categorySearch,this.currentuser.customer_id).subscribe((res: any) => {
      console.log('hi',this.catid, this.categorySearch,this.currentuser.customer_id)
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));
        console.log('this.catarr===',this.catarr)
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.catarr = []
    })
  }

  onKeydown(event: any) {
    event.preventDefault();
  }
 
  editcat(data: any) {
    localStorage.setItem('data', JSON.stringify(data));
    this.router.navigate([`/admin/category/edit/${data.category_id}`]);
  }

  view(slug:any) {
    this.router.navigate([`/category/${slug}`]);
  }

  deleteCategory(id: any) {
    console.log(id, 'this user is clicked')
      const dialogRef = this.matDialog.open(DeleteConfirmationModalComponent);
      dialogRef.afterClosed().subscribe((result:any) => {      
        if(result){
          this.categoryDelete(id);
        }
      });
      return;
    }
    categoryDelete(id:any){
      this.spinnerService.show()
      var funct = 'CATEGORY';
      this.masterService.bulkDeletion(funct,id,0,this.cust_id).subscribe(res=>{
        if(res.code === "success"){
          this.spinnerService.hide()

          this.notification.success("Category deleted successfully");
         window.location.reload();
        }else {
          this.notification.error(res.message);
          this.spinnerService.hide()

        }
      })
    }
}
