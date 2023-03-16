describe('First Test', () => {
    let testVariable: any;

    // before running any test case, initialise test variable to an empty object
    beforeEach(() => {
        testVariable = {};
    });

    // writing test cases now
    it('should return true if a is true', () => {
        //follow AAA method of unit testing
        // arrange
        testVariable.a = false;

        // act
        // assume that a has becpme true by doing some logic in act part
        testVariable.a = true;

        // assert
        expect(testVariable.a).toBe(true);
    });
});
