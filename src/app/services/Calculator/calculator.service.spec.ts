import { LoggerService } from "../Logger/logger.service";
import { CalculatorService } from "./calculator.service";
import { TestBed } from '@angular/core/testing';

describe('CalculatorService', () => {

  // in case agar loggerservice ka bhi instance bnana ho to
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;

  let mockLoggerService:any;
  let calculator:CalculatorService;
  beforeEach(() => {
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);

    // let TestBed take care of injecting dependencies in the CalculatorService. We don't have to injec manually
    TestBed.configureTestingModule({

      // services are created in providers and now CalculatorService has a dependency
      // handled that dependency using mockservices
      providers: [
        CalculatorService, 
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    });

    // YE AISE MANUALLY ADD NHI KARNA HAI. LET TestBed inject it
    // calculator = new CalculatorService(mockLoggerService);

    calculator = TestBed.inject(CalculatorService);

    // loggerService ka bhi agar instance bnana hai
    loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
  });

  it('should add two numbers', () => {

    let result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {

    let result = calculator.subtract(2, 2);
    expect(result).toBe(0);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });
});
