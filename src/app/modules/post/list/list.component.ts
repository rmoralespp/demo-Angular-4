import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Local
import {MessageService} from '../../shared/message.service';
import {PostService} from '../post.service';
import {Post} from '../post.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public posts:Post[];
  

  constructor(
    private post_service:PostService, 
    public message_service:MessageService,
    private router:Router
  ) { }

  ngOnInit() {
      this.getPosts();

  }

  

  getPosts(){
    this.post_service.getPosts().subscribe(
      (posts)=> {  this.posts=posts }
    )
  }

 
  detailPost(post:Post){
    this.router.navigate(['/posts',post.id]);
 }



 deletePost(post:Post){
     this.post_service.deletePost(post.id).subscribe(
       () => {
         this.posts.filter(p => p !== post)
       },
       error => {
         
        }
     );
 }


}
