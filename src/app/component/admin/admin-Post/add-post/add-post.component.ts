import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
// import Adapter from 'src/ckeditor'
import { postModel } from 'src/app/models/postModel';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';
import { environment } from 'src/environments/environment';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { UserService } from 'src/app/services/userService/user.service';
import { tagModel } from 'src/app/models/tagModel';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChoosemediaComponent } from 'src/app/component/admin/admin-Post/choosemedia/choosemedia.component';
import { LoaderService } from 'src/app/services/loaderService/loader.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  filetype: any
  tagid: any = ''
  tag_name: any = ''
  cust_id: any
  addPost: any
  ckeConfig: any
  mycontent: any
  dataList: any = [];
  tagarray: any[] = []
  comment_status!: boolean

  currentuser: any = {};

  @ViewChild("myckeditor") ckeditor: any;
  @ViewChild('tourBanner')
  tourBanner!: ElementRef;
  allUser: any;
  author: any;
  tag: any
  checkedval: boolean = true
  catarr: any = []
  selected:any = true

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
    private categoryService:CategoryServiceService,public dialog: MatDialog,private spinnerService: LoaderService) { }

  ngOnInit(): void {

    this.cust_id = environment.CUSTOMER_ID
    this.currentuser = this.loginService.getCurrentUser();

    this.getallcategory();
    this.getalltag()

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
    this.addPost = new postModel()
    
    // this.addPost.user_id=this.currentuser.user_id;
    this.author = this.currentuser.user_id;
    this.addPost.post_author = this.author;
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
    this.getalluser();
    this.tag = new tagModel()
    this.addPost.comment_status = "opened"
    this.addPost.immidiate_publish = "2"
    this.addPost.visibility = "0"
    // this.getDraftedPost();
  }

  getDraftedPost() {
    this.post.getDraftedPostByAuthor(this.currentuser.user_id,this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        data = data.map((dt: any) => JSON.parse(dt));
        this.addPost = data[0];

        this.addPost.post_author = parseInt(this.addPost.post_author)
        this.addPost.author_name = this.addPost.post_author


        if (this.addPost.tags !== null && this.addPost.tags !== undefined) {
          let arr: any = [];
          let split_arr = this.addPost.tags.split(",");
          for (var i = 0; i < split_arr.length; i++) {
            let obj: any = {};
            obj.tag_name = split_arr[i];
            arr.push(obj)
          }
          let value = this.tagarray.filter((d: any) => arr.map((v: any) => v.tag_name).includes(d.tag_name));
          this.addPost.addtags = value;
        }
        
        if (this.addPost.category !== null && this.addPost.category !== undefined) {
          let arr: any = [];
          let split_arr = this.addPost.category.split(",");
          for (var i = 0; i < split_arr.length; i++) {
            let obj: any = {};
            obj.category_id = parseInt(split_arr[i]);
            arr.push(obj)
          }
          console.log('arr===',arr)
          console.log()
          let value = this.catarr.filter((d: any) => arr.map((v: any) => v.category_id).includes(d.category_id));
          console.log('value====',value)
          this.addPost.category = value;
        }

        this.addPost.immidiate_publish = this.addPost.post_immidiate_publish;
        this.addPost.visibility = this.addPost.post_visibility;
      } else {
        this.addPost = {}
      }
    }, (err) => {
      this.addPost = {}
    })
  }

  getallcategory() {
    this.categoryService.getAllCategory('', '',this.currentuser.customer_id).subscribe((res: any) => {
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
  getSlug() {
    this.addPost.slug = this.addPost.post_title.replace(/[^\w\s]/gi, "").replaceAll(" ", "-").toLowerCase();
    this.addPost.permalink = environment.POST_URL + this.addPost.slug;
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
      } else {
        this.tagarray = []
      }
    }, (err) => {
      this.tagarray = []
    })
  }

  onfileselected(event: any) {
    this.addPost.Multiimage = <File>event.target.files[0];
    let postImg!: any;
    if ((this.addPost.Multiimage.type != 'image/jpeg') && (this.addPost.Multiimage.type != 'image/png')) {
      // this.Notification.error('This is not valid file format. Please upload jpg/png file only.');
      this.addPost.Multiimage = ''
      
      postImg = document.querySelector('#bannerImage')
      postImg.src = 'assets/img/image-preview-icon-picture-placeholder-vector-31284806.jpg';
      this.tourBanner.nativeElement.value = '';
    }
    else {
      this.addPost.post_mime_type = this.addPost.Multiimage.type
      postImg = document.querySelector('#bannerImage');
      postImg.src = URL.createObjectURL(this.addPost.Multiimage);
    }
  }
  


  addpost() {
    this.spinnerService.show()

    this.addPost.createdby = this.currentuser.user_id;
    this.addPost.flag = 'I';
    this.addPost.tag_id = null;
    this.addPost.customer_id = environment.CUSTOMER_ID
    if (this.addPost.post_mime_type) {
      this.addPost.media_ext = this.addPost.post_mime_type.split("/")[1];
    }

    if (this.addPost.category !== null && this.addPost.category !== undefined && this.addPost.category !== '') {
      var result = this.addPost.category.map(function (val: any) {
        return val.category_id;
      }).join(',');
      this.addPost.category = result;
    }

    if (this.addPost.addtags !== null && this.addPost.addtags !== undefined && this.addPost.addtags !== '') {
      var result = this.addPost.addtags.map(function (val: any) {
        return val.tag_name;
      }).join(',');
      this.addPost.addtags = result;
    }

    if (this.addPost.Multiimage) {
      var reader = new FileReader();
      reader.readAsDataURL(this.addPost.Multiimage)
      reader.onload = function () {

      };
    }

    if(this.addPost.post_date) {
      if(this.addPost.post_time) {
        this.addPost.post_date = this.addPost.post_date + " " + this.addPost.post_time;
      } else {
        this.addPost.post_date = this.addPost.post_date + " 00:00";
      }
    }

    setTimeout(() => {
      if (this.addPost.Multiimage) {
        this.addPost.base64file = reader.result
      } else {
        if (this.addPost.guid) {
          this.addPost.post_img = this.addPost.guid;
        }
      }
      this.post.addpost(this.addPost).subscribe((res: any) => {
        if (res.code == "success") {
          this.spinnerService.hide()

          this.notify.success(res.message);
          this.router.navigate(['/admin/post/view']);
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
  saveas_draft() {
    this.spinnerService.show()

    this.addPost.createdby = this.currentuser.user_id;
    this.addPost.flag = 'I';
    this.addPost.tag_id = null;
    this.addPost.customer_id = environment.CUSTOMER_ID
    if (this.addPost.post_mime_type) {
      this.addPost.media_ext = this.addPost.post_mime_type.split("/")[1];
    }

    if (this.addPost.category !== null && this.addPost.category !== undefined && this.addPost.category !== '') {
      var result = this.addPost.category.map(function (val: any) {
        return val.category_id;
      }).join(',');
      this.addPost.category = result;
    }

    if (this.addPost.addtags !== null && this.addPost.addtags !== undefined && this.addPost.addtags !== '') {
      var result = this.addPost.addtags.map(function (val: any) {
        return val.tag_name;
      }).join(',');
      this.addPost.addtags = result;
    }

    if (this.addPost.Multiimage) {
      var reader = new FileReader();
      reader.readAsDataURL(this.addPost.Multiimage)
      reader.onload = function () {

      };
    }

    if(this.addPost.post_date) {
      if(this.addPost.post_time) {
        this.addPost.post_date = this.addPost.post_date + " " + this.addPost.post_time;
      } else {
        this.addPost.post_date = this.addPost.post_date + " 00:00";
      }
    }

    setTimeout(() => {
      if (this.addPost.Multiimage) {
        this.addPost.base64file = reader.result
      } else {
        if (this.addPost.guid) {
          this.addPost.post_img = this.addPost.guid;
        }
      }
      this.post.draftpost(this.addPost).subscribe((res: any) => {
        if (res.code == "success") {
          this.spinnerService.hide()

          this.notify.success(res.message);
          this.router.navigate(['/admin/drafts/view']);
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
  openDialog() {
    const dialogRef = this.dialog.open(ChoosemediaComponent, {
      height: '540px',
      width: '900px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.media_url){     
        this.addPost.Multiimage = ''
        this.tourBanner.nativeElement.value = '';
        let postImg:any = document.querySelector('#bannerImage');
        postImg.src = result.media_url;
        this.addPost.post_img=result.media_url;
      }
    });
  }
}
