import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;

  onswitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
onSubmit(form: NgForm) {
  console.log(form.value);
  form.reset();
}

}
