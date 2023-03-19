import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

let testUrl = '/data';

interface Data {
    name: string;
}

describe('HTTP CLIENT MODULE TESTING ONLY', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({

            // every http dependency will be taken care by this module. like humko get ke liye spyObj nhi bnana padega
            // and actual http calls are not made
            imports: [HttpClientTestingModule],
        });

        // create instance of httpClient
        httpClient = TestBed.inject(HttpClient);

        // creating instance of HttpTestcontroller to take care of request calls in backend
        // we can test wheteher the calls have been made or not and what type of calls have been made
        httpTestingController = TestBed.inject(HttpTestingController);
    });

  // making test specs
  it('should call the testUrl with get Request', () => {

    // sample test data
    const testData: Data = {name: 'Atharva'};

    // actual httpService is called only after subscribe() is applied
    // this makes actual calls and consumes actual resources
    // for this reason angular provides with httptestingmodule
    httpClient.get<Data>(testUrl).subscribe((data) => {
        expect(data).toEqual(testData);
    });

    // http call is made just once
    const request = httpTestingController.expectOne('/data');

    // send this data to the URL
    request.flush(testData);

    // check if get request is made or not
    expect(request.request.method).toBe('GET');
  });
});