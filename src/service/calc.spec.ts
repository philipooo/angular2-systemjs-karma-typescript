import { describe, it, expect } from "angular2/testing";
import {calc} from "./calc";

describe("Calc", () => {

    describe("When two numbers are passed to calc", function() {

        it("should return the sum", function() {

            // Arrange
            const expected = 2;

            // Act
            const actual = calc(1, 1);

            // Assert
            expect(actual).toBe(expected);

        });

    });

    describe("When the first number is 2", function() {

        it("should return 9000", function() {

            // Arrange
            const expected = 9000;

            // Act
            const actual = calc(2, 1);

            // Assert
            expect(actual).toBe(expected);

        });

    });

});