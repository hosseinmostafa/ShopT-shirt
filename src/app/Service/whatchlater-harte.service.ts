import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Iproduct } from '../Component/interface/Iproduct';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WhatchlaterHarteService {
  private savedImages: any[] = [];

  constructor(private http: HttpClient) {
    this.loadSavedImages();
  }

  getImages(): Observable<any> {
    return this.http.get('https://shop-tt-default-rtdb.firebaseio.com/Products.json');
  }

  saveImage(image: any): void {
    if (!this.savedImages.some(img => img.id === image.id)) {
      this.savedImages.push(image);
      this.updateLocalStorage();
    }
  }

  getSavedImages(): any[] {
    return this.savedImages;
  }

  removeImage(index: number): void {
    this.savedImages.splice(index, 1);
    this.updateLocalStorage();
  }

  private loadSavedImages(): void {
    const savedImages = localStorage.getItem('savedImages');
    if (savedImages) {
      this.savedImages = JSON.parse(savedImages);
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem('savedImages', JSON.stringify(this.savedImages));
  }

}


