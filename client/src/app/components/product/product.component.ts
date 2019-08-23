import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RemoteService } from 'src/app/services/remote.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productSKU: string;
  product: any;
  selectedImage: string;

  constructor(
    private route: ActivatedRoute,
    private remote: RemoteService,
    public authService: AuthService,
    ){}

  ngOnInit() {
    this.authService.ready.then(() => {
      // Get product SKU from params
      this.route.params.subscribe((params) => {
        this.productSKU = params['sku'];
        this._getProduct();
      });
    });
  }

  // Get product from API based on the SKU
  _getProduct() {
    this.remote.getProduct(this.productSKU).then((product) => {
      this.product = product;
      this.selectedImage = this.product.images[0];
    });
  }

  logout() {
    this.authService.logout();
  }

  setImage(image) {
    this.selectedImage = image;
  }

  isImageSelected(image) {
    return this.selectedImage === image;
  }

}
