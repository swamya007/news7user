import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-entry-popup',
  templateUrl: './entry-popup.component.html',
  styleUrls: ['./entry-popup.component.css']
})
export class EntryPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EntryPopupComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
