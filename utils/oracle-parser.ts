export type OracleResponse = {
  value: string;
  timestamp: string;
  source?: string;
};

export type ParsedOracleValue = {
  value: bigint;
  timestamp: bigint;
  source: string;
};

export function parseInteger(
  value: string,
): bigint {
  const normalized =
    value.trim();

  if (!/^-?\d+$/.test(normalized)) {
    throw new Error(
      `invalid integer: ${value}`,
    );
  }

  return BigInt(normalized);
}

export function parseTimestamp(
  value: string,
): bigint {
  const timestamp =
    parseInteger(value);

  if (timestamp < 0n) {
    throw new Error(
      "timestamp cannot be negative",
    );
  }

  return timestamp;
}

export function parseOracleResponse(
  response: OracleResponse,
): ParsedOracleValue {
  return {
    value:
      parseInteger(response.value),
    timestamp:
      parseTimestamp(response.timestamp),
    source:
      response.source ?? "unknown",
  };
}

export function isRecent(
  response: ParsedOracleValue,
  currentTime: bigint,
  maxAge: bigint,
): boolean {
  if (response.timestamp > currentTime) {
    return false;
  }

  return (
    currentTime -
      response.timestamp <=
    maxAge
  );
}

export function formatOracleValue(
  response: ParsedOracleValue,
): string {
  return [
    `value=${response.value}`,
    `timestamp=${response.timestamp}`,
    `source=${response.source}`,
  ].join(" ");
}
