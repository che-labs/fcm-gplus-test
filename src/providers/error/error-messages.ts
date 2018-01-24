import {Injectable} from "@angular/core";

@Injectable()
export class ErrorMessages {

    private messages = {
        'generic': 'Ocurrió un error inesperado.',
        // Firebase
        'auth/app-deleted' : 'No se puede acceder a la aplicación.',
        'auth/app-not-authorized': 'No tienes permisos para acceder.',
        'auth/argument-error': 'Argumentos incorrectos.',
        'auth/invalid-api-key': 'auth/invalid-api-key',
        'auth/invalid-user-token': 'Su sesión a expirado.',
        'auth/network-request-failed': 'No se ha podido conectar a la red, por favor asegúrese de tener conexión.',
        'auth/requires-recent-login': 'Su sesión ha expirado.',
        'auth/too-many-requests': 'Hemos detectado muchos pedidos desde tu aplicación y se ha bloqueado.',
        'auth/unauthorized-domain': 'Dominio no autorizado.',
        'auth/user-disabled': 'Su cuenta ha sido deshabilitada por los administradores.',
        'auth/user-token-expired': 'Su sesión ha expirado',
        'auth/web-storage-unsupported': 'Actualice su navegador.',
        'auth/invalid-disabled-field': 'El valor que se proporcionó para la propiedad de usuario disabled no es válido.',
        'auth/invalid-display-name': 'El valor que se proporcionó para la propiedad de usuario displayName no es válido.',
        'auth/invalid-email-verified': 'El valor que se proporcionó para la propiedad de usuario emailVerified no es válido.',
        'auth/invalid-email': 'La dirección de correo es inválida.',
        'auth/invalid-password': 'Usuario o contraseña incorrecto.',
        'auth/invalid-phone-number': 'El número de teléfono es inválido.',
        'auth/invalid-photo-url': 'La url de la foto es inválida.',
        'auth/invalid-uid': 'El nombre de usuario no debe ser vacío y tiene un máximo de 128 caracteres.',
        'auth/missing-uid':	'Se requiere un identificador uid para la operación actual.',
        'auth/email-already-exists': 'Este nombre de usuario ya está en uso. Elige otro.',
        'auth/user-not-found': 'Usuario o contraseña incorrecto.',
        'auth/operation-not-allowed': 'No tienes permisos para acceder a esta funcionalidad.',
        'auth/invalid-credential': 'auth/invalid-credential',
        'auth/phone-number-already-exists': 'El número de teléfono ya está en uso.',
        'auth/project-not-found': 'auth/project-not-found',
        'auth/insufficient-permission': 'No tienes permisos para acceder a esta funcionalidad.',
        'auth/internal-error': 'Ocurrió un error inesperado.',
        'auth/wrong-password': 'Usuario o contraseña incorrecto.',
        'auth/popup-closed-by-user': 'Login cancelado por el usuario.'
    };

    getMessage(key: string): string {
        let result = this.messages[key];
        if(!result) {
            result = this.getGenericMessage();
            console.warn(`${key} no tiene mensaje de error definido.`);
        }
        return result;
    }

    getGenericMessage() {
        return this.messages['generic']
    }
}
