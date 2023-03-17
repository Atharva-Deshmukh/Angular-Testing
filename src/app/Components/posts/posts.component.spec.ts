import { TestBed } from "@angular/core/testing";
import { Post } from "src/app/models/Post";
import { PostService } from "src/app/services/Post/post.service";
import { PostsComponent } from "./posts.component";

describe('Post Component', () => {
  // creating dummy of post[] and initialise it by custom values
  let POSTS: Post[];

  // create instance of post component since we have to use that instance every time to test every finction of the post.component
  let component: PostsComponent;

  // postService is IN TURN dependent on http service but we don't want to call http during testing. Also we have to keep this component isolated
  // hence create mock and inject in postComponent
  let mockPostService: any;

  beforeEach(() => {
    POSTS= [
      {
        id: 1,
        body: 'body 1',
        title: 'title 1'
      },
      {
        id: 2,
        body: 'body 2',
        title: 'title 2'
      },
      {
        id: 3,
        body: 'body 3',
        title: 'title 3'
      }
    ];

      mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost']);

      TestBed.configureTestingModule({
        providers: [
          PostsComponent,
          {
            provide: PostService, 
            useValue: mockPostService
          }
        ]
      });

      component = TestBed.inject(PostsComponent);
  });

  // create separate test suites for every method
  describe('deletePost()',() => {
    it('should delete the selcted post from the post[]', () => {
      component.posts = POSTS;
      component.delete(POSTS[1]);
      expect(component.posts.length).toBe(2);
    });
  });
});
