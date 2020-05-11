import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import { LoginUser } from '../model/login-user';
import { User } from '../model/user';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  baseUrl:string =  'https://gotlivedata.io/api/v1';
  constructor(private http: HttpClient) { }

  login(user: LoginUser):Observable<any>{
    console.log(user);
    const url = `${this.baseUrl}/login/`
    return this.http.post(url,user,httpOptions);
  }

}
