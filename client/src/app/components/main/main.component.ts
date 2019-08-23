import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RemoteService } from '../../services/remote.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products: Array<Object>;
  loading: boolean = true;

  constructor(public authService: AuthService, private remoteService: RemoteService) { }

  ngOnInit() {
    this.authService.ready.then(() => {
      if (this.authService.user) {
        // Get all products
        this.remoteService.getProducts().then((products: Array<Object>) => {
          this.products = products;
          this.loading = false;
        }, (err) => {
          console.log(err);
        });
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  getRouterLink(product) {
    return "/product/" + product.partNumber;
  }

}
