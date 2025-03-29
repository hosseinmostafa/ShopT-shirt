import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  results: any[] = [];
  searchTerm: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.results = navigation.extras.state['results'];
      this.searchTerm = navigation.extras.state['term'];
    }
  }

  ngOnInit(): void {
    if (!this.results.length) {
      this.router.navigate(['/']);
    }
  }
}
