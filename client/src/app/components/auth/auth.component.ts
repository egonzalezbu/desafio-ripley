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
  loading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    document.body.style.background = "#2f2f2f";
  }

  // Login existing User
  login() {
    if(!this.email || !this.password) return;
    this.loading = true;
    this.authService.login(this.email, this.password).then(() => {}, (err) => {
      this.errorMessage = err;
      this.loading = false;
    });
  }

  // Register new User
  register() {
    if(!this.email || !this.password) return;
    this.loading = true;
    this.authService.register(this.email, this.password).then(() => {}, (err) => {
      this.errorMessage = err;
      this.loading = false;
    });
  }

}
