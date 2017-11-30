//Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';

//rxJS
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

//Local
import {MessageService} from '../../shared/message.service';
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
  public copia_posts:Post[];
  public message_object: Object;
  public is_delete:boolean;
  
  

  constructor(
    private post_service:PostService, 
    public message_service:MessageService,
    private router:Router
  ) { }

  ngOnInit() {
      this.posts$=this.post_service.posts$;
      this.getPosts();
      this.searchPosts();
      this.listenerMessages();
   

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
                                           res=> this.posts=res,
                                           error=> this.post_service.handleMessage('error',`Error al buscar Post con titulo ${term}`)
                                         )
                                      }
                                      else{
                                         this.posts=this.copia_posts;
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


crearListaPages(num_pages, current_page){
  let izquiera=1
  let derecha=num_pages
  let pagina_actual=current_page
  let final2=[]
  if (pagina_actual > 3){
    izquiera=pagina_actual-2
  }
      
  if(derecha-pagina_actual>3){
    derecha=pagina_actual+2
  }
      
  
  for(let i=izquiera; i<=derecha;i++){
    final2.push(i);
  }
  if(izquiera!=1){
    final2.splice(0, 0, 1);
  }
     
  if(derecha != num_pages){
    final2.push(num_pages)
  }
  return final2
}



}
