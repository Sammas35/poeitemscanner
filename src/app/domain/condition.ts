import {Item} from "./item";

export class Condition {
    regex: RegExp;
    limit: number[];

    constructor(regex: RegExp, ...limit: number[]) {
        this.regex = regex;
        this.limit = limit;
    }

    public static create(pattern: string): Condition {
        let condition: Condition;


        condition = new Condition(null, null);

        condition.setRegex(pattern);
        condition.setLimit(pattern);

        return condition;
    }

    private setLimit(pattern: string) {
        let match;

        match = pattern.match(this.regex);

        this.limit = match.slice(1).map((limit) => +limit);
    }

    private static createRegexPattern(pattern: string): string {
        let result;

        result = pattern.replace('+', '[+]');
        result = result.replace(/(\d+.\d+|\d+)/gi, '(\\d+.\\d+|\\d+)');

        return '^' + result + '$';
    }


    scanItem(item: Item) {
        if (item.lineList.some(line => {
                return this.scanLine(line);
            })) {
            return true;
        }
        return false;

    }

    private scanLine(line: string) {
        let match = line.match(this.regex);
        let value;

        if (!match) {
            return false;
        }

        value = +match[1];

        return value >= this.limit;
    }

    private setRegex(pattern: string) {
        let regexPattern;

        regexPattern = Condition.createRegexPattern(pattern);
        this.regex = new RegExp(regexPattern);
    }
}
