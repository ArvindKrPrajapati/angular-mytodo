import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class SignupComponent {
  error: string = '';
  isLoading: boolean = false;

  constructor(private _api: ApiService, private _router: Router) {}

  handleSubmit(form: NgForm): void {
    const { email, name, password } = form.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!name) {
      this.error = 'Name is required';
      return;
    }
    if (!emailRegex.test(email)) {
      this.error = 'Invalid Email';
      return;
    }
    if (password.length < 8) {
      this.error = 'Password must be equal to or greater than 8 digit';
      return;
    }
    this.error = '';
    this.isLoading = true;
    this._api.signup({ email, name, password }).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.data));
        this._router.navigate(['/']);
      },
      (err: any) => {
        this.isLoading = false;
        this.error = err.error.error || 'Something went wrong';
      }
    );
  }
}
