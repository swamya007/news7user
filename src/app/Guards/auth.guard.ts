import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/loginService/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private snackBar: MatSnackBar, private loginService: LoginService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuth = this.loginService.isLoggedIn();
    let currentUser!: any;
    let isAdmin = false;
    let currentURL = route.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .join('/');
    const awsToken = localStorage.getItem('awsToken');
    if (!isAuth) {
      this.snackBar.open('Un-Authenticated User', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['mat-toolbar', 'mat-primary'],
      });
      this.router.navigate(['/login']).then(r => {});
    }
    return isAuth;
  }
}
