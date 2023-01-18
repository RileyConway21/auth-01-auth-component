import { Component } from '@angular/core';
import { AuthService } from './auth.sevice';
import { AuthService } from './auth.sevice';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
isLoading = false;
error: string = null;

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

this.isLoading = true;


 if (this.isLoginMode){
// ...
} else {
  this.authService.signup(email, password).subscribe(resData =>{
    console.log(resData);
  this.isLoading = false;
  },
   errorMessage => =>{
  console.log(errorMessage);
 this.error = errorMessage;
  this.error = 'An error occured!';
  this.isLoading = false;

  }
  );

 }



  form.reset();
}

}
