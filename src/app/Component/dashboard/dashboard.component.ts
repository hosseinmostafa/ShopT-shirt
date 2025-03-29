import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LucideAngularModule, FileCog } from 'lucide-angular';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isSidebarHidden = false;
  isMobile = false;
  currentVideoIndex = 0;
  videos: HTMLVideoElement[] = [];
  isLoading = true;

  menuItems = [
    { icon: "fa-solid fa-chart-line", text: 'Analytics', active: true, link: '/analytics' },
    // { icon: "fa-solid fa-shop", text: 'Posts', active: false, link: '/posts' },
    { icon: "fa-solid fa-cart-plus", text: 'New Post', active: false, link: '/new-post' },
    // { icon: "fa-regular fa-pen-to-square", text: 'Edit Post', active: false, link: '/edit-post' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  ngOnInit(): void {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 900,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });

    this.setupVideos();

    setTimeout(() => {
      this.isLoading = false;
      console.log('Splash Screen');
    }, 5000);

    document.addEventListener('click', () => {
      this.playVideo(this.currentVideoIndex);
    });
  }

  playVideo(index: number) {
    try {
      this.videos.forEach(video => video.classList.remove('active'));
      this.videos[index].classList.add('active');
      this.videos[index].play().catch((error) => {
        console.warn(error);
      });
    } catch (error) {
      console.warn(error);
    }
  }

  setupVideos() {
    this.videos = [
      document.getElementById('video1') as HTMLVideoElement,
      document.getElementById('video2') as HTMLVideoElement,
    ];

    if (this.videos.length === 0) return;

    this.videos.forEach((video) => {
      video.addEventListener('loadeddata', () => {
        console.log(video.src);
      });
    });

    this.playVideo(this.currentVideoIndex);

    this.videos.forEach((video, index) => {
      video.onended = () => {
        this.playNextVideo();
      };
    });
  }


  playNextVideo() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
    this.playVideo(this.currentVideoIndex);
  }

  showAlert: boolean = true;
  message: string = 'Sign up and get 20% off to your first order 🎉';
  button: string = 'Sign Up Now';
  showNavbar: boolean = true;
  cartItemCount: number = 0;
  isLoggedIn: boolean = false;
  currentLink: string = '';

  showCustomAlert: boolean = false;
  alertTitle: string = '';
  alertMessage: string = '';
  showCustomAlertMessage() {
    this.alertTitle = 'Confirm exit';
    this.alertMessage = 'Are you sure you want to log out?';
    this.showCustomAlert = true;
  }

  onUserIconClick() {
    if (this.isLoggedIn) {
      this.showCustomAlertMessage();
    } else {
      this.router.navigate(['/signup']);
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}