import { Component, ElementRef, ViewChild } from '@angular/core';
import { FooterService } from '../../Service/footer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isSignUpMode: boolean = false;
  signupForm: FormGroup;

  @ViewChild('password') password!: ElementRef;
  @ViewChild('icon') icon!: ElementRef;
  @ViewChild('password2') password2!: ElementRef;
  @ViewChild('icon2') icon2!: ElementRef;
  constructor(
    private footerService: FooterService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,12}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }


  toggleSignUpMode(): void {
    this.isSignUpMode = !this.isSignUpMode;
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
      alert('Please fill all fields correctly.');
      return;
    }
    const { email, phone, password } = this.signupForm.value;
    this.http.post('https://shop-tt-default-rtdb.firebaseio.com/users.json', { email, phone, password })
      .subscribe({
        next: (res) => {
          alert('Signup successful! Please login.');
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          alert('Signup failed. Please try again.');
          console.error(err);
        }
      });
  }
}
