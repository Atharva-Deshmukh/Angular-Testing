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
            // and actual http calls are not made(check console)
            imports: [HttpClientTestingModule],
        });

        // create instance of httpClient
        // http client requires hhtp client backend handler to make real get() requests
        // the httptesting module injects testing backend handler that simulates the http calls
        // HENCE RESOURCES ARE NOT CONSUMED WHILE TESTING
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
    // console.warn("Request => ",request);

    // send this data to the URL
    request.flush(testData);

    // check if get request is made or not
    expect(request.request.method).toBe('GET');
  });

    //testing multiple http URLs
 it('should test multiple requests', () => {
    const testData: Data[] = [{ name: 'Atharva'}, {name: 'Atharva Deshmukh'}];

    // making multiple http calls with separate inputs that are given below these http calls
    httpClient.get<Data[]>(testUrl).subscribe((data) => {
        expect(data.length).toBe(0);
    });

    httpClient.get<Data[]>(testUrl).subscribe((data) => {
        console.warn("data -> ",data);
        console.warn("[testData[0]] -> ",[testData[0]]);
        expect(data).toEqual([testData[0]]);
    });

    httpClient.get<Data[]>(testUrl).subscribe((data) => {
        console.warn("data -> ",data);
        console.warn("testData -> ", testData);
        expect(data).toEqual(testData);
    });

    // lets check ki jitne calls kiye utne hue bhi ki nhi
    // match() makes multiple http requests, returns array of requests
    const requests = httpTestingController.match(testUrl);
    // console.warn("Requests => ",requests);
    expect(requests.length).toEqual(3);

    // lets make separate requests for each of above http requests
    requests[0].flush([]); //passing empty data
    requests[1].flush([testData[0]]); //passing 'Atharva'
    requests[2].flush(testData); //passing 'Atharva' and 'Atharva Deshmukh'
  });
});