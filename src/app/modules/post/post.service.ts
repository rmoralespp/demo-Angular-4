import { Injectable } from '@angular/core';
import {Http} from '@angular/http';



// Import RxJs required methods
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//Local
import {MessageService} from '../shared/message.service';
import {Post} from './post.model';


@Injectable()
export class PostService {
  private api_url :string='https://jsonplaceholder.typicode.com/posts';   
  
  constructor( private http:Http, private message_service:MessageService) { 
      
  }



  public getPosts():Observable<Post[]>{
    
    return this.http.get(this.api_url).
    map(res => {
       return res.json();
    }).
    catch((error:any) => {
      return this.handleError(error);
    });
  
  }


  getPost(id):Observable<Post>{
    let url=`${this.api_url}/${id}`;
    return this.http.get(url).map(res => res.json());
  }

  updatePost(post:Post):Observable<any>{
  
    let url=`${this.api_url}/${post['id']}`;
    return this.http.put(url,post).map(
      () => {
        let message_object=this.make_message('alert-success',` Post ${post.id} editado con exito`);
        this.message_service.add(message_object);
        return post;
      }).catch((error:any) => {
        return this.handleError(error);
      });
  
  };


  deletePost(post:Object):Observable<Post>{
    let url=`${this.api_url}/${post['id']}`;
    return this.http.delete(url).
    map(res => null)
 //  .catch(error => Observable.throw(error.message||{'message':'error del servidor'}))
    
    ;
  }


  handleError(error):Observable<any>{
    let texto_error=error.json().error || 'Error del servidor';
    let message_object=this.make_message('alert-danger',texto_error);
    return Observable.throw(texto_error);

  }














  public make_message(param_class,param_text):Object{
      return {class:param_class,text:param_text}
  }
    
}
