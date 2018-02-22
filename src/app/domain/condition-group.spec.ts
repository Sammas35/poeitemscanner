import {ConditionGroup} from "./condition-group";
import {Item} from "./item";
import {Condition} from "./condition";

describe('ConditionGroup', function () {
    let conditionGroup: ConditionGroup = new ConditionGroup();

    it('should exist', () => {
        expect(conditionGroup).toBeDefined();
    });

    describe('scanItem', function () {
        it('should scan a simple +strength item', function () {

            let conditionGroup : ConditionGroup;
            let item : Item;

            item = new Item();
            item.name = 'Strength Item';

            item.lineList = [
                '+32 to Strength'
            ];

            conditionGroup = new ConditionGroup();

            conditionGroup.name = 'RF Helmet';
            conditionGroup.conditionList.push(new Condition(/^[+](\d+) to Strength$/, 30));

            expect(conditionGroup.scanItem(item)).toBeTruthy();
        });

        it('should scan an item with no matching condition', function () {

            let conditionGroup : ConditionGroup;
            let item : Item;

            item = new Item();
            item.name = 'Strength Item';

            item.lineList = [
                '+32 to Anything'
            ];

            conditionGroup = new ConditionGroup();

            conditionGroup.name = 'RF Helmet';
            conditionGroup.conditionList.push(new Condition(/^[+](\d+) to Strength$/, 30));

            expect(conditionGroup.scanItem(item)).toBeFalsy();
        });

        it('should scan an item with two matching conditions', function () {

            let conditionGroup : ConditionGroup;
            let item : Item;

            item = new Item();
            item.name = 'Strength Item';

            item.lineList = [
                '+32 to Strength',
                '+32 to Dexterity'
            ];

            conditionGroup = new ConditionGroup();

            conditionGroup.name = 'RF Helmet';
            conditionGroup.conditionList.push(new Condition(/^[+](\d+) to Strength$/, 30));
            conditionGroup.conditionList.push(new Condition(/^[+](\d+) to Dexterity$/, 30));

            expect(conditionGroup.scanItem(item)).toBeTruthy();
        });
        it('should scan an item with two conditions, one of them matching', function () {

            let conditionGroup : ConditionGroup;
            let item : Item;

            item = new Item();
            item.name = 'Strength Item';

            item.lineList = [
                '+32 to Strength',
                '+32 to Intelligence'
            ];

            conditionGroup = new ConditionGroup();

            conditionGroup.name = 'RF Helmet';
            conditionGroup.conditionList.push(new Condition(/^[+](\d+) to Strength$/, 30));
            conditionGroup.conditionList.push(new Condition(/^[+](\d+) to Dexterity$/, 30));

            expect(conditionGroup.scanItem(item)).toBeFalsy();
        });
    });
});
