import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';


//Import Local
import {PostService} from '../post.service';
import {Post} from '../post.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  public post:Post;
  public subscription_route:any;
  constructor(
     private router:Router,
     private route: ActivatedRoute,
     private post_service:PostService,
     private location: Location,
  ) { }

  ngOnInit() {
   this.subscription_route= this.route.params.subscribe(
      (params)=>{
          this.post_service.getPost(params['id']).subscribe(
              (res)=> this.post=res,
              (error)=> alert(<any>error)
          );
      })
  }


  ngOnDestroy(){
  this.subscription_route.unsubscribe()
  }


  savePost(){
         this.post_service.updatePost(this.post).subscribe(
           ()=>{
              this.back();
                
           }
         )
  }



  back(){    
      // window.history.back();
        // this.location.back();
      this.router.navigate(["posts"]);
      }



}
