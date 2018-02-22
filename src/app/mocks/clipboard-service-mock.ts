import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";

export class ClipboardServiceMock {
    getChanges(): Observable<string>{
        return Observable.of('EGalo');
    }
}