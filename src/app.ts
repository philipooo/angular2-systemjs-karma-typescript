import {Component, View} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common"; // We need this for the unit tests if the template contains directives.

@Component({
    selector: "app",
    template: "<h1>Hello</h1>",
    directives: [CORE_DIRECTIVES]
})
export class AppComponent {}