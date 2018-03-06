import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class MasterdataService {

    affixEnder: string[];

    constructor(private http: HttpClient) {
    }

    init() {
        this.http.get('masterdata/affix-ender.json')
            .subscribe((data: any) => {
                this.affixEnder = data.enders;
            })
    }
}
