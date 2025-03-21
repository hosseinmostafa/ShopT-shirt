import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FooterService } from '../../Service/footer.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isSignUpMode: boolean = false;
  loginForm: FormGroup;
  returnUrl: string = '/';

  @ViewChild('password') password!: ElementRef;
  @ViewChild('icon') icon!: ElementRef;

  constructor(
    private footerService: FooterService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService // استخدام AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.footerService.hideFooter();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy(): void {
    this.footerService.displayFooter();
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
  onLogin(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill all fields correctly.', 'Error', {
        positionClass: 'toast-top-right',
        timeOut: 5000
      });
      return;
    }

    const { email, password } = this.loginForm.value;

    this.http.get('https://shop-tt-default-rtdb.firebaseio.com/users.json')
      .subscribe({
        next: (users: any) => {
          const user = Object.values(users).find((u: any) => u.email === email && u.password === password);
          if (user) {
            this.toastr.success('Login successful!', 'Success', {
              positionClass: 'toast-top-right',
              timeOut: 6000
            });
            this.authService.login('your-token-here'); // تسجيل الدخول
            this.authService.setUserRoles(['Admin']); // تعيين الأدوار (مثال)
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.toastr.error('Invalid email or password.', 'Error', {
              positionClass: 'toast-top-right',
              timeOut: 6000
            });
          }
        },
        error: (err) => {
          this.toastr.error('Login failed. Please try again.', 'Error', {
            positionClass: 'toast-top-right',
            timeOut: 6000
          });
          console.error(err);
        }
      });
  }
}