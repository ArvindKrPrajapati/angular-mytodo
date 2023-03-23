import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // if i am logged in and i m on login page or register send me to home
    if (localStorage.getItem('token')) {
      if (
        route.url.toString() == 'login' ||
        route.url.toString() == 'register'
      ) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    // if i am "NOT" logged in and i m on login page or register let me stay

    if (route.url.toString() == 'login' || route.url.toString() == 'register') {
      return true;
    }

    // if i am "NOT" logged in and i m on any othr route then send me to login page

    this.router.navigate(['/login']);
    return false;
  }
}
