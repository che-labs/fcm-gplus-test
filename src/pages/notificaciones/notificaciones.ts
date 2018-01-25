import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import {EmailValidator} from "../../validators/email";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserProvider} from "../../providers/user/user";

/**
 pelupotter
 */

@IonicPage()
@Component({
    selector: 'page-notificaciones',
    templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {

    public signupForm: FormGroup;
    public loading: Loading;

    constructor(
        private userProvider: UserProvider,
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private formBuilder: FormBuilder) {

        this.signupForm = this.formBuilder.group({
            email: [
                '',
                Validators.compose([Validators.required, EmailValidator.isValid])
            ],
            password: [
                '',
                Validators.compose([Validators.minLength(6), Validators.required])
            ],
            fullName: [
                '',
                Validators.compose([Validators.minLength(3), Validators.required])
            ]
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NotificacionesPage');
    }

    userSignup() {
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        } else {
            this.userProvider
                .userSignup(
                    this.signupForm.value.email,
                    this.signupForm.value.password,
                    this.signupForm.value.fullName
                )
                .then(() => {
                        this.loading.dismiss().then(() => {
                            this.navCtrl.setRoot('ResumenPage');
                        });
                    },
                    error => {
                        this.loading.dismiss().then(() => {
                            const alert = this.alertCtrl.create({
                                message: error.message,
                                buttons: [{ text: 'Ok', role: 'cancel' }]
                            });
                            alert.present();
                        });
                    }
                );
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    }
}
