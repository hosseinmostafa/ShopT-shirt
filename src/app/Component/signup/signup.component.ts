import { Component, ElementRef, ViewChild } from '@angular/core';
import { FooterService } from '../../Service/footer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isSignUpMode: boolean = false;
  signupForm: FormGroup;

  @ViewChild('password') password!: ElementRef;
  @ViewChild('icon') icon!: ElementRef;

  constructor(
    private footerService: FooterService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,12}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.footerService.hideFooter();
  }

  ngOnDestroy(): void {
    this.footerService.displayFooter();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePasswordVisibility(passwordField: HTMLInputElement, icon: HTMLElement): void {
    if (passwordField.type === 'text') {
      passwordField.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      passwordField.type = 'text';
      icon.classList.add('fa-eye');
      icon.classList.remove('fa-eye-slash');
    }
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      this.toastr.error('Please fill all fields correctly.', 'Error', {
        positionClass: 'toast-top-right',
        timeOut: 5000
      });
      return;
    }

    const { email, phone, password } = this.signupForm.value;

    this.http.post('https://shop-tt-default-rtdb.firebaseio.com/users.json', { email, phone, password })
      .subscribe({
        next: (res) => {
          this.toastr.success('Signup successful! Please login.', 'Success', {
            positionClass: 'toast-top-right',
            timeOut: 6000
          });
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          this.toastr.error('Signup failed. Please try again.', 'Error', {
            positionClass: 'toast-top-right',
            timeOut: 6000
          });
          console.error(err);
        }
      });
  }
}


