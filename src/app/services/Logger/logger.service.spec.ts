import { LoggerService } from "./logger.service";

describe('LoggerService',() => {

  it('should not have any messages at starting', () => {
    // arrange -> initialise the state
    const service = new LoggerService();

    // act -> do necessary changes
    let count = service.messages.length;

    // assert -> test the expectation
     expect(count).toBe(0);
  });
});
