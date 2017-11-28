import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

// Import RxJs required methods
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/find';

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
  public single_post$:Observable<Post>;


  constructor(
     private router:Router,
     private route: ActivatedRoute,
     private post_service:PostService,
     private location: Location,
  ) { }

  ngOnInit() {

   this.subscription_route= this.route.params.subscribe(
      (params)=>{
         this.single_post$=this.post_service.posts$
                               .map(posts=>posts.find(post=>post.id == params['id']));
          this.single_post$.subscribe(
              (res)=> this.post=res,
              (error)=> {
                this.post_service.handleMessage("error",`Error al cargar el post ${params['id']}`)
                this.back();
              }
          );
      })
  }



 


  ngOnDestroy(){
     this.subscription_route.unsubscribe()
  }


  savePost():boolean{
         this.post_service.updatePost(this.post);
         this.location.back();
         return false;
  }



  back(){    
      // window.history.back();
         this.location.back();
      //this.router.navigate(["posts"]);
      }



}
