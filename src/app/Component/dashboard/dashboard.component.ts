import { Component, HostListener, OnInit } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    { icon: "fa-solid fa-shop", text: 'Posts', active: false, link: '/posts' },
    { icon: "fa-solid fa-chart-simple", text: 'Analytics', active: false, link: '/analytics' },
    { icon: "fa-solid fa-cart-plus", text: 'New Post', active: false, link: '/new-post' },
  ];

  constructor() {
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
    }, 1000);

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
}