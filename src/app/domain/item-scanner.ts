import {Item} from "./item";
import {ConditionService} from "../condition-service/condition.service";
import {ConditionGroup} from "./condition-group";
import {Condition} from "./condition";

export class ItemScanner {

    // constructor(private conditionService: ConditionService) {
    constructor() {
    }


    public scanItem(item: Item): boolean {
        console.log('Scanning ' + item.name);

        let conditionGroup : ConditionGroup;

        conditionGroup = new ConditionGroup();

        conditionGroup.name = 'RF Helmet';
        conditionGroup.conditionList.push(new Condition(/^[+](\d+) to Strength$/, 30));
        conditionGroup.conditionList.push(new Condition(/^(\d+)% increased Physical Damage$/, 100));

        if(conditionGroup.scanItem(item)){
            return true;
        }

        return false;
    }
}
