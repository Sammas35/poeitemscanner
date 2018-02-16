import {Item} from "./item";
import {Condition} from "./condition";
import {forEach} from "@angular/router/src/utils/collection";

export class ConditionGroup {
    name : string;
    conditionList : Condition[] = [];

    scanItem(item: Item) {

        this.conditionList.every(condition => {
            condition.regex = /^[+](\d+) to Strength$/;
            condition.limit = 30;

            if (item.lineList.some(line => {
                    let match = line.match(condition.regex);
                    let value;

                    if (!match) {
                        return false;
                    }

                    value = +match[1];

                    return value >= condition.limit;
                })) {
                return true;
            }
            return false;
        });
    }
}
