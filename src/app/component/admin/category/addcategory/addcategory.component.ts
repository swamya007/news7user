import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { categoryModel } from 'src/app/models/categorymodel'
import { LoginService } from 'src/app/services/loginService/login.service';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  userFormdata: any = {};
  catid: any = ''
  catarr: any[] = []
  categorySearch: any = '';

  category: any;
  userdata: any
  currentuser: any = {};

  constructor(private spinnerService: LoaderService, private loginService: LoginService, private Categorydata: CategoryServiceService, private notify: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.category = new categoryModel();
    this.currentuser = this.loginService.getCurrentUser();
    this.getallcategory();
  }

  getSlug() {
    this.category.slug = this.category.category_name.replace(/[^\w\s]/gi, "").replaceAll(" ", "-").toLowerCase();
  }

  addcategory(form: any) {
    this.spinnerService.show()

    this.category.createdby = this.currentuser.user_id;
    this.category.flag = 'I';
    this.category.customer_id = this.currentuser.customer_id
    this.category.category_id = null;

    this.Categorydata.createCategory(this.category).subscribe((res: any) => {
      if (res.code === "success") {
        this.spinnerService.hide()

        this.notify.success(res.message);
        this.router.navigate(['/admin/category/view']);
      } else {
        this.notify.error(res.message)
        this.spinnerService.hide()

      }
    }, (err: any) => {
      this.notify.error(err.message)
      this.spinnerService.hide()

    })

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
}
