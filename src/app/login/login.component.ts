import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error: String = '';
  isLoading: boolean = false;

  constructor(private _api: ApiService, private _router: Router) {}

  handleSubmit(form: NgForm): void {
    const { email, password } = form.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
    this._api.login({ email, password }).subscribe(
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
