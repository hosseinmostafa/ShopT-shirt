// analytics.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { AuthService } from '../../../Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  animations: [
      trigger('countAnimation', [
        state('start', style({
          opacity: 0,
          transform: 'translateY(-50px)'
        })),
        state('end', style({
          opacity: 1,
          transform: 'translateY(0)'
        })),
        transition('start => end', animate('500ms ease-out')),
        transition('end => start', animate('500ms ease-in'))
      ])
    ]
})
export class AnalyticsComponent implements OnInit {
  brandCount1: number = 0;
  brandCount2: number = 0;
  brandCount3: number = 0;
  recentOrders: any[] = [];
  currentUser: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadRecentUsers();
    this.loadCurrentUser();
    this.startCounters();
  }

  loadRecentUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.recentOrders = users.slice(0, 5).map(user => ({
          id: user.id,
          name: user.name || user.email.split('@')[0],
          phone: user.phone || 'N/A',
          date: new Date().toLocaleDateString(),
          status: this.getRandomStatus()
        }));
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.toastr.error('Failed to load users', 'Error');
      }
    });
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.toastr.success('User deleted successfully', 'Success');
          this.recentOrders = this.recentOrders.filter(user => user.id !== userId);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          this.toastr.error('Failed to delete user', 'Error');
        }
      });
    }
  }

  loadCurrentUser() {
    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.userService.getLoggedInUser(userEmail).subscribe({
        next: (user) => {
          this.currentUser = user;
        },
        error: (err) => {
          console.error('Error loading current user:', err);
        }
      });
    }
  }

  private getRandomStatus() {
    const statuses = ['completed', 'pending', 'process'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }


  animateValue(start: number, end: number, duration: number, callback: (value: number) => void): void {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      callback(value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  startCounters(): void {
    this.animateValue(0, 100, 2000, (value) => (this.brandCount1 = value));
    this.animateValue(0, 20, 2000, (value) => (this.brandCount2 = value));
    this.animateValue(0, 8291, 2000, (value) => (this.brandCount3 = value));
  }
}