import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RemoteService } from '../../services/remote.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService, private remoteService: RemoteService) { }

  ngOnInit() {
    this.authService.ready.then(() => {
      if (this.authService.user) {
        this.remoteService.getProducts().then((products) => {
          console.log(products);
        }, (err) => {
          console.log(err);
        });
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
