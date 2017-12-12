import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


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
      private http:Http
    ) { }

  ngOnInit(){
    console.log(localStorage.getItem('users'));
    
  }

  register() {
      this.loading = true;
      return this.http.post('/api/users', this.model)
          .map((response: Response) => response.json())
          .subscribe(
              data => {
                  this.router.navigate(['/auth/login']);
              },
              error => {
                  this.loading = false;
              });
  }

}
