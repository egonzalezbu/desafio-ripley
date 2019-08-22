import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts() {
    return new Promise((resolve, reject) => {
      this.authService.getHeaders().then((headers) => {
        this.http.get("http://localhost:6060/api/v1/products?wazanigga", headers).subscribe((products) => {
          resolve(products);
        }, (err) => {
          reject(err);
        });
      }, (err) => {
        reject(err);
      });
    });
  }
}
