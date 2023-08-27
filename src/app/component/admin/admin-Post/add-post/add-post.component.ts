import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
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
// import { ChoosemediaComponent } from 'src/app/component/admin/admin-Post/choosemedia/choosemedia.component';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { ChoosemediaComponent } from '../choosemedia/choosemedia.component';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
// import * as $ from 'jquery';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

// import Quill from 'quill';
import { ResizeImageComponent } from '../../resize-image/resize-image.component';
import { MediaServicesService } from 'src/app/services/media/media-services.service';

// from the index, which exports a lot of useful modules

// or, from each individual module

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit, AfterViewInit {
  filetype: any;
  tagid: any = '';
  tag_name: any = '';
  cust_id: any;
  addPost: any;
  ckeConfig: any;
  mycontent: any;
  dataList: any = [];
  tagarray: any[] = [];
  comment_status!: boolean;
  title = '';
  currentuser: any = {};
  showHideList: boolean = true;
  showlist: boolean = true;
  @ViewChild('myckeditor') ckeditor: any;
  @ViewChild('tourBanner')
  tourBanner!: ElementRef;
  allUser: any;
  author: any;
  tag: any;
  checkedval: boolean = true;
  catarr: any = [];
  selected: any = true;
  mediadetails: any;
  media_id: any;
  media_title: any;
  mediasearchval: any;
  list = [
    { name: 'Yes', key: 'opened', checked: true },
    { name: 'No', key: 'closed', checked: false },
  ];

  list1 = [
    { name: 'Yes', key: '1', checked: true },
    { name: 'No', key: '2', checked: false },
  ];
  config: any;
  twiteredit = false;
  editor_data: any;
  modules: any;
  editor_modules: {
    toolbar: {
      container: (
        | string[]
        | { font: never[] }[]
        | { size: (string | boolean)[] }[]
        | { header: number }[]
        | (
            | { color: never[]; background?: undefined }
            | { background: never[]; color?: undefined }
          )[]
        | { list: string }[]
        | { align: never[] }[]
      )[];
    };
    imageResize: boolean;
  };
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private viewstag: TagserviceService,
    private post: PostserviceService,
    private notify: NotificationService,
    private router: Router,
    private tagserivce: TagserviceService,
    private categoryService: CategoryServiceService,
    public dialog: MatDialog,
    private spinnerService: LoaderService,
    private cdr: ChangeDetectorRef,
    private mediaservice: MediaServicesService
  ) {
    this.editor_modules = {
      toolbar: {
        container: [
          [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ header: 1 }, { header: 2 }],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['link', 'image'],
        ],
      },
      imageResize: true,
    };
  }
  ngAfterViewInit(): void {
    // @ts-ignore
    //  this.editor_data= new FroalaEditor("#edit")
    FroalaEditor.DefineIcon('alert', { NAME: 'info', SVG_KEY: 'help' });
    // @ts-ignore
    FroalaEditor.RegisterCommand('alert', {
      title: 'Hello',
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function () {
        alert('Hello!');
      },
    });

    // @ts-ignore

    FroalaEditor.DefineIcon('clear', { NAME: 'remove', SVG_KEY: 'remove' });
    // @ts-ignore

    FroalaEditor.RegisterCommand('clear', {
      title: 'Clear HTML',
      focus: false,
      undo: true,
      refreshAfterCallback: true,
      callback: function () {
        this.html.set('');
        this.events.focus();
      },
    });
    // @ts-ignore

    new FroalaEditor('.selector', {
      height: 250,
      fontFamily: {
        'Arial,Helvetica,sans-serif': 'Font 1',
        'Impact,Charcoal,sans-serif': 'Font 2',
        'Tahoma,Geneva,sans-serif': 'Font 3',
      },
      attribution: false,
    });
    // @ts-ignore
    new FroalaEditor('.selector', {
      htmlAllowedEmptyTags: ['table', 'strong'],
    });
    // @ts-ignore

    new FroalaEditor('.selector', {
      formStyles: { class1: 'Class 1', class2: 'Class 2' },
    });

    // @ts-ignore
    new FroalaEditor('.selector', {
      fontSize: ['8', '10', '12', '14', '18', '30', '60', '96'],
    });
    // @ts-ignore

    FroalaEditor.DefineIcon('insert', { NAME: 'plus', SVG_KEY: 'add' });
    // @ts-ignore

    FroalaEditor.RegisterCommand('insert', {
      title: 'Insert HTML',
      focus: true,
      undo: true,
      refreshAfterCallback: true,
      callback: function () {
        this.html.insert('My New HTML');
      },
    });
    // @ts-ignore

    this.editor_data = new FroalaEditor('#edit', {
      // @ts-ignore
      height: 250,
      toolbarButtons: [
        [
          'undo',
          'redo',
          'bold',
          'fontFamily',
          'fontSize',
          'italic',
          'formStyles',
          'insertLink',
          'emoticons',
          'fontAwesome',
          'specialCharacters',
          'embedly',
          'insertHR',
          'alignLeft',
          'alignCenter',
          'formatOLSimple',
          'alignRight',
          'alignJustify',
          'formatOL',
          'formatUL',
          'paragraphFormat',
          'paragraphStyle',
          'lineHeight',
          'outdent',
          'indent',
          'quote',
          'underline',
          'strikeThrough',
          'subscript',
          'superscript',
          'textColor',
          'backgroundColor',
          'inlineClass',
          'inlineStyle',
          'clearFormatting',
        ],
        [
          'textarea',
          'a',
          'iframe',
          'object',
          'video',
          'style',
          'script',
          '.fa',
          '.fr-emoticon',
          '.fr-inner',
          'path',
          'line',
          'hr',
        ],
        [
          'alert',
          'clear',
          'insertVideo',
          'html',
          'insertTable',
          'fontAwesome',
          'specialCharacters',
        ],
      ],
      // Set the image upload parameter.
      imageUploadParam: 'multipartFile',

      // Set the image upload URL.
      imageUploadURL:
        'https://api-dev.prameyanews.com/prameya/api/post/add-content-images',

      // Additional upload params.
      imageUploadParams: { customerId: environment.CUSTOMER_ID },

      // Set request type.
      imageUploadMethod: 'POST',

      // Set max image size to 5MB.
      imageMaxSize: 5 * 1024 * 1024,

      // Allow to upload PNG and JPG.
      imageAllowedTypes: ['jpeg', 'jpg', 'png'],

      events: {
        'image.beforeUpload': function (images: any) {
          // Return false if you want to stop the image upload.
        },
        'image.uploaded': function (response: any) {
          // Image was uploaded to the server.
          console.log(response);
        },
        'image.inserted': function ($img: any, response: any) {
          // Image was inserted in the editor.
          console.log(response, $img);
        },
        'image.replaced': function ($img: any, response: any) {
          // Image was replaced in the editor.
          console.log(response, $img);
        },
        'image.error': function (error: any, response: any) {
          // Bad link.
          if (error.code == 1) {
            console.log('Bad Link');
          }
          // No link in upload response.
          else if (error.code == 2) {
            console.log('No link in upload response.');
          }
          // Error during image upload.
          else if (error.code == 3) {
            console.log('Error during image upload.');
          }

          // Parsing response failed.
          else if (error.code == 4) {
            console.log('Parsing response failed.');
          }

          // Image too text-large.
          else if (error.code == 5) {
            console.log('Image too text-large.');
          }

          // Invalid image type.
          else if (error.code == 6) {
            console.log('Invalid image type.');
          }

          // Image can be uploaded only to same domain in IE 8 and IE 9.
          else if (error.code == 7) {
            console.log(
              'Image can be uploaded only to same domain in IE 8 and IE 9.'
            );
          }
          // Response contains the original server response to the request if available.
        },
      },
    });
  }

  ngOnInit(): void {
    this.cust_id = environment.CUSTOMER_ID;
    this.currentuser = this.loginService.getCurrentUser();
    this.getallmediadetails();
    // this.getallcategory();
    this.getCategory();
    this.getalltag();

    this.checkedval = true;
    this.config = {
      editable: true,
      spellcheck: true,
      height: '15rem',
      minHeight: '5rem',
      placeholder: 'Enter text here...',
      translate: 'no',
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Arial',
      toolbarHiddenButtons: [['bold']],
      customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText',
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
    };

    this.ckeConfig = {
      extraPlugins:
        'easyimage,dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,clipboard,' +
        'button,panelbutton,panel,floatpanel,colorbutton,colordialog,menu,' +
        'contextmenu,dialogadvtab,div,elementspath,enterkey,entities,popup,' +
        'filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,' +
        'font,format,forms,horizontalrule,htmlwriter,iframe,image,indent,' +
        'indentblock,indentlist,justify,link,list,liststyle,magicline,' +
        'maximize,newpage,pagebreak,pastefromword,pastetext,preview,print,' +
        'removeformat,resize,save,menubutton,scayt,selectall,showblocks,' +
        'showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,' +
        'tabletools,templates,toolbar,undo,wysiwygarea',
    };
    this.addPost = new postModel();

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
      allowSearchFilter: true,
    };
    this.dropdownSettingsCat = {
      singleSelection: false,
      idField: 'category_id',
      textField: 'category_name',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1000,
      allowSearchFilter: true,
    };
    this.getalluser();
    this.tag = new tagModel();
    this.addPost.comment_status = 'opened';
    this.addPost.immidiate_publish = '1';
    this.addPost.visibility = '0';
    var currentdate = new Date();
    this.addPost.post_date =
      currentdate.getFullYear() +
      '-' +
      ('0' + (currentdate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentdate.getDate()).slice(-2);
    this.addPost.post_time =
      ('0' + currentdate.getHours()).slice(-2) +
      ':' +
      ('0' + currentdate.getMinutes()).slice(-2);
  }

  twiter() {
    this.addPost.twiteredit = false;
    console.log(this.addPost.twiteredit);
    this.showHideList = true;
    this.showlist = false;
  }
  Others() {
    this.addPost.twiteredit = true;
    console.log(this.addPost.twiteredit);
    this.showHideList = false;
    this.showlist = true;
  }
  currentItem: any;
  data: any = [];
  selectedItem(item: any) {
    this.currentItem = item;
  }

  checkedItems(items: any) {
    this.data = items.checked;
    console.log(this.data, 's');
  }

  getCategory() {
    this.categoryService.getCategory(this.currentuser.customer_id).subscribe(
      (res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.catarr = data.map((dt: any) => JSON.parse(dt));
          // this.editData()
          this.cdr.detectChanges();
        } else {
          this.catarr = [];
        }
      },
      (err) => {
        this.catarr = [];
      }
    );
  }

  newspreview(addPost: any) {
    let postImg: any;
    if (this.addPost.Multiimage) {
      postImg = document.querySelector('#previewImage');
      postImg.src = URL.createObjectURL(this.addPost.Multiimage);
    }

    const exampleModal1 = document.getElementById('quickeditModal');
    if (exampleModal1) exampleModal1.click();
  }
  getDraftedPost() {
    this.post
      .getDraftedPostByAuthor(
        this.currentuser.user_id,
        this.currentuser.customer_id
      )
      .subscribe(
        (res: any) => {
          if (res.code == 'success') {
            var data = res.body;
            data = data.map((dt: any) => JSON.parse(dt));
            this.addPost = data[0];

            this.addPost.post_author = parseInt(this.addPost.post_author);
            this.addPost.author_name = this.addPost.post_author;

            if (this.addPost.tags !== null && this.addPost.tags !== undefined) {
              let arr: any = [];
              let split_arr = this.addPost.tags.split(',');
              for (var i = 0; i < split_arr.length; i++) {
                let obj: any = {};
                obj.tag_name = split_arr[i];
                arr.push(obj);
              }
              let value = this.tagarray.filter((d: any) =>
                arr.map((v: any) => v.tag_name).includes(d.tag_name)
              );
              this.addPost.addtags = value;
            }

            if (
              this.addPost.category !== null &&
              this.addPost.category !== undefined
            ) {
              let arr: any = [];
              let split_arr = this.addPost.category.split(',');
              for (var i = 0; i < split_arr.length; i++) {
                let obj: any = {};
                obj.category_id = parseInt(split_arr[i]);
                arr.push(obj);
              }
              let value = this.catarr.filter((d: any) =>
                arr.map((v: any) => v.category_id).includes(d.category_id)
              );
              this.addPost.category = value;
            }

            this.addPost.immidiate_publish =
              this.addPost.post_immidiate_publish;
            this.addPost.visibility = this.addPost.post_visibility;
          } else {
            this.addPost = {};
          }
        },
        (err) => {
          this.addPost = {};
        }
      );
  }

  getallcategory() {
    this.categoryService
      .getAllCategory('', '', this.currentuser.customer_id)
      .subscribe(
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
  wordStatus: any;
  getWordStrength() {
    const wordLength = this.addPost.seo_title.length;
    let progressBar: any = document.getElementById('progressBar');
    if (progressBar) {
      if (wordLength > 0) {
        this.wordStrength = 100;
        progressBar.style.width = 100 + '%';
      } else {
        this.wordStrength = 0;
        progressBar.style.width = 0 + '%';
        progressBar.style.backgroundColor = 'none';
      }

      if (wordLength > 0 && wordLength <= 20) {
        progressBar.style.backgroundColor = 'yellow';
        this.wordStatus = 'Low';
      }
      if (wordLength > 20 && wordLength <= 60) {
        progressBar.style.backgroundColor = 'green';
        this.wordStatus = 'Good';
      }
      if (wordLength > 60) {
        progressBar.style.backgroundColor = 'red';
        this.wordStatus = 'High';
      }
      if (wordLength === 0) {
        this.wordStatus = '';
      }
    }
  }
  wordStrength = 0;
  descriptionStrength = 0;
  descStatus: any;
  getMetaDescriptionStrength() {
    const descrLength = this.addPost.meta_description.length;
    let progressBar: any = document.getElementById('progressBar2');
    if (progressBar) {
      if (descrLength > 0) {
        this.descriptionStrength = 100;
        progressBar.style.width = 100 + '%';
      } else {
        this.descriptionStrength = 0;
        progressBar.style.width = 0 + '%';
        progressBar.style.backgroundColor = 'none';
      }

      if (descrLength > 0 && descrLength <= 45) {
        progressBar.style.backgroundColor = 'yellow';
        this.descStatus = 'Low';
      }
      if (descrLength > 45 && descrLength <= 165) {
        progressBar.style.backgroundColor = 'green';
        this.descStatus = 'Good';
      }
      if (descrLength > 165) {
        progressBar.style.backgroundColor = 'red';
        this.descStatus = 'High';
      }
      if (descrLength === 0) {
        this.descStatus = '';
      }
    }
  }
  getSlug() {
    this.addPost.slug = this.addPost.post_title
      .replace(/[^\w\s]/gi, '')
      .replaceAll(' ', '-')
      .toLowerCase();
    this.addPost.permalink = environment.POST_URL + this.addPost.slug;
  }

  // getPermalink() {
  //   this.addPost.slug = this.addPost.slug.replace(' ', '-');
  //   this.addPost.permalink = environment.POST_URL + this.addPost.slug;
  // }

  getPermalink() {
    this.addPost.slug = this.addPost.slug.replace(/ /g, '-');
    this.addPost.permalink = environment.POST_URL + this.addPost.slug;
  }

  onFilterChange(event: any) {
    const re = RegExp(
      `.*${event.target.value.toLowerCase().split('').join('.*')}.*`
    );
    const matches = this.tagarray.filter((v: any) =>
      v.tag_name.toLowerCase().match(re)
    );

    if (matches.length === 0) {
      this.tag.createdby = this.currentuser.user_id;
      this.tag.flag = 'I';
      this.tag.tag_id = null;
      this.tag.tag_name = event.target.value;
      this.tag.customer_id = environment.CUSTOMER_ID;

      this.tagserivce.addnewtag(this.tag).subscribe(
        (res: any) => {
          if (res.code == 'success') {
            this.getalltag();
            this.dropdownSettings = {
              singleSelection: false,
              idField: 'tag_id',
              textField: 'tag_name',
              selectAllText: 'Select All',
              unSelectAllText: 'Unselect All',
              itemsShowLimit: 1000,
              allowSearchFilter: true,
            };
          } else {
            this.notify.error(res.message);
          }
        },
        (err: any) => {
          this.notify.error(err.message);
        }
      );
    }
  }
  getalluser() {
    this.userService
      .getUserDetails('', '', this.currentuser.customer_id, 'N')
      .subscribe((data: any) => {
        this.allUser = data.body;
        this.allUser = this.allUser.map((dt: any) => JSON.parse(dt));
      });
  }

  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsCat: IDropdownSettings = {};

  getalltag() {
    this.viewstag.getalltag(this.tagid, this.tag_name, this.cust_id).subscribe(
      (res: any) => {
        if (res.code == 'success') {
          var data = res.body;
          this.tagarray = data.map((dt: any) => JSON.parse(dt));
        } else {
          this.tagarray = [];
        }
      },
      (err) => {
        this.tagarray = [];
      }
    );
  }

  onfileselected(event: any) {
    this.addPost.Multiimage = <File>event.target.files[0];

    let postImg!: any;
    if (
      this.addPost.Multiimage.type != 'image/jpeg' &&
      this.addPost.Multiimage.type != 'image/png'
    ) {
      // this.Notification.error('This is not valid file format. Please upload jpg/png file only.');
      this.addPost.Multiimage = '';

      postImg = document.querySelector('#bannerImage');
      postImg.src =
        'assets/img/image-preview-icon-picture-placeholder-vector-31284806.jpg';
      this.tourBanner.nativeElement.value = '';
      this.addPost.image_name = '';
    } else {
      this.addPost.post_mime_type = this.addPost.Multiimage.type;
      // postImg = document.querySelector('#bannerImage');
      // postImg.src = URL.createObjectURL(this.addPost.Multiimage);
      this.addPost.image_name = this.addPost.Multiimage.name;
      if (this.addPost.Multiimage) {
        var reader = new FileReader();
        reader.readAsDataURL(this.addPost.Multiimage);
        reader.onload = function () {};
      }
      setTimeout(() => {
        this.openResizeDialog(reader.result, 'BROWSER', '');
      }, 1000);
    }
  }

  openResizeDialog(img: any, type: any, media_alt_text: any) {
    const dialogRefResize = this.dialog.open(ResizeImageComponent, {
      height: '550px',
      width: '900px',
      data: { img: img, type: type },
      disableClose: true,
    });
    dialogRefResize.afterClosed().subscribe((result) => {
      if (result) {
        if (type === 'MEDIA') {
          this.addPost.Multiimage = '';
          this.tourBanner.nativeElement.value = '';
          if (result.uploadStatus) {
            let postImg: any = document.querySelector('#bannerImage');
            postImg.src = result.img;
            this.addPost.media_alt_text = media_alt_text;
            this.addPost.base64file = result.img;
          } else {
            let postImg: any = document.querySelector('#bannerImage');
            postImg.src = result.img;
            this.addPost.Multiimage = '';
            this.tourBanner.nativeElement.value = '';
            this.addPost.base64file = '';
            this.addPost.post_img = result.img;
            this.addPost.compressFile = result.img;
            this.addPost.media_alt_text = media_alt_text;
          }
        } else {
          let postImg: any = document.querySelector('#bannerImage');
          postImg.src = result.img;
          this.addPost.base64file = result.img;
        }
      } else {
        this.tourBanner.nativeElement.value = '';
        this.addPost.image_name = '';
        this.addPost.post_mime_type = '';
      }
    });
  }

  getallmediadetails() {
    this.media_id = '';
    this.media_title = '';
    this.mediasearchval = '';
    this.mediaservice
      .getmediaDetails(
        this.media_id,
        this.media_title,
        this.currentuser.customer_id
      )
      .subscribe((data: any) => {
        this.mediadetails = data.body;
        this.mediadetails = this.mediadetails.map((dt: any) => JSON.parse(dt));
        console.log(this.mediadetails);
      });
  }

  addpost() {
    // if (
    //   this.addPost.media_url == null ||
    //   this.addPost.media_url == '' ||
    //   this.addPost.media_url == undefined
    // ) {
    //   this.notify.error('Featured Image Required');
    //   return;
    // }
    if (
      this.addPost.slug == null ||
      this.addPost.slug == '' ||
      this.addPost.slug == undefined
    ) {
      this.notify.error('Slug Required');
      return;
    }
    if (
      this.addPost.media_alt_text == null ||
      this.addPost.media_alt_text == '' ||
      this.addPost.media_alt_text == undefined
    ) {
      this.notify.error('Media Alt Text Required');
      return;
    }
    this.spinnerService.show();
    if (this.addPost.twiteredit == true) {
      this.addPost.twiteredit = 'Y';
    } else {
      this.addPost.twiteredit = 'N';
    }
    this.addPost.createdby = this.currentuser.user_id;
    this.addPost.flag = 'I';
    this.addPost.tag_id = null;

    this.addPost.customer_id = environment.CUSTOMER_ID;
    if (this.addPost.post_mime_type) {
      this.addPost.media_ext = this.addPost.post_mime_type.split('/')[1];
    }

    if (
      this.data !== null &&
      this.data !== undefined &&
      this.data !== '' &&
      this.data.length > 0
    ) {
      var result = this.data
        .map(function (val: any) {
          return val.key;
        })
        .join(',');
      this.addPost.category = result;
    }

    if (
      this.addPost.addtags !== null &&
      this.addPost.addtags !== undefined &&
      this.addPost.addtags !== ''
    ) {
      var result = this.addPost.addtags
        .map(function (val: any) {
          return val.tag_name;
        })
        .join(',');
      this.addPost.addtags = result;
    }

    if (this.addPost.Multiimage) {
      var reader = new FileReader();
      reader.readAsDataURL(this.addPost.Multiimage);
      reader.onload = function () {};
    }

    if (this.addPost.post_date) {
      if(this.addPost.post_date.length > 10)
        this.addPost.post_date = this.addPost.post_date.substring(0, 10);
      if (this.addPost.post_time) {
        this.addPost.post_date =
          this.addPost.post_date + ' ' + this.addPost.post_time;
        console.log(
          this.addPost.post_date + ' ' + this.addPost.post_time,
          'postdate&time'
        );
      } else {
        this.addPost.post_date = this.addPost.post_date + ' 00:00';
        console.log(this.addPost.post_date + ' 00:00', 'postdate');
      }
    }

    this.addPost.post_content = this.editor_data.html.get();
    // console.log(this.addPost.post_content,'hii')
    // var edit:any = document.getElementById('edit');
    // console.log(edit)
    // var html = edit.froalaEditor('html.get');
    // console.log(html)
    // var html = $('div#edit').froalaEditor('html.get');
    setTimeout(() => {
      if (
        this.addPost.base64file == null ||
        this.addPost.base64file == '' ||
        this.addPost.base64file == undefined
      ) {
        if (this.addPost.guid) {
          this.addPost.post_img = this.addPost.guid;
        }
      } else {
        this.addPost.media_ext = this.addPost.base64file.substring(
          'data:image/'.length,
          this.addPost.base64file.indexOf(';base64')
        );
      }
      this.post.addpostodia(this.addPost).subscribe(
        (res: any) => {
          if (res.code == 'success') {

            this.spinnerService.hide();
            // this.notify.success(res.message);
            this.notify.success('Post Added Successfully');
            this.router.navigate(['/admin/post/view']);
          } else {
            this.notify.error(res.message);
            this.spinnerService.hide();

            if (this.addPost.post_date) {
              var data = this.addPost.post_date.split(' ');
              this.addPost.post_date = data[0];
              console.log((this.addPost.post_date = data[0]), '[0]');
              this.addPost.post_time = data[1];
              console.log((this.addPost.post_time = data[1]), '[0]');
            }

            if (
              this.addPost.addtags !== null &&
              this.addPost.addtags !== undefined
            ) {
              let arr: any = [];
              let split_arr = this.addPost.addtags.split(',');
              for (var i = 0; i < split_arr.length; i++) {
                let obj: any = {};
                obj.tag_name = split_arr[i];
                arr.push(obj);
              }
              let value = this.tagarray.filter((d: any) =>
                arr.map((v: any) => v.tag_name).includes(d.tag_name)
              );
              this.addPost.addtags = value;
            }
          }
        },
        (err: any) => {
          this.notify.error(err.message);
          this.spinnerService.hide();

          if (this.addPost.post_date) {
            var data = this.addPost.post_date.split(' ');
            this.addPost.post_date = data[0];
            console.log((this.addPost.post_date = data[0]), '[0]err');
            this.addPost.post_time = data[1];
            console.log((this.addPost.post_time = data[1]), '[1]err');
          }

          if (
            this.addPost.addtags !== null &&
            this.addPost.addtags !== undefined
          ) {
            let arr: any = [];
            let split_arr = this.addPost.addtags.split(',');
            for (var i = 0; i < split_arr.length; i++) {
              let obj: any = {};
              obj.tag_name = split_arr[i];
              arr.push(obj);
            }
            let value = this.tagarray.filter((d: any) =>
              arr.map((v: any) => v.tag_name).includes(d.tag_name)
            );
            this.addPost.addtags = value;
          }
        }
      );
    }, 1000);
  }
  saveas_draft() {
    this.spinnerService.show();

    this.addPost.createdby = this.currentuser.user_id;
    this.addPost.flag = 'I';
    this.addPost.tag_id = null;
    this.addPost.customer_id = environment.CUSTOMER_ID;
    if (this.addPost.post_mime_type) {
      this.addPost.media_ext = this.addPost.post_mime_type.split('/')[1];
    }

    if (
      this.data !== null &&
      this.data !== undefined &&
      this.data !== '' &&
      this.data.length > 0
    ) {
      var result = this.data
        .map(function (val: any) {
          return val.key;
        })
        .join(',');
      this.addPost.category = result;
    }

    if (
      this.addPost.addtags !== null &&
      this.addPost.addtags !== undefined &&
      this.addPost.addtags !== ''
    ) {
      var result = this.addPost.addtags
        .map(function (val: any) {
          return val.tag_name;
        })
        .join(',');
      this.addPost.addtags = result;
    }

    if (this.addPost.Multiimage) {
      var reader = new FileReader();
      reader.readAsDataURL(this.addPost.Multiimage);
      reader.onload = function () {};
    }

    if (this.addPost.post_date) {
      if(this.addPost.post_date.length > 10)
        this.addPost.post_date = this.addPost.post_date.substring(0, 10);
      if (this.addPost.post_time) {
        this.addPost.post_date =
          this.addPost.post_date + ' ' + this.addPost.post_time;
      } else {
        this.addPost.post_date = this.addPost.post_date + ' 00:00';
      }
    }

    this.addPost.post_content = this.editor_data.html.get();

    setTimeout(() => {
      if (
        this.addPost.base64file == null ||
        this.addPost.base64file == '' ||
        this.addPost.base64file == undefined
      ) {
        if (this.addPost.guid) {
          this.addPost.post_img = this.addPost.guid;
        }
      } else {
        this.addPost.media_ext = this.addPost.base64file.substring(
          'data:image/'.length,
          this.addPost.base64file.indexOf(';base64')
        );
      }
      this.post.draftpost(this.addPost).subscribe(
        (res: any) => {
          if (res.code == 'success') {
            this.spinnerService.hide();

            this.notify.success(res.message);
            // this.router.navigate(['/admin/drafts/view']);
          } else {
            this.notify.error(res.message);
            this.spinnerService.hide();

            if (this.addPost.post_date) {
              var data = this.addPost.post_date.split(' ');
              this.addPost.post_date = data[0];
              this.addPost.post_time = data[1];
            }

            if (
              this.addPost.addtags !== null &&
              this.addPost.addtags !== undefined
            ) {
              let arr: any = [];
              let split_arr = this.addPost.addtags.split(',');
              for (var i = 0; i < split_arr.length; i++) {
                let obj: any = {};
                obj.tag_name = split_arr[i];
                arr.push(obj);
              }
              let value = this.tagarray.filter((d: any) =>
                arr.map((v: any) => v.tag_name).includes(d.tag_name)
              );
              this.addPost.addtags = value;
            }
          }
        },
        (err: any) => {
          this.notify.error(err.message);
          this.spinnerService.hide();

          if (this.addPost.post_date) {
            var data = this.addPost.post_date.split(' ');
            this.addPost.post_date = data[0];
            this.addPost.post_time = data[1];
          }

          if (
            this.addPost.addtags !== null &&
            this.addPost.addtags !== undefined
          ) {
            let arr: any = [];
            let split_arr = this.addPost.addtags.split(',');
            for (var i = 0; i < split_arr.length; i++) {
              let obj: any = {};
              obj.tag_name = split_arr[i];
              arr.push(obj);
            }
            let value = this.tagarray.filter((d: any) =>
              arr.map((v: any) => v.tag_name).includes(d.tag_name)
            );
            this.addPost.addtags = value;
          }
        }
      );
    }, 1000);
  }
  openDialog() {
    const dialogRef = this.dialog.open(ChoosemediaComponent, {
      height: '550px',
      width: '900px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.media_url) {
        console.log(result, 'img');
        // this.addPost.Multiimage = '';
        // this.tourBanner.nativeElement.value = '';
        // let postImg: any = document.querySelector('#bannerImage');
        // postImg.src = result.media_url;
        this.openResizeDialog(result.media_url, 'MEDIA', result.media_alt_text);
      }
    });
  }
  openDialogn(addPost: any) {
    this.addPost.post_content = this.editor_data.html.get();
    localStorage.setItem('addPost', JSON.stringify(addPost));
    console.log(addPost, 'imgdet');
    const url = this.router
      .createUrlTree([`admin/post/postpreview/${addPost}`])
      .toString();
    window.open(url, '_blank');
  }
  // openDialogn(addPost: any) {
  //   this.addPost.post_content = this.editor_data.html.get();
  //   var reader = new FileReader();
  //   if (this.addPost.Multiimage) {
  //     reader.readAsDataURL(this.addPost.Multiimage);
  //     reader.onload = function () {};
  //   }
  //   setTimeout(() => {
  //     if (reader) {
  //       this.addPost.base64file = reader.result;
  //     }
  //     localStorage.setItem('addPost', JSON.stringify(this.addPost));
  //     const url = this.router
  //       .createUrlTree([`admin/post/postpreview/${addPost}`])
  //       .toString();
  //     window.open(url, '_blank');
  //   }, 1000);
  // }
}
