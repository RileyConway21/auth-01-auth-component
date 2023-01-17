import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core/testing";

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
    );
    }
}
