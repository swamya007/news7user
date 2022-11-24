import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  typeSelected!: 'ball-fussion';

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
}