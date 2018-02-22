import {Item} from "./item";
import {Condition} from "./condition";
import {forEach} from "@angular/router/src/utils/collection";

export class ConditionGroup {
    name : string;
    conditionList : Condition[] = [];

    scanItem(item: Item) {

        return this.conditionList.every(condition => {
            return condition.scanItem(item);
        });
    }
}
