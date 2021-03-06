import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

// Import RxJs required methods
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/find';

// Import Local
import {PostService} from '../post.service';
import {Post} from '../post.model';

// animaciones
import { trigger, animate, style, state, transition, keyframes} from '@angular/core';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({opacity: 0}),
        animate(1000)
      ]),
      transition('* => void', [
        style({opacity: 0}),
        animate(1000)
      ]),
    ])
  ],
})
export class DetailComponent implements OnInit, OnDestroy {

  public post: Post;
  public subscription_route: any;
  public single_post$: Observable<Post>;
  private page_post: number;
  private scroll_page_post: number;

  constructor(
     private router: Router,
     private route: ActivatedRoute,
     private post_service: PostService,
     private location: Location,
  ) { }

  ngOnInit() {
   this.subscription_route = this.route.params.subscribe(
      (params) => {
          this.scroll_page_post = params['scroll'] || 0;
          this.page_post = params['page'] || 1;
          this.single_post$ = this.post_service.getPost(params['id']);
          this.single_post$.subscribe(
              (res) => this.post = this.clonePost(res),
              (error) => {
                this.post_service.handleMessage('error', `Error al cargar el post ${params['id']}`);
                this.back();
              });
      }
    );
  }


  ngOnDestroy() {
     this.subscription_route.unsubscribe();
  }


  savePost(): boolean {
         this.post_service.updatePost(this.post);
         this.router.navigate(['posts', { page: this.page_post, scroll: this.scroll_page_post }]);
         return false;
  }

  clonePost(original_post: Post): Post {
    console.log('original_post');
    console.log(original_post);
    const post = Object.assign({}, original_post);
    return post;
  }



  back(): void {
    this.router.navigate(['posts', { page: this.page_post, scroll: this.scroll_page_post }]);
  }



}
