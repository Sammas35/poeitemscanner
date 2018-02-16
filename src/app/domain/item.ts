import {LineReader} from "./line-reader";

export class Item {
    rarity: string;
    name: string;
    lineList: string[];

    static createFromString(text: string): Item {
        let result: Item = new Item();
        let line;
        let lineReader : LineReader;

        lineReader = new LineReader(text);

        result.lineList = lineReader.lineList;

        line =  lineReader.next();
        console.log('line : ', line);
        if (!result.readRarity(line)) {
            return null;
        }

        line =  lineReader.next();
        console.log('line : ', line);
        if (!result.readName(line)) {
            return null;
        }



        // lineReader.readToItemLevel();

        // if (!result.readName(lineReader.next())) {
        //     return null;
        // }

        console.log('createFromString', result);

        return result;
    }

    readRarity(line: string) {
        let regex = /^Rarity: (Normal|Magic|Rare|Unique)$/;
        let match;

        if(!line) {
            return false;
        }

        match = line.match(regex);

        if (match) {
            this.rarity = match[1];
            console.log('readRarity', this.rarity);
            return true;
        }
        return false;
    }

    readName(line: string) {
        if (!line) {
            return false;
        }

        console.log('readName', line);
        this.name = line;

        return true;
    }
}