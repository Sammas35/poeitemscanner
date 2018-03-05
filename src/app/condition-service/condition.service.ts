import {Injectable} from '@angular/core';
import {ConditionGroup} from "../domain/condition-group";
import {Condition} from "../domain/condition";
import {ItemScanner} from "../domain/item-scanner";

@Injectable()
export class ConditionService {
    itemScanner: ItemScanner;
    conditionGroupList : ConditionGroup[];

    constructor() {
        this.loadConditionGroups() ;
        this.itemScanner = new ItemScanner();
        this.itemScanner.conditionGroupList = this.conditionGroupList;
    }

    private loadConditionGroups() {
        let conditionGroup : ConditionGroup;

        this.conditionGroupList = this.conditionGroupList || [];

        conditionGroup = new ConditionGroup();
        conditionGroup.name = 'RF Helmet';
        conditionGroup.conditionList.push(new Condition(/^[+](\d+) to Strength$/, 30));
        conditionGroup.conditionList.push(new Condition(/^(\d+)% increased Physical Damage$/, 100));

        this.conditionGroupList.push(conditionGroup);
    }
}
