import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { postModel } from 'src/app/models/postModel';
import { tagModel } from 'src/app/models/tagModel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';
import { UserService } from 'src/app/services/userService/user.service';
import { environment } from 'src/environments/environment';
import { ChoosemediaComponent } from '../choosemedia/choosemedia.component';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  filetype: any
  tagid: any = ''
  tag_name: any = ''
  cust_id: any
  ckeConfig: any
  mycontent: any
  dataList: any = [];
  tagarray: any[] = []
  comment_status!: boolean
  postupdate: any = {}

  postarr = []
  currentuser: any = {};
  @ViewChild("myckeditor") ckeditor: any;
  @ViewChild('tourBanner')
  tourBanner!: ElementRef;
  allUser: any;
  author: any;
  post_name: any = ''
  tag: any
  checkedval: boolean = true
  catarr: any = []
  pid: any
  updatepost: any = {}

  list = [
    { "name": "Yes", "key": "opened", "checked": true },
    { "name": "No", "key": "closed", "checked": false }
  ]

  list1 = [
    { "name": "Yes", "key": "1", "checked": false },
    { "name": "No", "key": "2", "checked": true }
  ]

  constructor(private userService: UserService, private loginService: LoginService,
    private viewstag: TagserviceService, private post: PostserviceService,
    private notify: NotificationService, private router: Router, private tagserivce: TagserviceService,
    private categoryService: CategoryServiceService, public dialog: MatDialog, private activatedRoute: ActivatedRoute,private spinnerService: LoaderService) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.pid = Number(routeParams.get('id'));
    this.cust_id = environment.CUSTOMER_ID
    this.currentuser = this.loginService.getCurrentUser();

    this.updatepost = new postModel()

    this.getalluser();
    this.getallpost();

    this.checkedval = true

    this.ckeConfig = {
      extraPlugins:
        "easyimage,dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,clipboard," +
        "button,panelbutton,panel,floatpanel,colorbutton,colordialog,menu," +
        "contextmenu,dialogadvtab,div,elementspath,enterkey,entities,popup," +
        "filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo," +
        "font,format,forms,horizontalrule,htmlwriter,iframe,image,indent," +
        "indentblock,indentlist,justify,link,list,liststyle,magicline," +
        "maximize,newpage,pagebreak,pastefromword,pastetext,preview,print," +
        "removeformat,resize,save,menubutton,scayt,selectall,showblocks," +
        "showborders,smiley,sourcearea,specialchar,stylescombo,tab,table," +
        "tabletools,templates,toolbar,undo,wysiwygarea"
    };

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
  }

  getallcategory() {
    this.categoryService.getAllCategory('', '', this.currentuser.customer_id).subscribe((res: any) => {
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

  getSlug() {
    this.updatepost.slug = this.updatepost.post_title.replace(/[^\w\s]/gi, "").replaceAll(" ", "-").toLowerCase();
    this.updatepost.permalink = environment.POST_URL + this.updatepost.slug;
  }

  onFilterChange(event: any) {
    const re = RegExp(`.*${event.target.value.toLowerCase().split('').join('.*')}.*`)
    const matches = this.tagarray.filter((v: any) => v.tag_name.toLowerCase().match(re))

    if (matches.length === 0) {
      this.tag.createdby = this.currentuser.user_id;
      this.tag.flag = 'I';
      this.tag.tag_id = null;
      this.tag.tag_name = event.target.value;
      this.tag.customer_id = environment.CUSTOMER_ID

      this.tagserivce.addnewtag(this.tag).subscribe((res: any) => {
        if (res.code == "success") {
          this.getalltag()
          this.dropdownSettings = {
            singleSelection: false,
            idField: 'tag_id',
            textField: 'tag_name',
            selectAllText: 'Select All',
            unSelectAllText: 'Unselect All',
            itemsShowLimit: 1000,
            allowSearchFilter: true
          };
        } else {
          this.notify.error(res.message)
        }
      }, (err: any) => {
        this.notify.error(err.message)
      })
    }
  }

  getalluser() {
    this.userService.getUserDetails('', '', this.currentuser.customer_id, 'N').subscribe((data: any) => {
      this.allUser = data.body
      this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
    })
  }

  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsCat: IDropdownSettings = {};

  getalltag() {
    this.viewstag.getalltag(this.tagid, this.tag_name, this.cust_id).subscribe((res: any) => {
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

  getallpost() {
    this.spinnerService.show()
    this.post.getpostall(this.pid, this.post_name, this.currentuser.customer_id).subscribe((res: any) => {
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

        if(this.updatepost.post_date) {
          var split_data = this.updatepost.post_date.split(" ");
          this.updatepost.post_date = split_data[0]
          if(split_data.length > 1) {
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

  onfileselected(event: any) {
    this.updatepost.Multiimage = <File>event.target.files[0];
    let postImg!: any;
    if ((this.updatepost.Multiimage.type != 'image/jpeg') && (this.updatepost.Multiimage.type != 'image/png')) {
      // this.Notification.error('This is not valid file format. Please upload jpg/png file only.');
      this.updatepost.Multiimage = ''

      postImg = document.querySelector('#bannerImage')
      postImg.src = 'assets/img/image-preview-icon-picture-placeholder-vector-31284806.jpg';
      this.tourBanner.nativeElement.value = '';
    }
    else {
      this.updatepost.post_mime_type = this.updatepost.Multiimage.type
      postImg = document.querySelector('#bannerImage');
      postImg.src = URL.createObjectURL(this.updatepost.Multiimage);
    }
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

    if(this.updatepost.post_date) {
      if(this.updatepost.post_time) {
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
          this.router.navigate(['/admin/post/view']);
        } else {
          this.notify.error(res.message)
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

  openDialog() {
    const dialogRef = this.dialog.open(ChoosemediaComponent, {
      height: '540px',
      width: '900px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.media_url) {
        this.updatepost.Multiimage = ''
        this.tourBanner.nativeElement.value = '';
        let postImg: any = document.querySelector('#bannerImage');
        postImg.src = result.media_url;
        this.updatepost.post_img = result.media_url;
      }
    });
  }

  saveas_draft() {
    this.spinnerService.show()

    this.updatepost.post_id = this.pid;
    this.updatepost.createdby = this.currentuser.user_id;
    this.updatepost.flag = 'I';
    this.updatepost.tag_id = null;
    this.updatepost.customer_id = environment.CUSTOMER_ID
    if (this.updatepost.post_mime_type) {
      this.updatepost.media_ext = this.updatepost.post_mime_type.split("/")[1];
    }

    if (this.updatepost.category !== null && this.updatepost.category !== undefined && this.updatepost.category !== '') {
      var result = this.updatepost.category.map(function (val: any) {
        return val.category_id;
      }).join(',');
      this.updatepost.category = result;
    }

    if (this.updatepost.addtags !== null && this.updatepost.addtags !== undefined && this.updatepost.addtags !== '') {
      var result = this.updatepost.addtags.map(function (val: any) {
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

    if(this.updatepost.post_date) {
      if(this.updatepost.post_time) {
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
      this.post.draftpost(this.updatepost).subscribe((res: any) => {
        if (res.code == "success") {
          this.spinnerService.hide()

          this.notify.success(res.message);
          this.router.navigate([`/admin/post/drafts/edit/${this.pid}`]);
        } else {
          this.notify.error(res.message)
          this.spinnerService.hide()

        }
      }, (err: any) => {
        this.notify.error(err.message)
        this.spinnerService.hide()

      })
    }, 1000)
  }

  viewdraft(uid: any) {
    this.router.navigate([`/admin/post/drafts/edit/${uid}`]);
  }
}
