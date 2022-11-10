import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoginService } from 'src/app/services/loginService/login.service';

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
  constructor(private Categorydata: CategoryServiceService,private router: Router,private loginservice: LoginService) { }
 
  ngOnInit(): void {
    this.currentuser = this.loginservice.getCurrentUser();
    this.getallcategory();
    //this.searchCategory();
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
}
