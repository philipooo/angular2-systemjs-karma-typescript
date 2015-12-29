import {Component, View} from "angular2/core";

@Component({
    selector: "app"
})
@View({
    template: "<h1>Hello</h1>"
})
export class AppComponent {}

export function calc(a, b) {
    if (a === 2) {
        return 9000;
    }
    return a + b;
}