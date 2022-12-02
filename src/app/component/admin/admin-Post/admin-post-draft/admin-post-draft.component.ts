import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loaderService/loader.service';
import { LoginService } from 'src/app/services/loginService/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PostserviceService } from 'src/app/services/postservice/postservice.service';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';
import { UserService } from 'src/app/services/userService/user.service';
@Component({
  selector: 'app-admin-post-draft',
  templateUrl: './admin-post-draft.component.html',
  styleUrls: ['./admin-post-draft.component.css']
})
export class AdminPostDraftComponent implements OnInit {

  constructor(private spinnerService: LoaderService,private activatedRoute: ActivatedRoute,private userService: UserService, private loginService: LoginService, private viewstag: TagserviceService, private post: PostserviceService, private notify: NotificationService,  private tagserivce: TagserviceService,private router: Router) { }
  post_id: any 
  draft_id: any = ''
  post_name: any = ''
  currentuser: any={};
  draftarrpost: any[] = []
  p: number = 1;
  ngOnInit(): void {
    this.currentuser = this.loginService.getCurrentUser();
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.post_id = Number(routeParams.get('id'));
    this.getalldraftsbypost();

  }
  getalldraftsbypost() {
    this.spinnerService.show()

    this.post.getdraftdetailsbypost(this.post_id,this.draft_id,this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.draftarrpost = data.map((dt: any) => JSON.parse(dt));
      } else {
        this.draftarrpost = []
        this.spinnerService.hide()

      }
    }, (err) => {
      this.draftarrpost = []
      this.spinnerService.hide()

    })
  }
  editdraft(id:any,draft_id: any) {
    console.log(id,draft_id,'king')
    this.router.navigate([`/admin/post/drafts/bypost/edit/${id}/${draft_id}`]);
  }
}
