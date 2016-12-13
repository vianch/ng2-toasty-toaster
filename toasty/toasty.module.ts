import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";

import { ToastyComponent } from "./toasty.component";
import {ToastyService} from "./toasty.service";

@NgModule({
    imports: [CommonModule],
    declarations: [ToastyComponent],
    exports: [ToastyComponent],
})
export class ToastyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ToastyModule,
            providers: [ToastyService]
        };
    }
}
