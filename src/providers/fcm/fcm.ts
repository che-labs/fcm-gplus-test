import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
pelupotter
*/
@Injectable()
export class FcmProvider {

    constructor(public http: HttpClient) {

    }

    sendNotification() {

        let url = `https://juango-planta.firebaseio.com/notify`;
        let headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

        return this.http.post(url, {}, { headers: headers})
            .toPromise()
            .then( res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

}
