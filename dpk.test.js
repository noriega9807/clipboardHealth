const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Should return the same value as string if integer given", () => {
    const event = { partitionKey: 123 };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("123");
  });

  it("Should return the same value if given a string", () => {
    const event = { partitionKey: '123' };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("123");
  });

  it("Should be given a diferent key if key length exceeded", () => {
    const partitionKey = "testKey".repeat(50);
    const event = { partitionKey };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).not.toBe(partitionKey);
    expect(trivialKey.length).toBeLessThan(256);
  });

  it("Should generate a key from an event without partitionKey attribute", () => {
    const event = '123456';
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).not.toBe(null);
  });
});
