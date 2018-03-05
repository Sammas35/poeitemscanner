import {Item} from "./item";
import {ConditionGroup} from "./condition-group";

export class ItemScanner {

    conditionGroupList: ConditionGroup[];

    public scanItem(item: Item): boolean {

        console.log('Scanning ' + item.name);

        if (this.conditionGroupList) {

            this.conditionGroupList.some((conditionGroup : ConditionGroup) => {
                return conditionGroup.scanItem(item)
            });

            return true;
        }

        return false;
    }
}
