import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

import { GooglePlus } from '@ionic-native/google-plus';
import {Platform} from "ionic-angular";

@Injectable()
export class AuthProvider {

  fireAuth: any;

  googleWebClientId: string = '295061332117-eeecck75ke76dog2hgsep0o7siflqadn.apps.googleusercontent.com';

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase,public googlePlus: GooglePlus,
              private platform: Platform) {
    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.fireAuth = user;
      }
    });
  }

  getUser():firebase.User { return this.fireAuth; }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    firebase.database().ref('/userProfile').child(firebase.auth().currentUser.uid).off();
    //this.googlePlus.logout();
    return this.afAuth.auth.signOut();
    //return firebase.auth().signOut();
  }

  loginWithGoogle() {
    if (this.platform.is('cordova')) {
      return this.googlePlus.login({webClientId: this.googleWebClientId}).then(googleData => {
        let provider = firebase.auth.GoogleAuthProvider.credential(googleData.idToken);
        this.afAuth.auth.signInWithCredential(provider).then(firebaseData => {
          console.log("Firebase success: " + JSON.stringify(firebaseData));
        }).catch(error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    } else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  googleLogin(): Promise<any> {
    return this.googlePlus.login({
      'webClientId': this.googleWebClientId,
      'offline': true
    }).then( res => {
      const credential = firebase.auth.GoogleAuthProvider.credential(res.idToken);

      this.afAuth.auth.signInWithCredential(credential)
        .then( success => {
          console.log("Firebase success: " + JSON.stringify(success));
        })
        .catch(error => console.log("Firebase failure: " + JSON.stringify(error)));
    }).catch(err => console.error("Error: ", err));
  }
}
