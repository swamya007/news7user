import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mgid',
  templateUrl: './mgid.component.html',
  styleUrls: ['./mgid.component.css']
})
export class MgidComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('mgidAd', {static: true}) mgidAd!: ElementRef;

  ngAfterViewInit() {
    // (window as any)._mgid = { 
    //       siteId: 12345, 
    //       slotId: 'M498417ScriptRootC1267206', 
    //       type: 'inline'
    //     }; 
    const z = document.createElement('script');
    z.type = 'text/javascript';
    z.async = true;
    z.src = "https://jsc.mgid.com/p/r/prameya.com.1267205.js";
    const s:any = document.getElementById('target');
    // const s:any = document.getElementsByTagName('script')[0];
    s.appendChild(z);
  }
 


}
