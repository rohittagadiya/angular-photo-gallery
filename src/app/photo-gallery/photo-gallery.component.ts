import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  search_query: string = "computer";
  page_number: number = 1;
  allPhotosList: any = [];
  isLoading: boolean = false;

  constructor(public httpService: HttpService, public utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos() {
    this.isLoading = true;
    this.httpService.searchPhotos(this.search_query, this.page_number).then(async (result: any) => {
      if (result && result.photos) {
        result.photos.map(element => {
          this.allPhotosList.push(element);
        });
        await this.detectChangeInArray(this.allPhotosList);
        this.isLoading = false;
        // console.log(this.allPhotosList);
      }
    });
  }

  searchPhoto() {
    this.allPhotosList = [];
    this.getPhotos();
    this.page_number = 1;
  }

  photosScrolled() {
    this.page_number++;
    this.getPhotos();
  }

  detectChangeInArray(arr) {
    this.allPhotosList = [];
    this.allPhotosList.push(...arr);
  }

}
