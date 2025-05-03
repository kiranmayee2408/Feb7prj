import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from './login-response';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authStatus = new BehaviorSubject<boolean>(false);
  authStatus = this._authStatus.asObservable();

  private setauthstatus(value:boolean){
    this._authStatus.next(value);
  }

  constructor(private http: HttpClient) { }

  login (loginRequest: LoginRequest): Observable<LoginResponse>{
    let url = `${environment.baseUrl}api/Admin/Login`;
    return this.http.post<LoginResponse>(url,loginRequest)
    .pipe(tap(loginResult => {
      if (loginResult.success)
        {
          localStorage.setItem("cit2998",loginResult.token);
          this.setauthstatus(true);
      
        }
    }));
  }
  logout(){
    localStorage.removeItem("cit2998");
    this.setauthstatus(false);
    
      }

  isAuthenticated(): boolean {
   return localStorage.getItem('cit2998') != null;
  }
  
}
