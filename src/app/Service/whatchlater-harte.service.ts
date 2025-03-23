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
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.loadSavedImages(userEmail);
    }
  }

  getImages(): Observable<any> {
    return this.http.get('https://shop-tt-default-rtdb.firebaseio.com/Products.json');
  }

  saveImage(image: any, source: string): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    if (!this.savedImages.some(img => img.id === image.id)) {
      image.source = source;
      this.savedImages.push(image);
      this.updateLocalStorage(userEmail);
    }
  }

  getSavedImages(): any[] {
    return this.savedImages;
  }

  removeImage(index: number): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    this.savedImages.splice(index, 1);
    this.updateLocalStorage(userEmail);
  }

  loadSavedImages(userEmail: string): void {
    try {
      const savedImages = localStorage.getItem(`savedImages_${userEmail}`);
      if (savedImages) {
        this.savedImages = JSON.parse(savedImages);
      }
    } catch (error) {
      console.error('Error loading saved images:', error);
    }
  }

  private updateLocalStorage(userEmail: string): void {
    try {
      localStorage.setItem(`savedImages_${userEmail}`, JSON.stringify(this.savedImages));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }

}