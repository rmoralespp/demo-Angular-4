import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';


@Injectable()
export class UserService {

  private _data_storage: {'users': Array<any>} = {'users': []};
  private _users$: BehaviorSubject<any>;

  constructor(
    private message_service: MessageService,
    private auth_service: AuthService,
  ) {
    this._users$ = new BehaviorSubject([]);
    this.loadUsers();
  }


  loadUsers() {
    const promise_users: Promise<any> = new Promise((resolve, error) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
        resolve(users);
    });

    promise_users.then(
      users => {
        this._data_storage.users = users;
        this._users$.next(Object.assign({}, this._data_storage).users);
      });
  }


  getUsers$() {
    return this._users$.asObservable();
  }

  getUser$(id) {
    return this._users$.map(users => users.find(user => user.id == id));
  }



  createUser(user): Promise<any> {
      return new Promise((resolve, reject) => {
        this.cleanedUser(user)
              .then( user_data => this.saveUser(user_data))
              .then( message => {
                this.message_service.showMessageSuccess(message);
                return resolve();
              })
              .catch( error => {
                this.message_service.showMessageDanger(error);
                return reject();
              });
      });
  }

  cleanedUser(user): Promise<any> {
    return new Promise((resolve, reject) => {
      const duplicate_user = this._data_storage.users.find(u => u.username == user.username);
      if (duplicate_user) {
        return reject(`El usuario ${user.username} ya se encuentra registrado`);
      } else {
        user.id = this._data_storage.users.length + 1;
        return resolve(user);
      }
    });
  }

  saveUser(user): Promise<any> {
      return new Promise((resolve, reject) => {
        this._data_storage.users.push(user);
        localStorage.setItem('users', JSON.stringify(this._data_storage.users));
        this._users$.next(Object.assign({}, this._data_storage).users);
        return resolve(`El usuario ${user.username} se ha registrado con exito`);
      });
  }


  deleteUser(user) {
    const indice = this._data_storage.users.indexOf(user, 0);

    if (indice > -1 ) {
      this._data_storage.users.splice(indice, 1);
      localStorage.setItem('users', JSON.stringify(this._data_storage.users));
      this._users$.next(Object.assign({}, this._data_storage).users);
      this.message_service.showMessage('exito', `User ${user.username} eliminado con exito`);

      if (user.username == JSON.parse(localStorage.getItem('currentUser')).username) {
          this.auth_service.setCurrentUser(null);
      }
    } else {
      this.message_service.showMessage('error', `User ${user.username} no encontrado`);
    }
  }

}
