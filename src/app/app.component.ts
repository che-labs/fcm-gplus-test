import {Component, OnDestroy} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {AngularFireAuth} from "angularfire2/auth";
import {AuthProvider} from "../providers/auth/auth";
import {Subscription} from "rxjs/Subscription";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnDestroy{
  rootPage:any = 'login';

  private authListener: Subscription;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public afAuth: AngularFireAuth, public auth : AuthProvider) {

    this.authListener = afAuth.authState.subscribe( user => {
      if (user){
        this.rootPage = 'HomePage';
      } else {
        this.rootPage = 'login';
      }
      //this.nav.setRoot(this.rootPage);
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnDestroy(){
    if(this.authListener){
      this.authListener.unsubscribe();
    }
  }
}

