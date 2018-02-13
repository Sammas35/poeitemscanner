import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

declare var electron: any;
const {clipboard} = electron.remote.require('electron');

@Injectable()
export class ClipboardService {

    private subject: BehaviorSubject<string> = new BehaviorSubject('Egalo');
    public readonly content = this.subject.asObservable();

    constructor() {

        setInterval(() => {
            if (this.subject) {
                this.subject.next(clipboard.readText());
            }
        }, 100);
    }

    getChanges(): Observable<string> {
        return this.content;
    }
}
