import { Injectable, EventEmitter } from '@angular/core';
import {Http} from '@angular/http';



// Import RxJs required methods
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


//Local
import {Post} from './post.model';


@Injectable()
export class PostService {
  private _api_url : string='https://jsonplaceholder.typicode.com/posts';  
  private _posts$: BehaviorSubject<Post[]>;
  private _dataStore: { posts: Post[]};
  public  message_emitter: EventEmitter<Object>
  public  posts$: Observable<Post[]>;
 
   
  constructor( private http:Http) { 
    this._posts$ = <BehaviorSubject<Post[]>> new BehaviorSubject([]);
    this.posts$  = this._posts$.asObservable();
    this._dataStore={posts: []};
    this.message_emitter= new EventEmitter();
    this.loadPosts();
  }



 
  loadPosts(){
     this.http.get(this._api_url) 
              .map(res => res.json() as Post[])
              .subscribe(   
                {
                  next: (posts_data) => {
                    this._dataStore.posts = posts_data;
                    this._posts$.next(Object.assign({},this._dataStore).posts);
                  },
                  error: (error) => this.handleMessage("error","Error al cargar los Posts")  
                }
            )
  }



  getPost(id):Observable<Post>{
    let url=`${this._api_url}/${id}`;
    return this.http.get(url)
                    .map(res => res.json() as Post);
  }


  addPost(post: Post){
    this.http.post(this._api_url,post)
              .map(res => res.json() as Post)
              .subscribe(
                { 
                  next :(post_data)=>{
                    this._dataStore.posts.push(post_data);  
                    this._posts$.next(Object.assign({}, this._dataStore).posts);
                    this.handleMessage("exito",`Post ${post.id} registrado con exito`) 
                  },
                  error: (error)=> this.handleMessage("error",`Error al registar el Post ${post.id}`)
                } 
            )
    }


  updatePost(post:Post){
    let url=`${this._api_url}/${post['id']}`;
    this.http.put(url,post)
             .map(res => res.json() as Post)
             .subscribe(
                { 
                  next :(post_data)=>{
                    this._dataStore.posts.forEach((p, i) => {
                      if (p.id === post_data.id) { this._dataStore.posts[i] = post_data; }
                    });
                    this._posts$.next(Object.assign({}, this._dataStore).posts);
                    this.handleMessage("exito",`Post ${post.id} editado con exito`) 
                  },
                  error: (error)=> this.handleMessage("error",`Error al editar el Post ${post.id}`)
                } 
            )
                   
  
  };


  deletePost(post:Post){
    let url=`${this._api_url}/${post['id']}`;
    this.http.delete(url)
             .subscribe(
                { 
                  next :()=>{
                    let indice=this._dataStore.posts.indexOf(post,0);
                    indice > -1 ? this._dataStore.posts.splice(indice,1):this._dataStore;                
                    this._posts$.next(Object.assign({}, this._dataStore).posts);
                    this.handleMessage("exito",`Post ${post.id} eliminado con exito`)
                  },
                  error: (error)=> this.handleMessage("error",`Error al eliminar el Post ${post.id}`)
                } 
            )
                   
}


searchPosts$(termino:string):Observable<Post[]>{
    return this.posts$.map( posts => posts.filter(post=> 
                        {
                          return post.title.toLowerCase().indexOf(termino.toLowerCase()) !== -1
                        })
                      )
}




handleMessage(tipo,message){
  let msg:{class:string, text:string}={class:'',text:message};
  (tipo == 'error')? msg.class="alert-danger":msg.class="alert-success"
  this.message_emitter.emit(msg);
}


}
