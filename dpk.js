const crypto = require("crypto");

const generateKey = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = null;

  if (event) 
    candidate = event.partitionKey 
      ? event.partitionKey 
      : generateKey(JSON.stringify(event));

  if (candidate) {
    candidate = typeof candidate !== 'string' 
      ? JSON.stringify(candidate) 
      : candidate;
  } 
  
  if (!candidate) {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  return candidate.length > MAX_PARTITION_KEY_LENGTH 
    ? crypto.createHash("sha3-512").update(candidate).digest("hex") 
    : candidate;
};