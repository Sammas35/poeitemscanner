import {Component, OnInit} from '@angular/core';
import {ClipboardService} from './clipboard/clipboard.service';
import 'rxjs/add/operator/distinct';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';

    constructor(private clipboardService: ClipboardService) {
    }

    ngOnInit(): void {
        this.clipboardService.getChanges()
            .distinct()
            .subscribe((text) => console.log('Neuer Text im Clipboard', text));
    }
}
