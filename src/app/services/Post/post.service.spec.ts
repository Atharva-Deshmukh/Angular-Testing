import { HttpClient } from "@angular/common/http";
import { PostService } from "./post.service";
import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";

describe('Post Service', () => {

    let postService: PostService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    // copied from posts.component.spec.ts
    let POSTS = [
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

    beforeEach(() => {

        // creating mock method for http as we don't want to actually call HTTP client
        let httpClientSpyObj = jasmine.createSpyObj('HttpClient' , ['get']);

       // Try creating service instance using TestBed
      //  also create mock service for httpClient
       TestBed.configureTestingModule({
          providers: [PostService, {
            provide: HttpClient, 
            useValue: httpClientSpyObj
          }]
          
       });

        // use inject() to create instance of postService
        postService = TestBed.inject(PostService);
        
        // creating instance of httpClient using testbed
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

        // postService = new PostService(httpClientSpy);
    });

    describe('getPost()', () => {
        it('should return expected posts when getposts is called', (done: DoneFn) => {

            // return an observable of post. in posts.spec.ts use that POSTS[]
            httpClientSpy.get.and.returnValue(of(POSTS));

            // sometimes when output is comming after sometime, use DoneFn to show output when displayed
            postService.getPosts().subscribe({
                next: (posts) => {
                  expect(posts).toEqual(POSTS);
                  done();
                },
                error: () => {
                  done.fail;
                }
            });

            // http client should be called only once as it uses resources
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });
    });
});
