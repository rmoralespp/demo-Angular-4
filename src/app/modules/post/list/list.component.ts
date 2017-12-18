//Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

//rxJS
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

//Local
import { MessageService } from '../../core/services/message.service';
import { PagerService } from '../../shared/pager.service';
import { PostService } from '../post.service';

import { Post } from '../post.model';


//animaciones

import { trigger, animate, style, state, transition} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations:[
    trigger('animacion',[
      state('inactive', style({
        transform:'scale(1)'
      })),
      state('inactive', style({
        transform:'scale(1.2)'
      })),
      transition('inactive => active',   animate('100ms ease-in')),
      transition('active   => inactive', animate('100ms ease-out')),
    ])
    
  ],
})



export class ListComponent implements OnInit, OnDestroy {

  private subscription_post:any;
  public searchField:FormControl;
  public posts$: Observable<Post[]>
  public posts: Post[];
  public page_posts: Post[];
  public copia_posts:Post[];
  public is_delete:boolean;
  public pager:any;
  private current_page:number = 1;
  private scroll_current_page:number = 1;
  
  estado1 = 'inactive';
  esatod2 = 'inactive';
  


  constructor(
    private post_service:PostService, 
    public message_service:MessageService,
    public pager_service:PagerService,
    private router:Router,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
      this.route.params.subscribe(
        params => {
          //se utiliza el signo + es para convertir a numero
          this.current_page = +params['page'] || 1;
          this.scroll_current_page = +params['scroll'] || 0; 
          this.getPosts();
          this.searchPosts();
        }
      )
  }


  

  setPage(page: number) {
    this.pager = this.pager_service.getPager(this.posts.length, page);
    this.current_page = page;
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    this.page_posts = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
    
    
    
    
}

  ngOnDestroy(){
    this.subscription_post.unsubscribe();
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
    post.is_delete?post.is_delete = false:post.is_delete = true;
  }

  

  getPosts(){
   this.subscription_post = this.post_service.posts$.subscribe(
      (posts)=> {  
        this.posts = posts;  
        this.copia_posts = posts; 
        this.update_posicion_page();
       }
    )
  }

  update_posicion_page(){
    this.setPage(this.current_page);
    window.scrollTo(0,this.scroll_current_page);
  }



  newPost(){
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    this.router.navigate(['/posts','new'], {queryParams:{scroll:scroll,page:this.current_page}});
    return false
  }
 
  detailPost(post:Post){
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    this.router.navigate(['/posts',post.id,{scroll:scroll,page:this.current_page}]);
 }



 deletePost(post:Post){
   if(localStorage.getItem('currentUser')) {
    this.post_service.deletePost(post);
   }
   else {
     this.message_service.showMessageWarning('No esta autorizado para realizar esta accion');
   }
     
 }



 ordenar_field(field, tipo='asc'):void{
  let resultado = null;
  this.posts.sort((a,b)=>{
    switch(field){ 
      case "id":
         resultado = (tipo == 'asc') ? a.id - b.id: b.id - a.id;       
         break;
      
      case "title":
         resultado = (tipo == 'asc') ? a.title.localeCompare(b.title): b.title.localeCompare(a.title);       
         break;

      case "body":
         resultado = (tipo == 'asc') ? a.body.localeCompare(b.body):  b.body.localeCompare(a.body);       
         break;
    }
  return resultado;  
})
this.update_posicion_page();
} 


}
