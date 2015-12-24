import {calc} from "../src/app";

describe("Wenn zwei Zahlen übergeben werden", function() {

   it("dann wird die Summe dieser Zahlen zurück gegeben", function() {
      const expected = 2;
      const actual = calc(1, 1);

      expect(actual).toBe(expected);

   });

});

describe("Wenn als erster Parameter eine 2 übergeben wird", function() {

   it("dann wird 9000 zurück gegeben", function() {
      const expected = 9000;
      const actual = calc(2, 1);

      expect(actual).toBe(expected);

   });

});