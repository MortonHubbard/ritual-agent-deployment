import { expect } from "chai";

import {
  parseInteger,
  parseTimestamp,
  parseOracleResponse,
  isRecent,
  formatOracleValue,
} from "../utils/oracle-parser";

describe("oracle parser", function () {
  it("parses a positive integer", function () {
    expect(
      parseInteger("123"),
    ).to.equal(123n);
  });

  it("parses zero", function () {
    expect(
      parseInteger("0"),
    ).to.equal(0n);
  });

  it("parses negative integers", function () {
    expect(
      parseInteger("-10"),
    ).to.equal(-10n);
  });

  it("rejects invalid integers", function () {
    expect(() =>
      parseInteger("12.5"),
    ).to.throw();
  });

  it("parses timestamps", function () {
    expect(
      parseTimestamp("1000"),
    ).to.equal(1000n);
  });

  it("rejects negative timestamps", function () {
    expect(() =>
      parseTimestamp("-1"),
    ).to.throw();
  });

  it("parses a complete response", function () {
    const result =
      parseOracleResponse({
        value: "3200",
        timestamp: "100",
        source: "demo",
      });

    expect(result.value)
      .to.equal(3200n);

    expect(result.timestamp)
      .to.equal(100n);

    expect(result.source)
      .to.equal("demo");
  });

  it("uses unknown source when missing", function () {
    const result =
      parseOracleResponse({
        value: "3200",
        timestamp: "100",
      });

    expect(result.source)
      .to.equal("unknown");
  });

  it("checks response freshness", function () {
    const result =
      parseOracleResponse({
        value: "3200",
        timestamp: "950",
      });

    expect(
      isRecent(
        result,
        1000n,
        100n,
      ),
    ).to.equal(true);
  });

  it("rejects an old response", function () {
    const result =
      parseOracleResponse({
        value: "3200",
        timestamp: "800",
      });

    expect(
      isRecent(
        result,
        1000n,
        100n,
      ),
    ).to.equal(false);
  });
});
