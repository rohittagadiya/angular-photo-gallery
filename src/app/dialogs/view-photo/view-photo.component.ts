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
  
  async downloadPhoto() {
    const image = await fetch(this.imageSRC)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    let element = document.createElement('a');
    element.href = imageURL;
    element.download = "filename.jpg";
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}
