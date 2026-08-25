import {
  parseOracleResponse,
  isRecent,
  formatOracleValue,
} from "../utils/oracle-parser";

const responses = [
  {
    value: "3200",
    timestamp: "950",
    source: "demo-oracle",
  },
  {
    value: "3180",
    timestamp: "700",
    source: "demo-oracle",
  },
  {
    value: "3250",
    timestamp: "995",
    source: "backup",
  },
];

const currentTime = 1000n;
const maxAge = 100n;

for (const raw of responses) {
  const parsed =
    parseOracleResponse(raw);

  console.log(
    formatOracleValue(parsed),
  );

  console.log(
    "Recent:",
    isRecent(
      parsed,
      currentTime,
      maxAge,
    ),
  );

  console.log(
    "-------------------",
  );
}
