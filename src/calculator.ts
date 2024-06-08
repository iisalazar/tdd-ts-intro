// a class with method divide() that accepts two numbers and returns the division of the two numbers
import DivisionByZeroException from "./DivisionByZeroException";
import {IResultRepository} from "./repository/resultRepository";

class Calculator {
    private readonly resultRepository: IResultRepository;
    
    constructor({
        _resultRepository
                }: { _resultRepository: IResultRepository}
    ) {
        this.resultRepository = _resultRepository;
    }

    divide(a: number, b: number): number {
        if (b === 0) {
            throw new DivisionByZeroException();
        }
        return a / b;
    }

    async divideAsync(a: number, b: number): Promise<number> {
        // call divide
        const result = this.divide(a, b);
        // save result in the database
        // await this.db.runQuery(`INSERT INTO results (result) VALUES (${result})`);
        await this.resultRepository.saveResult(result);
        // return result of division
        return result;
    }
}

export default Calculator;