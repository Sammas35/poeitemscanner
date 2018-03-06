import {LineReader} from "./line-reader";

describe('LineReader', function () {

    let lineReader: LineReader;

    it('should exist', () => {
        lineReader = new LineReader("");

        expect(lineReader).toBeDefined();
    });

    describe('constructor', function () {
        it('should create an empty linelist on null string', function () {
            lineReader = new LineReader(null);

            expect(lineReader.lineList).toBeDefined();
            expect(lineReader.lineList.length).toBe(0);
        });

        it('should create an empty linelist on empty string', function () {
            lineReader = new LineReader('');

            expect(lineReader.lineList).toBeDefined();
            expect(lineReader.lineList.length).toBe(0);
        });

        it('should init with string without linebreaks', function () {
            lineReader = new LineReader('Just any text without line break');

            expect(lineReader.lineList).toBeDefined();
            expect(lineReader.lineList.length).toBe(1);
            expect(lineReader.lineList[0]).toBe('Just any text without line break');
        });

        it('should init with multiple lines', function () {
            lineReader = new LineReader('Just any text with\r\nline break\r\nand another line');

            expect(lineReader.lineList).toBeDefined();
            expect(lineReader.lineList.length).toBe(3);
            expect(lineReader.lineList[0]).toBe('Just any text with');
            expect(lineReader.lineList[1]).toBe('line break');
            expect(lineReader.lineList[2]).toBe('and another line');
        });
    });

    describe('next', function () {
        it('should return the first line on first call', function () {
            let result;

            lineReader = new LineReader('Just any text with\r\nline break\r\nand another line');

            result = lineReader.next();

            expect(result).toBe('Just any text with');
        });
        it('should return null if position is behind last line', function () {
            let result;

            lineReader = new LineReader('Just any text with\r\nline break\r\nand another line');

            result = lineReader.next();
            expect(result).toBe('Just any text with');
            result = lineReader.next();
            expect(result).toBe('line break');
            result = lineReader.next();
            expect(result).toBe('and another line');

            result = lineReader.next();
            expect(result).toBeNull();
        });
    });

    describe('current', function () {
        it('should return null if next() is not called', function () {
            lineReader = new LineReader('Just any text with\r\nline break\r\nand another line');

            expect(lineReader.current()).toBeNull();
        });
        it('should return line if next() is called', function () {
            lineReader = new LineReader('Just any text with\r\nline break\r\nand another line');

            lineReader.next();
            expect(lineReader.current()).toBe('Just any text with');
        });
    });

    describe('nextBlock', function () {
        it('should read to the next line after divider', function () {
            lineReader = new LineReader('Just any text with\r\n--------\r\nand another line');

            let line = lineReader.nextBlock();

            expect(line).toBe('and another line');
        });
        it('should read to end if in last block', function () {
            lineReader = new LineReader('Just any text with\r\nand another line');

            let line = lineReader.nextBlock();

            expect(line).toBeNull();
        });
        it('should read to the next block twice', function () {
            let line: string;
            lineReader = new LineReader('Rarity: Magic\r\n' +
                'Bloodthirsty Eternal Sword of the Leviathan\r\n' +
                '--------\r\n' +
                'One Handed Sword\r\n' +
                'Physical Damage: 93-155 (augmented)\r\n' +
                'Critical Strike Chance: 5.00%\r\n' +
                'Attacks per Second: 1.50\r\n' +
                'Weapon Range: 9\r\n' +
                '--------\r\n' +
                'Requirements:\r\n' +
                'Level: 66\r\n' +
                'Str: 104\r\n' +
                'Dex: 122\r\n' +
                '--------\r\n' +
                'Sockets: G R-G \r\n' +
                '--------\r\n' +
                'Item Level: 66\r\n' +
                '--------\r\n' +
                '+475 to Accuracy Rating\r\n' +
                '--------\r\n' +
                '128% increased Physical Damage\r\n' +
                '+39 to Strength\r\n');

            line = lineReader.nextBlock();
            line = lineReader.nextBlock();

            expect(line).toBe("Requirements:");
        });
    });
    describe('readToItemLevel', function () {
        it('should work', function () {
            let line: string;
            lineReader = new LineReader('Rarity: Magic\r\n' +
                'Bloodthirsty Eternal Sword of the Leviathan\r\n' +
                '--------\r\n' +
                'One Handed Sword\r\n' +
                'Physical Damage: 93-155 (augmented)\r\n' +
                'Critical Strike Chance: 5.00%\r\n' +
                'Attacks per Second: 1.50\r\n' +
                'Weapon Range: 9\r\n' +
                '--------\r\n' +
                'Requirements:\r\n' +
                'Level: 66\r\n' +
                'Str: 104\r\n' +
                'Dex: 122\r\n' +
                '--------\r\n' +
                'Sockets: G R-G \r\n' +
                '--------\r\n' +
                'Item Level: 66\r\n' +
                '--------\r\n' +
                '+475 to Accuracy Rating\r\n' +
                '--------\r\n' +
                '128% increased Physical Damage\r\n' +
                '+39 to Strength\r\n');

            line = lineReader.readToItemLevel();

            expect(line).toBe("Item Level: 66");
        });
    });
    describe('readAffixes', function () {
        it('should read affixes from explicit affixes', function () {
            let lines: string[];
            lineReader = new LineReader('Rarity: Magic\r\n' +
                'Bloodthirsty Eternal Sword of the Leviathan\r\n' +
                '--------\r\n' +
                'One Handed Sword\r\n' +
                'Physical Damage: 93-155 (augmented)\r\n' +
                'Critical Strike Chance: 5.00%\r\n' +
                'Attacks per Second: 1.50\r\n' +
                'Weapon Range: 9\r\n' +
                '--------\r\n' +
                'Requirements:\r\n' +
                'Level: 66\r\n' +
                'Str: 104\r\n' +
                'Dex: 122\r\n' +
                '--------\r\n' +
                'Sockets: G R-G \r\n' +
                '--------\r\n' +
                'Item Level: 66\r\n' +
                '--------\r\n' +
                '128% increased Physical Damage\r\n' +
                '+39 to Strength\r\n');

            lineReader.readToItemLevel();
            lineReader.nextBlock();
            lines = lineReader.readAffixes();

            expect(lines[0]).toBe("128% increased Physical Damage");
            expect(lines[1]).toBe("+39 to Strength");
        });
        it('should read affixes from implicit and explicit affixes', function () {
            let lines: string[];
            lineReader = new LineReader('Rarity: Magic\r\n' +
                'Bloodthirsty Eternal Sword of the Leviathan\r\n' +
                '--------\r\n' +
                'One Handed Sword\r\n' +
                'Physical Damage: 93-155 (augmented)\r\n' +
                'Critical Strike Chance: 5.00%\r\n' +
                'Attacks per Second: 1.50\r\n' +
                'Weapon Range: 9\r\n' +
                '--------\r\n' +
                'Requirements:\r\n' +
                'Level: 66\r\n' +
                'Str: 104\r\n' +
                'Dex: 122\r\n' +
                '--------\r\n' +
                'Sockets: G R-G \r\n' +
                '--------\r\n' +
                'Item Level: 66\r\n' +
                '--------\r\n' +
                '+475 to Accuracy Rating\r\n' +
                '--------\r\n' +
                '128% increased Physical Damage\r\n' +
                '+39 to Strength\r\n');

            lineReader.readToItemLevel();
            lineReader.nextBlock();
            lines = lineReader.readAffixes();

            expect(lines[0]).toBe("+475 to Accuracy Rating");
            expect(lines[1]).toBe("128% increased Physical Damage");
            expect(lines[2]).toBe("+39 to Strength");
        });
        it('should read affixes from implicit and explicit affixes and ignore from shaper items on', function () {
            let lines: string[];
            lineReader = new LineReader('Rarity: Magic\r\n' +
                'Bloodthirsty Eternal Sword of the Leviathan\r\n' +
                '--------\r\n' +
                'One Handed Sword\r\n' +
                'Physical Damage: 93-155 (augmented)\r\n' +
                'Critical Strike Chance: 5.00%\r\n' +
                'Attacks per Second: 1.50\r\n' +
                'Weapon Range: 9\r\n' +
                '--------\r\n' +
                'Requirements:\r\n' +
                'Level: 66\r\n' +
                'Str: 104\r\n' +
                'Dex: 122\r\n' +
                '--------\r\n' +
                'Sockets: G R-G \r\n' +
                '--------\r\n' +
                'Item Level: 66\r\n' +
                '--------\r\n' +
                '+475 to Accuracy Rating\r\n' +
                '--------\r\n' +
                '128% increased Physical Damage\r\n' +
                '+39 to Strength\r\n' +
                '--------\r\n' +
                'Shaper Item\r\n');

            lineReader.readToItemLevel();
            lineReader.nextBlock();
            lines = lineReader.readAffixes();
            expect(lines.length).toBe(3);
            expect(lines[0]).toBe("+475 to Accuracy Rating");
            expect(lines[1]).toBe("128% increased Physical Damage");
            expect(lines[2]).toBe("+39 to Strength");
        });
        it('should read affixes from implicit and explicit affixes and ignore from elder items on', function () {
            let lines: string[];
            lineReader = new LineReader('Rarity: Magic\r\n' +
                'Bloodthirsty Eternal Sword of the Leviathan\r\n' +
                '--------\r\n' +
                'One Handed Sword\r\n' +
                'Physical Damage: 93-155 (augmented)\r\n' +
                'Critical Strike Chance: 5.00%\r\n' +
                'Attacks per Second: 1.50\r\n' +
                'Weapon Range: 9\r\n' +
                '--------\r\n' +
                'Requirements:\r\n' +
                'Level: 66\r\n' +
                'Str: 104\r\n' +
                'Dex: 122\r\n' +
                '--------\r\n' +
                'Sockets: G R-G \r\n' +
                '--------\r\n' +
                'Item Level: 66\r\n' +
                '--------\r\n' +
                '+475 to Accuracy Rating\r\n' +
                '--------\r\n' +
                '128% increased Physical Damage\r\n' +
                '+39 to Strength\r\n' +
                '--------\r\n' +
                'Elder Item\r\n');

            lineReader.readToItemLevel();
            lineReader.nextBlock();
            lines = lineReader.readAffixes();
            expect(lines.length).toBe(3);
            expect(lines[0]).toBe("+475 to Accuracy Rating");
            expect(lines[1]).toBe("128% increased Physical Damage");
            expect(lines[2]).toBe("+39 to Strength");
        });
        it('should read affixes from implicit and explicit affixes and ignore from abyssal items on', function () {
            let lines: string[];
            lineReader = new LineReader('Rarity: Magic\r\n' +
                'Bloodthirsty Eternal Sword of the Leviathan\r\n' +
                '--------\r\n' +
                'One Handed Sword\r\n' +
                'Physical Damage: 93-155 (augmented)\r\n' +
                'Critical Strike Chance: 5.00%\r\n' +
                'Attacks per Second: 1.50\r\n' +
                'Weapon Range: 9\r\n' +
                '--------\r\n' +
                'Requirements:\r\n' +
                'Level: 66\r\n' +
                'Str: 104\r\n' +
                'Dex: 122\r\n' +
                '--------\r\n' +
                'Sockets: G R-G \r\n' +
                '--------\r\n' +
                'Item Level: 66\r\n' +
                '--------\r\n' +
                '+475 to Accuracy Rating\r\n' +
                '--------\r\n' +
                '128% increased Physical Damage\r\n' +
                '+39 to Strength\r\n' +
                '--------\r\n' +
                'Place into an Abyssal Socket on an Item or into an allocated Jewel Socket on the Passive Skill Tree. Right click to remove from the Socket.\r\n' +
                '128% increased Physical Damage\r\n' +
                '+39 to Strength\r\n'
            );

            lineReader.readToItemLevel();
            lineReader.nextBlock();
            lines = lineReader.readAffixes();
            expect(lines.length).toBe(3);
            expect(lines[0]).toBe("+475 to Accuracy Rating");
            expect(lines[1]).toBe("128% increased Physical Damage");
            expect(lines[2]).toBe("+39 to Strength");
        });
        it('should read affixes from implicit and explicit affixes and ignore from Note items on', function () {
            let lines: string[];
            lineReader = new LineReader('Rarity: Magic\r\n' +
                'Bloodthirsty Eternal Sword of the Leviathan\r\n' +
                '--------\r\n' +
                'One Handed Sword\r\n' +
                'Physical Damage: 93-155 (augmented)\r\n' +
                'Critical Strike Chance: 5.00%\r\n' +
                'Attacks per Second: 1.50\r\n' +
                'Weapon Range: 9\r\n' +
                '--------\r\n' +
                'Requirements:\r\n' +
                'Level: 66\r\n' +
                'Str: 104\r\n' +
                'Dex: 122\r\n' +
                '--------\r\n' +
                'Sockets: G R-G \r\n' +
                '--------\r\n' +
                'Item Level: 66\r\n' +
                '--------\r\n' +
                '+475 to Accuracy Rating\r\n' +
                '--------\r\n' +
                '128% increased Physical Damage\r\n' +
                '+39 to Strength\r\n' +
                '--------\r\n' +
                'Note: ~price 5 chaos\r\n' +
                '128% increased Physical Damage\r\n' +
                '+39 to Strength\r\n'
            );

            lineReader.readToItemLevel();
            lineReader.nextBlock();
            lines = lineReader.readAffixes();
            expect(lines.length).toBe(3);
            expect(lines[0]).toBe("+475 to Accuracy Rating");
            expect(lines[1]).toBe("128% increased Physical Damage");
            expect(lines[2]).toBe("+39 to Strength");
        });
    });
});
