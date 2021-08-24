import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewPhotoComponent } from '../dialogs/view-photo/view-photo.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public dialog: MatDialog, private modal: NgbModal) { }

  /* viewImage(imageURL) {
    let dialogRef = this.dialog.open(ViewPhotoComponent, {
      panelClass: "view-image-container"
    });
    dialogRef.componentInstance.imageSRC = imageURL;
  } */

  viewImage(imageURL) {
    var modalRef = this.modal.open(ViewPhotoComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'view-photo-modal-class',
      backdrop: 'static',
      backdropClass: 'view-photo-backdrop-class',
      keyboard: false
    })
    modalRef.componentInstance.imageSRC = imageURL;
  }
}
