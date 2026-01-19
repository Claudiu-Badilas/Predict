export class CalculatorUtil {
  static sum(numbers: number[]): number {
    return numbers
      .filter((n) => n !== null && n !== undefined)
      .reduce((total, num) => total + num, 0);
  }
}
