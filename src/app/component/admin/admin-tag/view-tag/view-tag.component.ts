import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagserviceService } from 'src/app/services/tagservice/tagservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-tag',
  templateUrl: './view-tag.component.html',
  styleUrls: ['./view-tag.component.css']
})
export class ViewTagComponent implements OnInit {

  constructor( private viewstag : TagserviceService,private router: Router) { }
  tagarray: any[] = []
  tagid:any=''
  tag_name:any = ''
  cust_id:any
  tagSearch: any = '';
  p: number = 1;
  ngOnInit(): void {
    this.cust_id = environment.CUSTOMER_ID
    this.getalltag()
  }

  onKeydown(event: any) {
    event.preventDefault();
  }

  getalltag() {
    this.viewstag.getalltag(this.tagid,this.tag_name,this.cust_id).subscribe((res: any) => {
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

  edittag(data:any){
    localStorage.setItem('data', JSON.stringify(data));
    this.router.navigate([`/admin/tag/edit/${data.tag_id}`]);
  }
  
  searchtag() {
    this.viewstag.getalltag(this.tagid, this.tagSearch,this.cust_id).subscribe((res: any) => {
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

}
