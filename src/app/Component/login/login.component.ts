import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FooterService } from '../../Service/footer.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
        positionClass: 'toast-bottom-right', // عرض الرسالة من أسفل اليمين
        timeOut: 5000 // اختفاء الرسالة بعد 5 ثواني
      });
      return;
    }

    const { email, password } = this.loginForm.value;

    // التحقق من وجود المستخدم في Firebase
    this.http.get('https://shop-tt-default-rtdb.firebaseio.com/users.json')
      .subscribe({
        next: (users: any) => {
          const user = Object.values(users).find((u: any) => u.email === email && u.password === password);
          if (user) {
            this.toastr.success('Login successful!', 'Success', {
              positionClass: 'toast-bottom-right', // عرض الرسالة من أسفل اليمين
              timeOut: 5000 // اختفاء الرسالة بعد 5 ثواني
            });
            localStorage.setItem('token', 'your-token-here');
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.toastr.error('Invalid email or password.', 'Error', {
              positionClass: 'toast-bottom-right', // عرض الرسالة من أسفل اليمين
              timeOut: 5000 // اختفاء الرسالة بعد 5 ثواني
            });
          }
        },
        error: (err) => {
          this.toastr.error('Login failed. Please try again.', 'Error', {
            positionClass: 'toast-bottom-right', // عرض الرسالة من أسفل اليمين
            timeOut: 5000 // اختفاء الرسالة بعد 5 ثواني
          });
          console.error(err);
        }
      });
  }
}
// gard--------------------
// onLoginn() {
//   this.http.post('https://egyption-treasure-89099-default-rtdb.firebaseio.com/Users/Login.json', this.loginObj).subscribe((res: any) => {
//     if (res.result) {
//       alert('login success');
//       localStorage.setItem('token', res.data.token);
//       this.router.navigateByUrl('/add-product');
//     } else {
//       alert(res.message);
//     }
//   })
// }
// export class Login {
//   EmailId: string;
//   Password: string;
//   constructor() {
//     this.EmailId = '';
//     this.Password = '';
//   }
// }





// onLogin(): void {
//   if (this.loginForm.invalid) {
//     alert('Please fill all fields correctly.');
//     return;
//   }

//   const { email, password } = this.loginForm.value;

//   // التحقق من وجود المستخدم في Firebase
//   this.http.get('https://shop-tt-default-rtdb.firebaseio.com/users.json')
//     .subscribe({
//       next: (users: any) => {
//         const user = Object.values(users).find((u: any) => u.email === email && u.password === password);
//         if (user) {
//           alert('Login successful!');
//           localStorage.setItem('token', 'your-token-here');
//           this.router.navigateByUrl(this.returnUrl);
//         } else {
//           alert('Invalid email or password.');
//         }
//       },
//       error: (err) => {
//         alert('Login failed. Please try again.');
//         console.error(err);
//       }
//     });
// }