import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../Service/product.service';
import { Router } from '@angular/router';
import { Iproduct } from '../../interface/Iproduct';
import { Observable, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  productForm: FormGroup;
  imagePreviews: string[] = [];
  selectedImages: File[] = [];
  imageLinks: string[] = [];
  newImageLink: string = '';

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public router: Router,
    private toastr: ToastrService,
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      price: [0, [Validators.required, Validators.min(50), Validators.max(100000)]],
      description: ['', Validators.required, Validators.minLength(10), Validators.maxLength(1000)],
      dimensions: [''],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      type: ['', Validators.required],
      style: ['', Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      newCategory: ['', Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      categories: [[], Validators.required, Validators.minLength(1)],
      newColor: ['', Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      colors: [[], Validators.required, Validators.minLength(1)],
      newMaterial: ['', Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      materials: [[]],
      newSize: ['', Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      sizes: [[], Validators.required, Validators.minLength(1)],
    });
  }

  onImageSelect(event: any): void {
    const files = event.target.files;
    if (files) {
      this.selectedImages = Array.from(files);
      this.imagePreviews = [];
      Array.from(files).forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.selectedImages.splice(index, 1);
  }

  addToList(listName: string, controlName: string): void {
    const value = this.productForm.get(controlName)?.value;
    if (value && value.trim()) {
      const currentList = this.productForm.get(listName)?.value || [];
      this.productForm.get(listName)?.patchValue([...currentList, value.trim()]);
      this.productForm.get(controlName)?.reset();
    }
  }

  removeFromList(listName: string, index: number): void {
    const currentList = this.productForm.get(listName)?.value || [];
    currentList.splice(index, 1);
    this.productForm.get(listName)?.patchValue([...currentList]);
  }

  private readonly allowedImagePatterns = [
    /^https?:\/\/(?:drive\.google\.com\/uc\?id=|.*\.googleusercontent\.com\/)/,
    /^https?:\/\/(?:www\.)?dropbox\.com\/.*\.(jpg|jpeg|png|gif)/,
    /^https?:\/\/(?:i\.)?imgur\.com\/.*\.(jpg|jpeg|png|gif)/,
    /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|bmp)$/i
  ];
  addImageLink(): void {
    if (this.newImageLink && this.newImageLink.trim()) {
      const url = this.newImageLink.trim();

      if (!this.isValidImageLink(url)) {
        this.toastr.error('Invalid image URL format', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
        return;
      }

      if (this.imageLinks.includes(url)) {
        this.toastr.warning('This image is already added', 'Duplicate');
        return;
      }

      this.imageLinks.push(url);
      this.newImageLink = '';

      this.toastr.success('Image added successfully', 'Success', {
        timeOut: 2000,
        progressBar: true
      });
    }
  }

  removeImageLink(index: number): void {
    this.imageLinks.splice(index, 1);
    this.toastr.info('Image removed', 'Removed', {
      timeOut: 1500
    });
  }


  onSubmit(): void {
    if (this.productForm.invalid || this.imageLinks.length === 0) {
      alert('Please fill all required fields and add at least one image link');
      return;
    }

    this.isLoading = true;

    const formValue = this.productForm.value;
    const newProduct: Iproduct = {
      id: '',
      name: formValue.name,
      price: formValue.price,
      images: this.imageLinks,
      category: formValue.categories,
      color: formValue.colors,
      description: formValue.description,
      material: formValue.materials,
      dimensions: formValue.dimensions,
      quantity: formValue.quantity,
      type: formValue.type,
      sizes: formValue.sizes,
      style: formValue.style,
      rating: 0,
      date: new Date().toISOString()
    };

    this.productService.addNewProduct(newProduct).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.router.navigate(['/new-arrivals']);
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Error adding product. Please try again.');
        this.isLoading = false;
      }
    });
  }

  private isValidImageLink(url: string): boolean {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return false;
    }
    return this.allowedImagePatterns.some(pattern => pattern.test(url));
  }
}



