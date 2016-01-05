import { describe, it, expect, beforeEach, injectAsync, TestComponentBuilder, ComponentFixture } from "angular2/testing";
import { AppComponent } from "./app";

describe("When component is rendered", () => {

    it("it should show 'Hello'", injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.createAsync(AppComponent).then((fixture: ComponentFixture) => {
            // Arrange
            const componentInstance: AppComponent = fixture.debugElement.componentInstance;
            const compiled = fixture.debugElement.nativeElement;

            // Assert
            expect(compiled.querySelector("h1")).toHaveText("Hello");
        });
    }));

});