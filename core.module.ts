import { NgModule } from "@angular/core";

import {DataService} from "./data.service";
import {ToastyModule} from "./toasty/toasty.module";

@NgModule({
    imports: [ToastyModule.forRoot()],
    exports: [ToastyModule],
    declarations: [],
    providers: [DataService],
})
export class CoreModule { }
