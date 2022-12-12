const crypto = require("crypto");
const { deterministicPartitionKey } = require("./refactor");

const mockEvent = {
    partitionKey: ''
}

describe("deterministicPartitionKey", () => {
  test("should return the event partition key when provided and is a string", () => {
    const event = { partitionKey: "test-key" };
    expect(deterministicPartitionKey(event)).toBe("test-key");
  });

  test("should return a SHA3-512 hash of the JSON stringified event when no partition key is provided", () => {
    const event = { some: "data" };
    const data = JSON.stringify(event);
    const expectedPartitionKey = crypto.createHash("sha3-512").update(data).digest("hex");
    expect(deterministicPartitionKey(event)).toBe(expectedPartitionKey);
  });

  test("should return a SHA3-512 hash of the provided partition key when it is longer than 256 characters", () => {
    const longPartitionKey = "a".repeat(300);
    const event = { partitionKey: longPartitionKey };
    const expectedPartitionKey = crypto.createHash("sha3-512").update(longPartitionKey).digest("hex");
    expect(deterministicPartitionKey(event)).toBe(expectedPartitionKey);
  });

  test("should return a trivial partition key when the event is not provided", () => {
    const expectedPartitionKey = "0";
    expect(deterministicPartitionKey()).toBe(expectedPartitionKey);
  });
});