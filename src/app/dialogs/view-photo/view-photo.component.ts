import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-photo',
  templateUrl: './view-photo.component.html',
  styleUrls: ['./view-photo.component.scss']
})
export class ViewPhotoComponent implements OnInit {

  imageSRC: string = "";

  constructor(public dialogRef: MatDialogRef<ViewPhotoComponent>) { }

  ngOnInit(): void {
  }

}
