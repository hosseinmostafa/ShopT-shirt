import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../Service/product.service';
import { Router } from '@angular/router';
import { Iproduct } from '../../interface/Iproduct';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  productForm: FormGroup;
  imagePreviews: string[] = [];
  selectedImages: File[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public router: Router // تغيير من private إلى public
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

  onSubmit(): void {
    if (this.productForm.invalid || this.imagePreviews.length === 0) {
      alert('Please fill all required fields and upload at least one image');
      return;
    }

    this.isLoading = true;

    this.productService.uploadImages(this.selectedImages).subscribe({
      next: (imageUrls) => {
        const formValue = this.productForm.value;
        const newProduct: Iproduct = {
          id: '',
          name: formValue.name,
          price: formValue.price,
          images: imageUrls,
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
      },
      error: (err) => {
        console.error('Error uploading images:', err);
        alert('Error uploading images. Please try again.');
        this.isLoading = false;
      }
    });
  }



}