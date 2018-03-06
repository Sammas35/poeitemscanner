export class LineReader {
    public lineList: string[] = [];
    private currentPos: number;

    constructor(text: string) {
        if (!text) {
            return;
        }
        if (text.length === 0) {
            return;
        }

        this.lineList = text.split('\r\n');
    }

    current(): string {
        if (this.currentPos < this.lineList.length) {
            return this.lineList[this.currentPos];
        }
        return null;
    }

    next(): string {
        if (this.currentPos === undefined || this.currentPos === null) {
            this.currentPos = 0;
        } else {
            this.currentPos++;
        }

        return this.current();
    }

    nextBlock(): string {
        let result: string;

        do {
            result = this.next();

            if (this.isDivider(result)) {
                return this.next()
            }
        } while (result !== null);

        return result;
    }

    readToItemLevel() {
        let result: string;
        do {
            result = this.next();

            if (this.isItemLevel(result)) {
                return this.current();
            }

        } while (result !== null)
    }

    readAffixes(): string[] {
        let result: string[] = [];
        let line;

        line = this.current();
        while (line) {
            if (this.isDivider(line)) {
                line = this.next();
            }

            if (this.isAffixEnder(line)) {
                return result;
            }

            result.push(line);
            line = this.next();
        }

        return result;
    }

    private isDivider(result: string): boolean {
        return result === '--------';
    }

    private isItemLevel(result: string) {
        return result.startsWith('Item Level:');
    }

    private isAffixEnder(line: any) {
        if (!line) {
            return false;
        }
        if (line === "Shaper Item") {
            return true;
        }
        if (line === "Elder Item") {
            return true;
        }
        if (line === "Place into an Abyssal Socket on an Item or into an allocated Jewel Socket on the Passive Skill Tree. Right click to remove from the Socket.") {
            return true;
        }
        if (line.startsWith("Note:")) {
            return true;
        }
        return false;
    }
}
