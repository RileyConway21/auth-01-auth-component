import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { AuthService } from "./auth.sevice";
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    authService: any;
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (!user) {
            return next.handle(req)
        }
        return this.authService.user.pipe(take(1), exhaustMap(user => {
        const modiefiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
            return next.handle(modiefiedReq);
        }))
        
      
    }
}