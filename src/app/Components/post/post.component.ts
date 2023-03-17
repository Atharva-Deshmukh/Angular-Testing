import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  // post component will recieve post data as input parameter of type Post or null. initialised to NULL 

  // Input() and Output() are used to pass data between parent child components
  @Input() post!: Post;
  @Output() delete: EventEmitter<Post>= new EventEmitter<Post>();

  onDeletePost(event: Event){
    event.stopPropagation();
    this.delete.emit(this.post);
  }

}
