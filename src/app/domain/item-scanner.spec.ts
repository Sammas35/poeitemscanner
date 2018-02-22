import {ItemScanner} from "./item-scanner";
import {Item} from "./item";

describe('ItemScanner', function () {
    let itemScanner: ItemScanner = new ItemScanner();

    it('should exist', () => {
        expect(itemScanner).toBeDefined();
    });

    it('scann a single item propperty from item', function () {
        var item : Item;

        item = new Item();
        item.name = 'Strength Item';
        item.lineList = [
            '+32 to Strength',
            '110% increased Physical Damage'
        ];

        expect(itemScanner.scanItem(item)).toBeTruthy();
    });
});
