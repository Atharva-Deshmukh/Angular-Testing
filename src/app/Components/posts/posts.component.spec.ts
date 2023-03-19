import { TestBed } from "@angular/core/testing";
import { Post } from "src/app/models/Post";
import { PostService } from "src/app/services/Post/post.service";
import { PostsComponent } from "./posts.component";
import { of } from "rxjs";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { PostComponent } from "../post/post.component";

describe('Posts Component', () => {
  // creating dummy of post[] and initialise it by custom values
  let POSTS: Post[];

  // create instance of post component since we have to use that instance every time to test every finction of the post.component
  let component: PostsComponent;

  // postService is IN TURN dependent on http service but we don't want to call http during testing. Also we have to keep this component isolated
  // hence create mock and inject in postComponent
  let mockPostService: any;

  // create component returns a fixture hence declare it here
  let fixture: any;

  // ADD REAL PostComponent to test parent and child together

  // // create a fake child component to solve <app-post> not recognised error. Since it was the child component
  // @Component({
  //   selector: 'app-post',
  //   template: '<div></div>'
  // })

  // class FakePostComponent {
  //   @Input() post!: Post;  //adding ! sign makes this mandatory (NOT NULL)
  // }

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
        declarations: [PostsComponent, PostComponent],
        providers: [
          {
            provide: PostService, 
            useValue: mockPostService
          }
        ]
        // schemas:[NO_ERRORS_SCHEMA]  //THIS JUST SUPRESSESS ERRORS doesn't remove them
      });

      fixture = TestBed.createComponent(PostsComponent);
      component = fixture.componentInstance;

  });

  it('should set posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    // component.ngOnInit();
    expect(component.posts.length).toBe(3);
  });

  it('should create one post child element for each post', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const postElement = debugElement.queryAll(By.css('.posts'));

    // <div> ki length POSTS.length honi chaiye
    expect(postElement.length).toBe(POSTS.length);
  });

  // jitne <app-post> hai utne child components banne chaiye
  it('should create exact same number of Post Component with Posts', () => {
    
    // ngOnInit() pe getPosts() call hora and it in turn has subscribe in it. usko deal karne ke liye mockservice bulaao
    mockPostService.getPosts.and.returnValue(of(POSTS));

    // call parent's as well as child's ngOnInit()
    fixture.detectChanges();

    // now jitni length hai POSTS ki utne child component hone chaiye
    // used By.directive since in angular, a component is an in-built directive and we have to count component not the element
    const postComponentDebuggElements = fixture.debugElement.queryAll(By.directive(PostComponent));

    expect(postComponentDebuggElements.length).toEqual(POSTS.length);
  });

  // test if the child component is recieving the post or not
  it('should check whether exact post is sent to PostComponent (child-component)', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();

    // get all the child components
    const postComponentDebuggElements = fixture.debugElement.queryAll(By.directive(PostComponent));

    // get details of all child components using loop
    
    for(let i = 0; i < postComponentDebuggElements.length; i++){
      // first child ko sahi post mila ya nhi. 
      // To check that check if @Input() post has correct value or not

      // post ka instance bnaya sabse pehle taaki uski 
      let postComponentInstance = postComponentDebuggElements[i].componentInstance as PostComponent;
      expect(postComponentInstance.post.title).toEqual(POSTS[i].title);
    }
  }); 

});
