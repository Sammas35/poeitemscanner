import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ElectronService} from 'ngx-electron';

@Injectable()
export class ClipboardService {

    private subject: BehaviorSubject<string> = new BehaviorSubject(undefined);
    public readonly content = this.subject.asObservable();

    constructor(@Inject(ElectronService) private electronService : ElectronService) {
        setInterval(() => {
            if (this.subject) {
                this.subject.next(this.electronService.clipboard.readText().trim());
            }
        }, 100);
    }

    getChanges(): Observable<string> {
        return this.content;
    }
}
