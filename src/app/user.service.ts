import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { myToken } from './userDataFormat';
import { Observable, throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  insuredGetUrl = 'https://www.insuredmine.xyz/api/api/companies/getCompanyData';
  insuredPostUrl = 'https://www.insuredmine.xyz/api/api/companies/';
  auth = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjMyMWFlNWY1MDE0Yjc4MGY1MjI4NTYiLCJyb2xlIjoiYWdlbnQiLCJpYXQiOjE1NTA2NTU1OTh9.60z2gqsWBDrnoh3Mp7iX9hnPvUUS23D7K7xTWgroNOU';

  httpOption = {
    headers: new HttpHeaders ( {Authorization : this.auth, type : 'agent',Content_type : 'Application/json' })
  };

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.insuredGetUrl,this.httpOption)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  addData(addData: []) {
    return this.http.post(this.insuredPostUrl,addData,this.httpOption)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  loadCompanyData(id: any) {
    return this.http.get(this.insuredPostUrl+id,this.httpOption)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  editData(editData: any,id: any) {
    return this.http.put(this.insuredPostUrl+id,editData,this.httpOption)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  deleteData(id: any) {
    return this.http.delete(this.insuredPostUrl+id,this.httpOption)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  loginUser(user: any[]): Observable <myToken> {
    return this.http.post<myToken>('https://reqres.in/api/login',user,this.httpOption)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  userReg(uReg: any[]): Observable <myToken> {
    return this.http.post<myToken>('https://reqres.in/api/register',uReg,this.httpOption)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(
        'Status Code: ', error.status + ' Message body was: '+ error.error);
    }
    return throwError(error);
  };

}
