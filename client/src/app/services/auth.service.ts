import { Injectable } from '@angular/core';

declare const firebase: any;

const FIREBASE_ERROR_MESSAGES = {
  "auth/email-already-in-use": "El correo ya se encuentra registrado",
  "auth/user-not-found": "El correo no se encuentra registrado",
  "auth/invalid-email": "Correo inválido",
  "auth/wrong-password": "Contraseña Incorrecta",
  "auth/weak-password": "La Contraseña debe tener al menos 6 caracteres"
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  ready: Promise<null>;

  constructor() {
    this.ready = new Promise((resolve, reject) => {
      // Always keep track about the user state
      firebase.auth().onAuthStateChanged(function(user) {
        this.user = user;
        resolve();
        // Redirect to Login if necessary
        if (user && window.location.pathname === "/login") window.location.href = "/";
        if (!user && window.location.pathname !== "/login") window.location.href = "/login";
      }.bind(this));
    });
  }

  // Do a Login
  login(email, password) {
    return new Promise((resolve, reject) => {
      // Validate against Firebase
      firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        this.user = user;
        resolve(user);
      }, (err) => {
        console.log(err);
        reject(FIREBASE_ERROR_MESSAGES[err.code]);
      }).catch((err) => {});
    });
  }

  // Registe a new user
  register(email, password) {
    return new Promise((resolve, reject) => {
      // Try to register
      firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        this.user = user;
        resolve(user);
      }, (err) => {
        console.log(err);
        reject(FIREBASE_ERROR_MESSAGES[err.code]);
      }).catch((err) => {});
    });
  }

  logout() {
    firebase.auth().signOut();
  }

  // Create headers with the user token
  getHeaders() {
    return new Promise((resolve, reject) => {
      this._getToken().then((token) => {
        resolve({
          headers: {
            token: token
          }
        });
      }, (err) => {
        reject(err);
      });
    });
  }

  // Get the user Firebase token
  _getToken(forceRefresh=false) {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.getIdToken(forceRefresh).then((token) => {
        resolve(token);
      }, (err) => {
        reject(err);
      })
    });
  }
}
