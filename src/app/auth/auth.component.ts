import { Component } from '@angular/core';
import { AuthService } from './auth.sevice';

import { AuthService } from './auth.sevice';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private authService; AuthService) {}

  onswitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
onSubmit(form: NgForm) {
  if (!form.valid) {
    return;
  }
 const email = form.value.email;
 const password = form.value.password;

 if (this.isLoginMode){
// ...
} else {
  this.authService.signup(email, password).subscribe(resData =>{
    console.log(resData);
  
  },
   error =>{
  console.log(error);
  }
  );

 }



  form.reset();
}

}
