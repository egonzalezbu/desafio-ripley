import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  email: string;
  password: string;
  newUser: boolean = false;
  errorMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    document.body.style.background = "#2f2f2f";
  }

  login() {
    this.authService.login(this.email, this.password).then(() => {}, (err) => {
      this.errorMessage = err;
    });
  }

  register() {
    this.authService.register(this.email, this.password).then(() => {}, (err) => {
      this.errorMessage = err;
    });
  }

}
