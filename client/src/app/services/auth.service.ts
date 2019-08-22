import { Injectable } from '@angular/core';

declare const firebase: any;

const FIREBASE_ERROR_MESSAGES = {
  "auth/email-already-in-use": "El correo ya se encuentra registrado",
  "auth/user-not-found": "El correo no se encuentra registrado, ¿Desea registrarse?",
  "auth/invalid-email": "Correo inválido",
  "auth/wrong-password": "Contraseña Incorrecta"
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: object;
  ready: Promise<null>;

  constructor() {
    this.ready = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        this.user = user;
        resolve();
        if (user && window.location.pathname === "/login") window.location.href = "";
        if (!user && window.location.pathname === "/") window.location.href = "/login";
      }.bind(this));
    });
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        this.user = user;
        resolve(user);
      }, (err) => {
        console.log(err);
        reject(FIREBASE_ERROR_MESSAGES[err.code]);
      }).catch((err) => {});
    });
  }

  register(email, password) {
    return new Promise((resolve, reject) => {
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
