import { createMayBeForwardRefExpression } from '@angular/compiler';
import {TestBed} from '@angular/core/testing'
import { first } from "rxjs";
import { Post } from "src/app/models/Post";
import { PostComponent } from "./post.component";

describe('Post Component', () => {

  let fixture: any;
  let comp: PostComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({

      // we need to test component along with its template so added it in declarations
      declarations: [PostComponent]

    });

    // Fixture:
    /*
      In Angular testing, a fixture is a utility provided by the Angular testing framework that allows you to create and interact with a component in a test environment.
      A fixture is essentially a wrapper around a component instance, providing access to the component's properties and methods in a test environment. The fixture is created using the TestBed class, which is part of the Angular testing framework.
      Once you have created a fixture, you can use it to simulate user interaction with the component and to test the component's behavior under various conditions. You can also use the fixture to query the component's template and test its output.
      In summary, the fixture is an essential tool for unit testing Angular components, as it allows you to isolate the component and test its behavior in a controlled environment.
    */

      fixture = TestBed.createComponent(PostComponent);
      comp = fixture.componentInstance;
  });

  // Tested using TestBed
  it('should create post component using TestBed', () => {
      expect(comp).toBeDefined();
  });

  it('should render the post title in the anchor element', () =>{

    // we need a sample post to render
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
    
    // assign this post that we created to component's post
    comp.post = post;

    // detect changes and update the component
    fixture.detectChanges();

    // access <a> element now. first access whole template of post.component.html
    const postElement: HTMLElement = fixture.nativeElement;

    // since we have only one <a>, direcly searched, else we have to use class name or Ids
    const a = postElement.querySelector('a');

    // assert
    expect(a?.textContent).toContain(post.title);

  });

  // tested without using TestBed
  it('should raise an event when the delete post is clicked', () => {

    const post: Post = { id: 1, body: 'body 1', title: 'title 2' };
    comp.post = post;
    comp.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post);
    });

    comp.onDeletePost(new MouseEvent('click'));
  });
});
