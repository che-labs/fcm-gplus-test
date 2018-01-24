import {Injectable} from "@angular/core";
import {Alert, AlertController, AlertOptions} from "ionic-angular";
import {ErrorMessages} from "../providers/error/error-messages";
/**
 * Created by dalep0 on 10/26/17.
 */
@Injectable()
export class AlertFactory {

    constructor(public alertCtrl: AlertController, public errorMessages: ErrorMessages) {

    }

    basic(message: string, handler?: any): Alert {
        let alertOptions : AlertOptions = {
            message: message,
            buttons: [
                {
                    text: "Aceptar",
                    role: 'cancel',
                    handler: handler
                }
            ]
        };
        return this.alertCtrl.create(alertOptions);
    }

    basicFromError(error: any, handler?: any): Alert {
        let text: string = '';
        if(typeof error === 'string') {
            text = error;
        }
        else if(error.code) {
            text = this.errorMessages.getMessage(error.code);
            if(!text)
                text = this.errorMessages.getGenericMessage();
        }
        else if(error.message) {
            text = error.message;
        }
        return this.basic(text, handler);
    }

}
