import {Injectable} from "@angular/core";
import {Toast, ToastController} from "ionic-angular";
import {ErrorMessages} from "../providers/error/error-messages";

@Injectable()
export class Toastfactory {

    constructor(protected toastCtrl: ToastController, protected errorMessages: ErrorMessages) {
        toastCtrl.create()
    }

    basic(message: string, position = 'top'): Toast {
        return this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: position
        });
    }

    basicFromError(error: any, position = 'top'): Toast {
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
        return this.basic(text, position);
    }

}