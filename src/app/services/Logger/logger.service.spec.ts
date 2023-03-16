import { LoggerService } from "./logger.service";

describe('LoggerService',() => {

  let service : LoggerService;
  beforeEach(() => {
    service = new LoggerService();
  })

  it('should not have any messages at starting', () => {
    // arrange -> initialise the state
    // const service = new LoggerService();

    // act -> do necessary changes
    let count = service.messages.length;

    // assert -> test the expectation
     expect(count).toBe(0);
  });

  it('should add the message when log() is called', () => {
    // arrange
    // const service = new LoggerService();

    // act
    service.log('message');

    // assert
    expect(service.messages.length).toBe(1);
  })

  it('should clear all the messages when clear is called', () => {
    // arrange
    // const service = new LoggerService();
    let count = service.messages.length;
    service.log('message2'); //to ensure we don't have empty array initially

    // act
    service.clear();

    // assert
    expect(count).toBe(0);
  });
});
