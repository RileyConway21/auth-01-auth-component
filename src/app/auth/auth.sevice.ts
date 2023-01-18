import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core/testing";
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email; string;
    refreshedToken: string;
    expiresIn: string;
    localId: string;
}


@Injectable({providedIn: 'root'})
export class  AuthService {
constructor(private http: HttpClient) {}

    singup(email: string, password: string){
return this.http.post<AuthResponseData>(
    'https://www.googleapis.com/identitytoolkit/v3/relyparty/signupNewUser?key=aIzaSyDb0xTaRAoxyCgvaDF3kk5VYOsTwb_3o7Y'
{
    email: email,
    password: password,
    returnSecureToken: true 
}
    ).pipe(catchError(errorRes => { 
        let errorMessage = 'An unknown error Occured';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already!';
      }
      return throwError(errorMessage);
    }));
    }
}
