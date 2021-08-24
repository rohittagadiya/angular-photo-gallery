import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ViewPhotoComponent } from '../dialogs/view-photo/view-photo.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public dialog: MatDialog) { }

  viewImage(imageURL) {
    let dialogRef = this.dialog.open(ViewPhotoComponent, {
      panelClass: "view-image-container"
    });
    dialogRef.componentInstance.imageSRC = imageURL;
  }
}
