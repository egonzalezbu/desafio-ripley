import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all products
  getProducts() {
    return new Promise((resolve, reject) => {
      this.authService.getHeaders().then((headers) => {
        this.http.get("/api/v1/products", headers).subscribe((products) => {
          resolve(products);
        }, (err) => {
          reject(err);
        });
      }, (err) => {
        reject(err);
      });
    });
  }

  // Get product by SKU
  getProduct(SKU) {
    return new Promise((resolve, reject) => {
      this.authService.getHeaders().then((headers) => {
        this.http.get("/api/v1/products/" + SKU, headers).subscribe((product) => {
          resolve(product);
        }, (err) => {
          reject(err);
        });
      }, (err) => {
        reject(err);
      });
    });
  }
}
