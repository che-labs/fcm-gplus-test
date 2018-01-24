import {Component} from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../../validators/email';
import {AuthProvider} from '../../providers/auth/auth';
import {AlertFactory} from "../../utils/AlertFactory";
import {HomePage} from "../home/home";

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
              public alertFactory: AlertFactory, public authProvider: AuthProvider,
              public formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  loginUser(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.loading = this.loadingCtrl.create();
      this.loading.present();

      this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then( auth => {
          this.loading.dismiss().then( () => {
            this.navCtrl.setRoot('HomePage');
          });
        })
        .catch( error => {
          this.loading.dismiss().then( () => {
            let alert = this.alertFactory.basicFromError(error);
            alert.present();
          });
        });
    }
  }

  googleLogin(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.authProvider.loginWithGoogle()
      .then(data => {
        console.log(data);
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot('HomePage');
        });
      }).catch( error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertFactory.basicFromError(error);
        alert.present();
      });
    });
  }

  goToSignup(): void {
    this.navCtrl.push('signup');
  }

  goToResetPassword(): void {
    this.navCtrl.push('reset-password');
  }

}
