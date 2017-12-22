import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  loading = false;

  constructor(
      private router: Router,
      private http: Http,
      private user_service: UserService,
    ) { }

  ngOnInit() {
  }

  register() {
      this.loading = true;
      this.user_service.createUser(this.model)
          .then( ()  =>  {
            this.loading = false;
            this.router.navigate(['/auth/login']);
          })
          .catch(() => this.loading = false);
        }

}
