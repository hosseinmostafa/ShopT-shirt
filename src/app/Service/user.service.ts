// user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://shop-tt-default-rtdb.firebaseio.com/users';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.apiUrl}.json`).pipe(
      map((response: any) => {
        if (!response) return [];
        return Object.keys(response).map(key => ({
          id: key,
          ...response[key]
        }));
      })
    );
  }

  getLoggedInUser(email: string) {
    return this.http.get(`${this.apiUrl}.json`).pipe(
      map((response: any) => {
        if (!response) return null;
        for (const key in response) {
          if (response[key].email === email) {
            return {
              id: key,
              ...response[key]
            };
          }
        }
        return null;
      })
    );
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.apiUrl}/${userId}.json`);
  }
}