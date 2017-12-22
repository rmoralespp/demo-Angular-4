import { Injectable, EventEmitter } from '@angular/core';



// Import RxJs required methods
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  public _user$: BehaviorSubject<any>;
  public user:  Object;

  constructor() {
    this.user   = JSON.parse(localStorage.getItem('currentUser')) || null;
    this._user$ = new BehaviorSubject(this.user);
  }


  setCurrentUser(user): void {
    this.user = user;
    this._user$.next(user);
  }


  getCurrentUser$() {
     return this._user$.asObservable();
  }



  login(username, password): Observable<any> {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const observable_login = Observable.create( function subscribe(observer){
        const user: any = {username, password};
        const filtered_users = users.filter(user_each => {
          return username === user_each.username && password === user_each.password;
        });

        if (filtered_users.length == 0) {
          this.user = null;
          observer.error('Credenciales invalidas');
        } else {
          user.token = 'fake-jwt-token';
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.user = user;
          observer.next(this.user);
        }
      });
      return observable_login;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.setCurrentUser(null);
  }




  createUser(user): Promise<any> {
    const promise_create = new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      user.id = users.length + 1;
      resolve(user);
    });
    return promise_create;

  }
}
