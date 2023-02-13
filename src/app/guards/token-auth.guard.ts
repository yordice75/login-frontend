import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthGuard implements CanActivate, CanLoad {
  constructor( private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return (localStorage.getItem('token') ? of(true) : of(false).pipe(
      tap( (resp) => { 
        if(!resp) this.router.navigateByUrl('/auth/login');
      } )));
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return localStorage.getItem('token') ? true : false;
  }
}
