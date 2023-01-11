import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from 'src/app/component/common/delete-confirmation-modal/delete-confirmation-modal.component';
import { postModel } from 'src/app/models/postModel';
import { tagModel } from 'src/app/models/tagModel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';
import { UserService } from 'src/app/services/userService/user.service';
import { environment } from 'src/environments/environment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  tag: any;
  author: any;

  constructor(private userService: UserService, private loginService: LoginService, private viewstag: TagserviceService, private post: PostserviceService, private notify: NotificationService,
    private tagserivce: TagserviceService, private router: Router, private matDialog: MatDialog,
    private masterService: MasterServiceService, private notification: NotificationService, private spinnerService: LoaderService, private Categorydata: CategoryServiceService) { }
  post_id: any = ''
  post_name: any = ''
  currentuser: any = {};
  postarr: any = []
  p: number = 1;
  searchval: any
  catarr: any = []
  categorysearch: any = ''
  authorsearch: any = ''
  yearSearch: any = ''
  author_id!: any
  selectedAll!: boolean;
  checkedList: any = [];
  updatepost: any = {}
  tagarray: any[] = []
  tagid: any = ''
  tag_name: any = ''
  allUser:any[] = []
  monthSearch:any = ''
  dateSearch:any
  month = [
    {
      name: "January",
      val: 1
    },
    {
      name: "February",
      val: 2
    },
    {
      name: "March",
      val: 3
    },
    {
      name: "April",
      val: 4
    },
    {
      name: "May",
      val: 5
    },
    {
      name: "June",
      val: 6
    },
    {
      name: "July",
      val: 7
    },
    {
      name: "August",
      val: 81
    },
    {
      name: "September",
      val: 9
    },
    {
      name: "October",
      val: 10
    },
    {
      name: "November",
      val: 11
    },
    {
      name: "December",
      val: 12
    }
  ]
  year = [
    {
      name: "2022",
      val: 2022
    },
    {
      name: "2021",
      val: 2021
    },
    {
      name: "2020",
      val: 2020
    },{
      name: "2019",
      val: 2019
    }
  ];
  ngOnInit(): void {
    this.selectedAll = false;
    this.currentuser = this.loginService.getCurrentUser();
    this.getallpost();
    this.getallcategory()
    this.updatepost = new postModel()
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'tag_id',
      textField: 'tag_name',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1000,
      allowSearchFilter: true
    };
    this.dropdownSettingsCat = {
      singleSelection: false,
      idField: 'category_id',
      textField: 'category_name',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1000,
      allowSearchFilter: true
    };
    this.tag = new tagModel()
    this.author = this.currentuser.user_id;
    this.updatepost.post_author = this.author;
    this.getalluser()
  }

  postbyauthor() {
    this.spinnerService.show()

    this.author_id = this.currentuser.user_id

    this.post.getPostByAuthor(this.author_id, this.post_id, this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        this.spinnerService.hide()

        var data = res.body;
        this.postarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.postarr = []
        this.spinnerService.hide()

      }
    }, (err) => {
      this.postarr = []
      this.spinnerService.hide()
    })

  }

  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsCat: IDropdownSettings = {};
  searchCategory() {

    if (this.categorysearch != '') {
      this.post.getPostByCategoryID('', this.categorysearch, this.currentuser.customer_id).subscribe((res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.postarr = data.map((dt: any) => JSON.parse(dt));
          console.log('this.postarr====', this.postarr)
        } else {
          this.postarr = []
        }
      }, (err) => {
        this.postarr = []
      })
    } else {
      this.getallpost();
    }

  }

  searchByValue(type:any) {
    this.spinnerService.show()
    var valuefor = ''
    if(type === 'DATE') {
      this.authorsearch = ''
      this.yearSearch = ''
      this.monthSearch = ''
      valuefor = this.dateSearch
    }
    if(type === 'AUTHOR') {
      this.dateSearch = ''
      this.yearSearch = ''
      this.monthSearch = ''
      valuefor = this.authorsearch
    }
    if(type == 'YEAR') {
      this.dateSearch = ''
      this.authorsearch = ''
      valuefor = this.yearSearch
    }
    if(type == 'MONTH') {
      this.dateSearch = ''
      this.authorsearch = ''
      valuefor = this.monthSearch
    }
    if(this.yearSearch && this.monthSearch) {
      type = 'COMBINED'
      valuefor = this.yearSearch+"-"+this.monthSearch
    }

    if(valuefor) {
      this.post.getPostBySearchVal(type,valuefor,this.currentuser.customer_id).subscribe((res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.postarr = data.map((dt: any) => JSON.parse(dt));
          this.spinnerService.hide()
        } else {
          this.postarr = []
          this.spinnerService.hide()
        }
      }, (err) => {
        this.postarr = []
        this.spinnerService.hide()
      })
    } else {
      this.spinnerService.hide()
    }
    
  }
 
  searchbyauthor() {
    this.spinnerService.show()
    this.post.getPostByAuthor(this.authorsearch, this.post_id, this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        this.spinnerService.hide()
        var data = res.body;
        this.postarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.postarr = []
        this.spinnerService.hide()
      }
    }, (err) => {
      this.postarr = []
      this.spinnerService.hide()
    })

  }
  getallcategory1() {
    this.Categorydata.getAllCategory('', '', this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));

        if (this.updatepost.category !== null && this.updatepost.category !== undefined) {
          let arr: any = [];
          let split_arr = this.updatepost.category.split(",");
          for (var i = 0; i < split_arr.length; i++) {
            let obj: any = {};
            obj.category_id = parseInt(split_arr[i]);
            arr.push(obj)
          }
          let value = this.catarr.filter((d: any) => arr.map((v: any) => v.category_id).includes(d.category_id));
          this.updatepost.category = value;
        }
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.catarr = []
    })
  }

  getallcategory() {
    this.Categorydata.getAllCategory('', '', this.currentuser.customer_id).subscribe((res: any) => {
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
  searchPost() {
    if (this.searchval) {
      this.post.getpostall(this.post_id, this.searchval, this.currentuser.customer_id).subscribe((res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.postarr = data.map((dt: any) => JSON.parse(dt));
        } else {
          this.postarr = []
        }
      }, (err) => {
        this.postarr = []
      })
    }
  }

  getallpost() {
    this.dateSearch = ''
    this.authorsearch = ''
    this.yearSearch = ''
    this.monthSearch = ''
    this.post.getpostall(this.post_id, this.post_name, this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.postarr = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.postarr = []
      }
    }, (err) => {
      this.postarr = []
    })
  }

  editPost(uid: any) {
    this.router.navigate([`/admin/post/edit/${uid}`]);
  }

  viewdraft() {
    this.router.navigate([`/admin/drafts/view`]);
  }
  deletePost(id: any) {
    const dialogRef = this.matDialog.open(DeleteConfirmationModalComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.postDelete(id);
      }
    });
    return;
  }
  postDelete(id: any) {
    var funct = 'POST';
    this.masterService.bulkDeletion(funct, id, 0, this.currentuser.customer_id).subscribe(res => {
      if (res.code === "success") {
        this.notification.success("Post deleted successfully");
        window.location.reload();
      } else {
        this.notification.error(res.message);
      }
    })
  }
  selectAll() {
    for (let i = 0; i < this.postarr.length; i++) {
      this.postarr[i].selected = this.selectedAll;
    }
  }

  getallpostedit() {
    this.spinnerService.show()
    this.post.getpostall(this.updatepost.post_id, this.post_name, this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        this.spinnerService.hide()

        var data = res.body;
        this.postarr = data.map((dt: any) => JSON.parse(dt));
        this.updatepost = this.postarr && this.postarr.length ?
          this.postarr[0] : {};
        this.updatepost.post_author = parseInt(this.updatepost.post_author)
        this.updatepost.author_name = this.updatepost.post_author

        this.updatepost.immidiate_publish = this.updatepost.post_immidiate_publish;
        this.updatepost.visibility = this.updatepost.post_visibility;

        if (this.updatepost.post_date) {
          var split_data = this.updatepost.post_date.split(" ");
          this.updatepost.post_date = split_data[0]
          if (split_data.length > 1) {
            this.updatepost.post_time = split_data[1]
          } else {
            this.updatepost.post_time = '00:00'
          }
        }

        this.getallcategory();
        this.getalltag();

      } else {
        this.postarr = []
        this.spinnerService.hide()

      }
    }, (err) => {
      this.postarr = []
      this.spinnerService.hide()

    })
  }
  getalltag() {
    this.viewstag.getalltag(this.tagid, this.tag_name, this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.tagarray = data.map((dt: any) => JSON.parse(dt));

        if (this.updatepost.tags !== null && this.updatepost.tags !== undefined) {
          let arr: any = [];
          let split_arr = this.updatepost.tags.split(",");
          for (var i = 0; i < split_arr.length; i++) {
            let obj: any = {};
            obj.tag_name = split_arr[i];
            arr.push(obj)
          }
          let value = this.tagarray.filter((d: any) => arr.map((v: any) => v.tag_name).includes(d.tag_name));
          this.updatepost.tags = value;
        }
      } else {
        this.tagarray = []
      }
    }, (err) => {
      this.tagarray = []
    })
  }
  quickedit(data: any) {
    const exampleModal1 = document.getElementById('quickeditModal');
    if (exampleModal1) exampleModal1.click();
    this.updatepost = data
    if(this.updatepost.post_author) {
      this.updatepost.post_author = parseInt(this.updatepost.post_author)
    }
    if(this.updatepost.post_date) {
      var data = this.updatepost.post_date.split(" ");
      this.updatepost.post_date = data[0];
      if(data[1]) {
        this.updatepost.post_time = data[1].substring(0, 5);
      } else {
        this.updatepost.post_time = '00:00'
      }
    }
    this.getallcategory1()
    this.getalluser()
    this.getalltag()
  }
  getalluser() {
    this.userService.getUserDetails('', '', this.currentuser.customer_id, 'N').subscribe((data: any) => {
      this.allUser = data.body
      this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
    })
  }
  modifypost() {
    this.spinnerService.show()

    this.updatepost.createdby = this.currentuser.user_id;
    this.updatepost.flag = 'U';
    this.updatepost.tag_id = null;
    if (this.updatepost.post_mime_type) {
      this.updatepost.media_ext = this.updatepost.post_mime_type.split("/")[1];
    }

    if (this.updatepost.category !== null && this.updatepost.category !== undefined && this.updatepost.category !== '') {
      var result = this.updatepost.category.map(function (val: any) {
        return val.category_id;
      }).join(',');
      this.updatepost.category = result;
    }

    if (this.updatepost.tags !== null && this.updatepost.tags !== undefined && this.updatepost.tags !== '') {
      var result = this.updatepost.tags.map(function (val: any) {
        return val.tag_name;
      }).join(',');
      this.updatepost.addtags = result;
    }

    if (this.updatepost.Multiimage) {

      var reader = new FileReader();
      reader.readAsDataURL(this.updatepost.Multiimage)
      reader.onload = function () {

      };
    }

    if (this.updatepost.post_date) {
      if (this.updatepost.post_time) {
        this.updatepost.post_date = this.updatepost.post_date + " " + this.updatepost.post_time;
      } else {
        this.updatepost.post_date = this.updatepost.post_date + " 00:00";
      }
    }

    setTimeout(() => {
      if (this.updatepost.Multiimage) {
        this.updatepost.base64file = reader.result
      } else {
        if (this.updatepost.guid) {
          this.updatepost.post_img = this.updatepost.guid;
        }
      }

      this.post.addpost(this.updatepost).subscribe((res: any) => {
        if (res.code == "success") {
          this.spinnerService.hide()

          this.notify.success('Post updated successfully');
          location.reload();
        } else {
          this.notify.error(res.message)
          this.spinnerService.hide()
          if (this.updatepost.category !== null && this.updatepost.category !== undefined) {
            let arr: any = [];
            let split_arr = this.updatepost.category.split(",");
            for (var i = 0; i < split_arr.length; i++) {
              let obj: any = {};
              obj.category_id = parseInt(split_arr[i]);
              arr.push(obj)
            }
            let value = this.catarr.filter((d: any) => arr.map((v: any) => v.category_id).includes(d.category_id));
            this.updatepost.category = value;
          }

          if (this.updatepost.addtags !== null && this.updatepost.addtags !== undefined) {
            let arr: any = [];
            let split_arr = this.updatepost.addtags.split(",");
            for (var i = 0; i < split_arr.length; i++) {
              let obj: any = {};
              obj.tag_name = split_arr[i];
              arr.push(obj)
            }
            let value = this.tagarray.filter((d: any) => arr.map((v: any) => v.tag_name).includes(d.tag_name));
            this.updatepost.addtags = value;
          }
        }
      }, (err: any) => {
        this.notify.error(err.message)
        this.spinnerService.hide()
        if (this.updatepost.category !== null && this.updatepost.category !== undefined) {
          let arr: any = [];
          let split_arr = this.updatepost.category.split(",");
          for (var i = 0; i < split_arr.length; i++) {
            let obj: any = {};
            obj.category_id = parseInt(split_arr[i]);
            arr.push(obj)
          }
          let value = this.catarr.filter((d: any) => arr.map((v: any) => v.category_id).includes(d.category_id));
          this.updatepost.category = value;
        }

        if (this.updatepost.addtags !== null && this.updatepost.addtags !== undefined) {
          let arr: any = [];
          let split_arr = this.updatepost.addtags.split(",");
          for (var i = 0; i < split_arr.length; i++) {
            let obj: any = {};
            obj.tag_name = split_arr[i];
            arr.push(obj)
          }
          let value = this.tagarray.filter((d: any) => arr.map((v: any) => v.tag_name).includes(d.tag_name));
          this.updatepost.tags = value;
        }
      })
    }, 1000)
  }
  redirectfn() {
    const exampleModal = document.getElementById('exampleModal');
    this.checkedList = [];
    console.log(this.checkedList)
    for (let i = 0; i < this.postarr.length; i++) {
      if (this.postarr[i].selected)
        this.checkedList.push(this.postarr[i].id);
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
  redirectfntred() {
    const exampleModaltred = document.getElementById('exampleModaltred');
    this.checkedList = [];
  
    for (let i = 0; i < this.postarr.length; i++) {
      if (this.postarr[i].selected)
        this.checkedList.push(this.postarr[i].id);
    }
    console.log(this.checkedList)
    if (this.checkedList.length == 0) {
      this.notification.error('Please select atleast one .');
    }

    if (this.checkedList.length != 0) {
      if (exampleModaltred) {
        exampleModaltred.style.display = 'inline';
      }
    }
  }

  addFeaturedsilder(){
    var funct = 'POST';
    const exampleModalnew = document.getElementById('exampleModalnew');
    this.spinnerService.show();
    this.checkedList = [];
    for (let i = 0; i < this.postarr.length; i++) {
      if (this.postarr[i].selected) {
        this.checkedList.push(this.postarr[i].id);
      }
    }
    if (this.checkedList.length == 0) {
      this.notification.error('Please select ');
      this.spinnerService.hide();
      return;
    }

    this.masterService.addtoslider(this.checkedList?.join(','), this.currentuser.customer_id)
      .subscribe(
        (res: any) => {
          this.checkedList = [];
          if (res.code === 'success') {
            this.spinnerService.hide();
            this.notification.success(' successful');

            this.getallpost();
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

    if (exampleModalnew) {
      exampleModalnew.style.display = 'none';
    }
  }
  



  refirectfn(){
    const exampleModalnew = document.getElementById('exampleModalnew');
    this.checkedList = [];
  
    for (let i = 0; i < this.postarr.length; i++) {
      if (this.postarr[i].selected)
        this.checkedList.push(this.postarr[i].id);
    }
    console.log(this.checkedList)
    if (this.checkedList.length == 0) {
      this.notification.error('Please select atleast one .');
    }

    if (this.checkedList.length != 0) {
      if (exampleModalnew) {
        exampleModalnew.style.display = 'inline';
      }
    }
  }

  cancelfn() {
    const exampleModal = document.getElementById('exampleModal');

    if (exampleModal) {
      exampleModal.style.display = 'none';
    }
  }


  cancel(){
    const exampleModalnew = document.getElementById('exampleModalnew');

    if (exampleModalnew) {
      exampleModalnew.style.display = 'none';
    }
  }
  cancelfntred() {
    const exampleModaltred = document.getElementById('exampleModaltred');

    if (exampleModaltred) {
      exampleModaltred.style.display = 'none';
    }
  }
  deletetours() {

    var funct = 'POST';
    const exampleModal = document.getElementById('exampleModal');
    this.spinnerService.show();
    this.checkedList = [];
    for (let i = 0; i < this.postarr.length; i++) {
      if (this.postarr[i].selected) {
        this.checkedList.push(this.postarr[i].id);
      }
    }
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

            this.getallpost();
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
  trending(){
    this.router.navigate(['/admin/post/trending']);

  }

  addtrending() {

    var funct = 'POST';
    const exampleModaltred = document.getElementById('exampleModaltred');
    this.spinnerService.show();
    this.checkedList = [];
    for (let i = 0; i < this.postarr.length; i++) {
      if (this.postarr[i].selected) {
        this.checkedList.push(this.postarr[i].id);
      }
    }
    if (this.checkedList.length == 0) {
      this.notification.error('Please select ');
      this.spinnerService.hide();
      return;
    }

    this.masterService.addtotrending(this.checkedList?.join(','), this.currentuser.customer_id)
      .subscribe(
        (res: any) => {
          this.checkedList = [];
          if (res.code === 'success') {
            this.spinnerService.hide();
            this.notification.success(' successful');

            this.getallpost();
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

    if (exampleModaltred) {
      exampleModaltred.style.display = 'none';
    }
  }
}
