import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { catchError, tap } from "rxjs/operators";
import { Subject, throwError } from 'rxjs';
import { Injectable } from "@angular/core";
import { User } from "./user.model";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email; string;
    refreshedToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
user = new Subject<User>();

    constructor(private http: HttpClient) { }

    singup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyparty/signupNewUser?key=aIzaSyDb0xTaRAoxyCgvaDF3kk5VYOsTwb_3o7Y',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
           this.handleAuthentication(resData.email, resData.localId, resData.idToken,  +resData.expiresIn);
        }));
    }


    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=aIzaSyDb0xTaRAoxyCgvaDF3kk5VYOsTwb_3o7Y',
            {
                email: email,
                password: password,
                returnSecureToken: true

            }
        ).pipe(catchError(this.handleError));
    }

    private handleAuthentication (email: string, userId: string, token: string, expiresin: number) {
        const expirationData = new Date(new Date().getTime() + expiresin * 1000); 
        const user = new User(email, userId, token, expirationData);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error Occured';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'this email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
        }
        return throwError(errorMessage);

    }
}
