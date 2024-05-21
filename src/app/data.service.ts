import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Fungerande API-URL

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const data = localStorage.getItem('cachedData');
    if (data) {
      // Returnera cachad data som Observable
      return of(JSON.parse(data));
    } else {
      // Hämta data från API och cacha det
      return this.http.get<any>(this.apiUrl).pipe(
        tap(response => {
          localStorage.setItem('cachedData', JSON.stringify(response));
        })
      );
    }
  }

  clearCache(): void {
    localStorage.removeItem('cachedData');
  }
}
