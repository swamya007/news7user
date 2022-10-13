import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  // menuBtn: any = document.querySelector(".menu-icon span");
  // searchBtn: any = document.querySelector(".search-icon");
  // cancelBtn: any = document.querySelector(".cancel-icon");
  // items: any = document.querySelector(".nav-items");
  // form: any = document.querySelector("form");

  // menuClick () {
  //   this.items.classList.add("active");
  //   this.menuBtn.classList.add("hide");
  //   this.searchBtn.classList.add("hide");
  //   this.cancelBtn.classList.add("show");
  // }
  // onCancel() {
  //   this.items.classList.remove("active");
  //   this.menuBtn.classList.remove("hide");
  //   this.searchBtn.classList.remove("hide");
  //   this.cancelBtn.classList.remove("show");
  //   this.form.classList.remove("active");
  //   this.cancelBtn.style.color = "#ff3d00";
  // }
  // onSearch() {
  //   this.form.classList.add("active");
  //   this.searchBtn.classList.add("hide");
  //   this.cancelBtn.classList.add("show");
  // }
}
