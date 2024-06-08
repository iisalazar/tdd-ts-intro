// DivisionByZeroException.ts
export default class DivisionByZeroException extends Error {
   constructor() {
      super("Division by zero is not allowed");
      this.name = "DivisionByZeroException";
   }
}