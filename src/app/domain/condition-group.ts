import {Item} from "./item";
import {Condition} from "./condition";
import {forEach} from "@angular/router/src/utils/collection";
import {Matching} from "./matching";

export class ConditionGroup {
    name : string;
    matching : Matching = new Matching('and', undefined);
    conditionList : Condition[] = [];

    scanItem(item: Item) {

        if(this.matching.method === Matching.METHOD_COUNT) {
            return this.conditionList.filter(condition => {
                return condition.scanItem(item);
            }).length >= +this.matching.count;
        }

        return this.conditionList.every(condition => {
            return condition.scanItem(item);
        });
    }
}
