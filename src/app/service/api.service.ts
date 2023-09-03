import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser.interface';
import { IApiResponse } from '../interfaces/iapi.response.interface';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../interfaces/user.model';
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  config = {
    baseUrl: 'https://api.weblisters.com/quiz/?action:',
    getUsersAction: 'getusers&',
    addUserAction: 'adduser&',
    deleteUserAction: 'deleteuser&',
    updateUserAction: 'updateuser&',
    quizStr: 'quiz_user=',
    quiz_user: 218,
    appTokenStr: '&appToken=',
    appToken: '756A9D65D4BE'
  };
  // used for mocks
  baseUrl = 'http://localhost:3000/users/';

  getUsersUrl = `
    ${this.config.baseUrl}${this.config.getUsersAction}${this.config.quizStr}
	+ ${this.config.quiz_user}${this.config.appTokenStr}${this.config.appToken};
  `;
  getUserByIdUrl = `
    ${this.config.baseUrl}${this.config.getUsersAction}${this.config.quizStr}
	  + ${this.config.quiz_user}${this.config.appTokenStr}${this.config.appToken}&id=user id;
  `;
  createUserUrl = `
    ${this.config.baseUrl}${this.config.addUserAction}${this.config.quizStr}
	  + ${this.config.quiz_user}${this.config.appTokenStr}${this.config.appToken}&id=user id;
  `;
  deleteUserUrl = `
    ${this.config.baseUrl}${this.config.deleteUserAction}${this.config.quizStr}
	  + ${this.config.quiz_user}${this.config.appTokenStr}${this.config.appToken}&id=user id;
  `;
  updateUserUrl = `
    ${this.config.baseUrl}${this.config.updateUserAction}${this.config.quizStr}
	  + ${this.config.quiz_user}${this.config.appTokenStr}${this.config.appToken}&id=user id;
  `;
  getUsers(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.baseUrl);
    // return this.http.get<IApiResponse>(this.getUsersUrl);
  }
  getUserById(id: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.baseUrl + id);
    // return this.http.get<IApiResponse>(this.getUserByIdUrl);
  }
  addUser(user: User): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(this.baseUrl, user);
    // return this.http.post<IApiResponse>(this.createUserUrl, user);
  }
  updateUser(user: User): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(this.baseUrl + user.id, user);
    // return this.http.put<IApiResponse>(this.updateUserUrl, user);
  }
  deleteUser(id: number): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(this.baseUrl + id);
    // return this.http.delete<IApiResponse>(this.deleteUserUrl);
  }
}
