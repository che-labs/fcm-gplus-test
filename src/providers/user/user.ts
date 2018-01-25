import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {FCM} from "@ionic-native/fcm";

/*
pelupotter
*/
@Injectable()
export class UserProvider {

    constructor(
        private afDB: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private fcm: FCM) {

    }

    userSignup(email: string, password: string, fullName: string): Promise<any> {
        return this.afAuth.auth
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                this.fcm.getToken().then(token => {
                    this.afDB.object(`/userProfile/${user.uid}/`).set({
                        admin: true,
                        email,
                        fullName,
                        token: token
                    });
                });
            });
    }

}
