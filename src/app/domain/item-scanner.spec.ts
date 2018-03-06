import {ItemScanner} from "./item-scanner";
import {Item} from "./item";
import {ConditionGroup} from "./condition-group";
import {Condition} from "./condition";

describe('ItemScanner', function () {
    let itemScanner: ItemScanner = new ItemScanner();

    it('should exist', () => {
        expect(itemScanner).toBeDefined();
    });

    it('scann a single item propperty from item', function () {
        let conditionGroup : ConditionGroup;
        var item : Item;

        item = new Item();
        item.name = 'Strength Item';
        item.affixList = [
            '+32 to Strength',
            '110% increased Physical Damage'
        ];

        conditionGroup = new ConditionGroup();
        conditionGroup.name = 'RF Helmet';
        conditionGroup.conditionList.push(new Condition(/^[+](\d+) to Strength$/, 30));
        conditionGroup.conditionList.push(new Condition(/^(\d+)% increased Physical Damage$/, 100));

        itemScanner.conditionGroupList = [conditionGroup];

        expect(itemScanner.scanItem(item)).toBeTruthy();
    });
});
