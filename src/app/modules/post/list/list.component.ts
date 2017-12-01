//Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';

//rxJS
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

//Local
import {MessageService} from '../../shared/message.service';
import {PagerService} from '../../shared/pager.service';
import {PostService} from '../post.service';
import {Post} from '../post.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  private subscription_post:any;
  public searchField:FormControl;
  public posts$: Observable<Post[]>
  public posts: Post[];
  public page_posts: Post[];
  public copia_posts:Post[];
  public message_object: Object;
  public is_delete:boolean;
  public pager:any;
  
  

  constructor(
    private post_service:PostService, 
    public message_service:MessageService,
    public pager_service:PagerService,
    private router:Router
  ) { }

  ngOnInit() {
      this.posts$=this.post_service.posts$;
      this.getPosts();
      this.searchPosts();
      this.listenerMessages();
     
   

  }

  setPage(page: number) {
    this.pager = this.pager_service.getPager(this.posts.length, page);
    
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    this.page_posts = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
    
    
    
    
}

  ngOnDestroy(){
    this.subscription_post.unsubscribe()
 }

  searchPosts(){
    this.searchField = new FormControl();
    this.searchField.valueChanges.debounceTime(400)
                                 .distinctUntilChanged()
                                 .subscribe(term => {
                                      if(term != "") {     
                                         this.post_service.searchPosts$(term)
                                         .subscribe(
                                           res=> {
                                            this.posts=res,
                                            this.setPage(1);
                                           },
                                           error=> this.post_service.handleMessage('error',`Error al buscar Post con titulo ${term}`)
                                         )
                                      }
                                      else{
                                         this.posts=this.copia_posts;
                                         this.setPage(1);
                                      }
                                      
                                    });
  }


  toogleDelete(post){
    post.is_delete?post.is_delete=false:post.is_delete=true;
  }

  

  getPosts(){
   this.subscription_post = this.posts$.subscribe(
      (posts)=> {  
        this.posts=posts;  
        this.copia_posts=posts; 
        this.setPage(1);
       }
    )
  }


 
  detailPost(post:Post){
    this.router.navigate(['/posts',post.id]);
 }



 deletePost(post:Post){
     this.post_service.deletePost(post);
 }

 listenerMessages(){
  this.post_service.message_emitter.subscribe(
    (message_object) =>{
      this.message_object=message_object;
    }
  );
}






}
