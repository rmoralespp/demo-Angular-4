import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';



// Import RxJs required methods
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


// Local
import { Post } from './post.model';
import { MessageService } from '../core/services/message.service';

@Injectable()
export class PostService {
  private _api_url = 'https://jsonplaceholder.typicode.com/posts';
  private _posts$: BehaviorSubject<Post[]>;
  private _dataStore: { posts: Post[] };
  public  posts$: Observable<Post[]>;
  constructor(
    private http: Http,
    private message_service: MessageService
  ) {
    this._posts$ = <BehaviorSubject<Post[]>> new BehaviorSubject([]);
    this.posts$  = this._posts$.asObservable();
    this._dataStore = {posts: []};
    this.loadPosts();
  }

  loadPosts() {
     this.http.get(this._api_url)
              .map(res => res.json() as Post[])
              .subscribe(
                {
                  next: (posts_data) => {
                    this._dataStore.posts = posts_data;
                    this._posts$.next(Object.assign({}, this._dataStore).posts);
                  },
                  error: (error) => this.handleMessage('error', 'Error al cargar los Posts')
                }
            );
  }



  getPost(id): Observable<Post> {
     return this.posts$.map(posts => posts.find(post => post.id === +id));

  }


  addPost(post: Post) {
    this.http.post(this._api_url + '/', post)
              .map(res => res.json() as Post)
              .subscribe(
                {
                  next : (post_data) => {
                    this._dataStore.posts.push(post_data);
                    this._posts$.next(Object.assign({}, this._dataStore).posts);
                    this.handleMessage('exito', `Post ${post_data.id} registrado con exito`);
                  },
                  error: (error) => this.handleMessage('error', `${error}`)
                }
            );
    }


  updatePost(post: Post) {
    const url = `${this._api_url}/${post['id']}`;
    let control = false;
    this.http.put(url, post)
             .map(res => res.json() as Post)
             .subscribe(
                {
                  next : (post_data) => {
                    this._dataStore.posts.forEach((p, i) => {
                      if (p.id === post_data.id) {
                         this._dataStore.posts[i] = post_data;
                         control = true;
                         }
                    });
                    if (control === true) {
                      this._posts$.next(Object.assign({}, this._dataStore).posts);
                      this.handleMessage('exito', `Post ${post.id} editado con exito`);
                    }
                  },
                  error: (error) => this.handleMessage('error', `${error}`)
                }
            );
  }


  deletePost(post: Post) {
    const url = `${this._api_url}/${post['id']}`;
    this.http.delete(url)
             .subscribe(
                {
                  next : () => {
                    const indice = this._dataStore.posts.indexOf(post, 0);
                    if (indice > -1) {
                      this._dataStore.posts.splice(indice, 1);
                    }
                    this._posts$.next(Object.assign({}, this._dataStore).posts);
                    this.handleMessage('exito', `Post ${post.id} eliminado con exito`);
                  },
                  error: (error) => this.handleMessage('error', `${error}`)
                }
            );
}


searchPosts$(termino: string): Observable<Post[]> {
    return this.posts$.map( posts => posts.filter(post =>
                       post.title.toLowerCase().indexOf(termino.toLowerCase()) != -1 ));
}




handleMessage(tipo, message) {
   this.message_service.showMessage(tipo, message);
}


private jwt() {
  // create authorization header with jwt token
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser && currentUser.token) {
      const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
  }
}






}
