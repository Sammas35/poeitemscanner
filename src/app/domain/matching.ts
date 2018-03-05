export class Matching{

    public static readonly METHOD_AND = 'and';
    public static readonly METHOD_COUNT = 'count';

    constructor(public method: string, public count: string) {
    }
}