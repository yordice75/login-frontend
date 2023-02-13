import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, catchError, of } from 'rxjs';
import { AuthUser } from '../interfaces/auth-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = 'http://localhost:3000/api';
  private _user!: AuthUser;
  constructor( private http: HttpClient ) { }


  get user(){
    return {...this._user};
  }
  registerUser ( username:string, password: string ){
    const url = `${this._baseUrl}/auth/register`;
    const body = {
      username,
      password
    }

    return this.http.post<AuthUser>( url, body )
    .pipe(
      tap( (resp) => {
        //save token in localstorage
        if(resp.token) localStorage.setItem('token', resp.token);
        this._user = resp;
      }),
      catchError( err => {
        return of(err.error);
      })
    );
  }


  loginUser ( username:string, password: string ){
    const url = `${this._baseUrl}/auth/login`;
    const body = {
      username,
      password
    }

    return this.http.post<AuthUser>( url, body )
    .pipe(
      tap( (resp) => {
        //save token in localstorage
        if(resp.token) localStorage.setItem('token', resp.token);
        this._user = resp;
      }),
      catchError( err => {
        return of(err.error);
      })
    );
  }
 
}
