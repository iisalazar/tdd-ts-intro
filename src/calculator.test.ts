import Calculator from "./calculator";
import DivisionByZeroException from "./DivisionByZeroException";
import {It, Mock, Times} from "moq.ts";
import {IResultRepository} from "./repository/resultRepository";

function createDependencies(){
    const mockResultRepository = new Mock<IResultRepository>()
    return {
        _resultRepository: mockResultRepository
    }
}
describe("Test suite for Calculator", () => {
    // first test case
    // happy path: given a and b, should return a / b

    // FunctionName_Condition_Expected
    // FunctionName_WhenCondition_ShouldExpected 
    // Divide_WhenAIsPositive_ShouldReturnPositive

    describe('divide()', () => {
        it('when a is positive and b is positive, should return positive', () => {
            // AAA
            // Arrange
            // Act
            // Assert

            // Arrange - where you do preparations for the test
            // it could be preparing mock data
            // it could be preparing mock objects for the class you want to test
            // it could be preparing expected results or values

            // Act - where you execute the function you want to test
            // it could be calling the function

            // Assert - where you check the result or expected behaviour of the function

            // Arrange
            const a = 10;
            const b = 2;
            const expectedResult = 5;
            // system under test, unit under test or uut
            // sut or system under test
            // sut = this is the object or class or function you want to test
            const dependencies = createDependencies();
            const sut = new Calculator({
                _resultRepository: dependencies._resultRepository.object()
            });

            // Act
            const result = sut.divide(a, b);

            // Assert
            expect(result).toBe(expectedResult);
        });

        // 3 things you normally want to test
        // 1. return values (DONE)
        // 2. side effects (method calls to other dependencies / classes / interfaces, etc.)
        // 3. exceptions / errors (DONE)

        it('when b is zero, should throw DivisionByZeroException', () => {
            // Arrange
            const a = 10;
            const b = 0;
            const dependencies = createDependencies();

            const sut = new Calculator({
                _resultRepository: dependencies._resultRepository.object()
            });


            // Act
            // Assert
           expect(() => sut.divide(a,b)).toThrow(DivisionByZeroException);
        });
        
        const testCases = [
            [10, 2, 5],
            [10, 5, 2],
            [10, 10, 1],
            [10, 1, 10],
        ]
        
        test.each(testCases)('when a is %i and b is %i, should return %i', (a, b, expected) => {
            // Arrange
            const dependencies = createDependencies();
            const sut = new Calculator({
                _resultRepository: dependencies._resultRepository.object()
            });

            // Act
            const result = sut.divide(a, b);

            // Assert
            expect(result).toBe(expected);
        });
    })
    describe('divideAsync()', () => {
        it('when valid values are passed, should store result in the database', async () => {
            // Arrange
            const a = 10;
            const b = 2;
            const dependencies = createDependencies();
            dependencies._resultRepository.setup(x => x.saveResult(It.IsAny<number>())).returns(Promise.resolve());
            const sut = new Calculator({
                _resultRepository: dependencies._resultRepository.object()
            });

            // Act
            await sut.divideAsync(a, b);
            // Assert
            dependencies._resultRepository.verify(x => x.saveResult(It.IsAny<number>()), Times.Exactly(1));
        })
    });

})