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
        }else{
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

    private isDivider(result: string): boolean {
        return result === '--------';
    }
}
