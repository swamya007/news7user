import { Component, OnInit } from '@angular/core';
declare var _taboola: any;

@Component({
  selector: 'app-taboola-widget-component',
  templateUrl: './taboola-widget-component.component.html',
  styleUrls: ['./taboola-widget-component.component.css'],
})
export class TaboolaWidgetComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://cdn.taboola.com/libtrc/prameya/loader.js';
    script.async = true;
    document.head.appendChild(script);
  }

  ngAfterViewInit() {
    _taboola.push({
      mode: 'thumbnails-a',
      container: 'taboola-widget',
      placement: 'Below Article Thumbnails',
      template_id: 'custom-template-id',
      native_ad_id: 'custom-native-ad-id',
      height: 600, // Set the desired height here
      width: 300,
    });
  }
}
