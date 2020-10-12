import { readFileSync } from "fs";
import { parse } from ".";
import { tests } from "./__fixtures__/tests";

describe("parse own tests", () => {
    for (const [selector, expected, message] of tests) {
        test(message, () => expect(parse(selector)).toStrictEqual(expected));
    }
});

describe("Collected selectors", () => {
    test("(qwery, sizzle, nwmatcher)", () => {
        const out = JSON.parse(
            readFileSync(`${__dirname}/__fixtures__/out.json`, "utf8")
        );
        for (const s of Object.keys(out)) {
            expect(parse(s)).toStrictEqual(out[s]);
        }
    });
});

const broken = [
    "[",
    "(",
    "{",
    "()",
    "<>",
    "{}",
    ",",
    ",a",
    "a,",
    "[id=012345678901234567890123456789",
    "input[name=foo.baz]",
    "input[name=foo[baz]]",
];

describe("Broken selectors", () => {
    for (const selector of broken) {
        it(`should not parse — ${selector}`, () => {
            expect(() => parse(selector)).toThrow(Error);
        });
    }
});
