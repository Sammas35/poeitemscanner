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
        let regexPattern: string;
        let match;

        condition = new Condition(null, null);

        regexPattern = Condition.createRegexPattern(pattern);
        condition.regex = new RegExp(regexPattern);

        match = pattern.match(condition.regex);

        condition.limit = match.slice(1).map((limit) => +limit);

        return condition;
    }

    private static createRegexPattern(pattern: string): string {
        var result;

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
}
