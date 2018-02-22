import {Condition} from "./condition";

describe('Condition', function () {
    describe('Condition.create', function () {
        it('should exist', function () {
            expect(Condition.create).toBeDefined();
        });

        it('should create condition from pattern with one param and +', function () {
            let condition: Condition;

            condition = Condition.create('+30 to Strength');

            expect(condition).toBeDefined();
            expect(condition.regex.source).toBe(/^[+](\d+.\d+|\d+) to Strength$/.source);
            expect(condition.limit.length).toBe(1);
            expect(condition.limit[0]).toBe(30);
        });

        it('should create condition from pattern with one param and %', function () {
            let condition: Condition;

            condition = Condition.create('128% increased Physical Damage');

            expect(condition).toBeDefined();
            expect(condition.regex.source).toBe(/^(\d+.\d+|\d+)% increased Physical Damage$/.source);
            expect(condition.limit.length).toBe(1);
            expect(condition.limit[0]).toBe(128);
        });

        it('should create condition from pattern with two params', function () {
            let condition: Condition;

            condition = Condition.create('Adds 2 to 27 Lightning Damage to Axe Attacks');

            expect(condition).toBeDefined();
            expect(condition.regex.source).toBe(/^Adds (\d+.\d+|\d+) to (\d+.\d+|\d+) Lightning Damage to Axe Attacks$/.source);
            expect(condition.limit.length).toBe(2);
            expect(condition.limit[0]).toBe(2);
            expect(condition.limit[1]).toBe(27);
        });

        it('should create condition from pattern with param as floating point', function () {
            let condition: Condition;

            condition = Condition.create('1.3 Life Regenerated per second');

            expect(condition).toBeDefined();
            expect(condition.regex.source).toBe(/^(\d+.\d+|\d+) Life Regenerated per second$/.source);
            expect(condition.limit.length).toBe(1);
            expect(condition.limit[0]).toBe(1.3);
        });
    });
});