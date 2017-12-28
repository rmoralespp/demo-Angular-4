import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

// animaciones
import { trigger, animate, style, state, transition, keyframes} from '@angular/core';

// Import Local
import {PostService} from '../post.service';
import {Post} from '../post.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
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
export class NewComponent implements OnInit {
  public post: Post;
  private page_post: number;
  private scroll_page_post: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private post_service: PostService,
    private location: Location
  ) { }

  ngOnInit() {
    this.page_post = this.route.snapshot.queryParams['page'] || 1;
    this.scroll_page_post = this.route.snapshot.queryParams['scroll'] || 0;
    this.post = new Post(null, '', '', null);
  }



  savePost(): boolean {
     this.post_service.addPost(this.post);
     this.back();
     return false;
  }

  back() {
    this.router.navigate(['/posts', { page: this.page_post, scroll: this.scroll_page_post }]);
    // this.location.back();
  }

}
