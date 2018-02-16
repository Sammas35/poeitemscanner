export class Condition {
    regex: RegExp;
    limit: number;


    constructor(regex: RegExp, limit: number) {
        this.regex = regex;
        this.limit = limit;
    }
}
