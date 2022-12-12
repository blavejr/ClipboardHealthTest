const crypto = require("crypto");

exports.deterministicPartitionKey = (event = null) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let partitionKey;

  if (event && event.partitionKey && typeof event.partitionKey === "string") {
    partitionKey = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    partitionKey = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = crypto.createHash("sha3-512").update(partitionKey).digest("hex");
  }

  return partitionKey || TRIVIAL_PARTITION_KEY;
};