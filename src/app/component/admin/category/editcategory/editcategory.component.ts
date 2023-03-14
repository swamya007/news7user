import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryModel } from 'src/app/models/categorymodel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css'],
})
export class EditcategoryComponent implements OnInit {
  categorySearch: any = '';
  catid: any;
  updatecat = new categoryModel();

  catarr: any[] = [];
  currentuser: any = {};

  constructor(
    private spinnerService: LoaderService,
    private Categorydata: CategoryServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    this.updatecat = JSON.parse(localStorage.getItem('data') || '');
    this.updatecat.parent_category = parseInt(this.updatecat.parent_category);
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.catid = Number(routeParams.get('id'));
    this.getallcategory();
  }

  getSlug() {
    this.updatecat.slug = this.updatecat.category_name
      .replace(/[^\w\s]/gi, '')
      .replaceAll(' ', '-')
      .toLowerCase();
  }

  updatecategory() {
    this.spinnerService.show();

    this.updatecat.createdby = this.currentuser.user_id;
    this.updatecat.flag = 'U';

    this.Categorydata.createCategory(this.updatecat).subscribe(
      (res: any) => {
        if (res.code == 'success') {
          this.spinnerService.hide();

          this.notify.success('Category updated successfully');
          this.router.navigate(['/admin/category/view']);
        } else {
          this.notify.error(res.message);
          this.spinnerService.hide();
        }
      },
      (err: any) => {
        this.notify.error(err.message);
        this.spinnerService.hide();
      }
    );
  }

  getallcategory() {
    this.Categorydata.getAllCategory(
      '',
      '',
      this.currentuser.customer_id
    ).subscribe(
      (res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.catarr = data.map((dt: any) => JSON.parse(dt));
        } else {
          this.catarr = [];
        }
      },
      (err) => {
        this.catarr = [];
      }
    );
  }
}
