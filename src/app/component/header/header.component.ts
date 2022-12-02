import { Component, OnInit } from '@angular/core';
import { MasterServiceService } from 'src/app/services/masterservice/master-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerarry: any[] = []
  customer_id: any;
  morearray: any[] = []
  newarray:any[] = []
  constructor(private masterAPI: MasterServiceService) { }

  ngOnInit(): void {
    this.getallheaders();
  }

  getallheaders() {
    this.masterAPI.getAllheaders(environment.CUSTOMER_ID).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.headerarry = data.map((dt: any) => JSON.parse(dt));
        if(this.headerarry.length > 10) {
          this.newarray = this.headerarry.slice(0,10)
          this.morearray = this.headerarry.slice(10)
        }
      } else {
        this.headerarry = []
      }
    }, (err) => {
      this.headerarry = []
    })
  }
}