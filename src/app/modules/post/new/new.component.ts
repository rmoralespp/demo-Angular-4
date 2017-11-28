import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';


//Import Local
import {PostService} from '../post.service';
import {Post} from '../post.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  public post:Post;
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private post_service:PostService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.post=new Post(null, "","",null);
  }



  savePost():boolean{
     this.post_service.addPost(this.post)
     this.back();  
     return false;
    
  }

  back(){
    this.location.back();
  }

}
