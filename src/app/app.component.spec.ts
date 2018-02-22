import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ElectronService} from "ngx-electron";
import {ClipboardService} from "./clipboard/clipboard.service";
import {ConditionService} from "./condition-service/condition.service";
import {ClipboardServiceMock} from "./mocks/clipboard-service-mock";


describe('AppComponent', () => {
    beforeEach(async(() => {
        // electron = electron || {};
        TestBed.configureTestingModule({
            providers:[
                ElectronService,
                {provide: ClipboardService, useClass: ClipboardServiceMock},
                ConditionService
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    // it(`should have as title 'app'`, async(() => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     const app = fixture.debugElement.componentInstance;
    //     expect(app.title).toEqual('app');
    // }));
    // it('should render title in a h1 tag', async(() => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
    // }));
});
