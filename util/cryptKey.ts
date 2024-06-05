export const getKey = async (): Promise<CryptoKey> => {
  const key = await importKey();
  if (key !== undefined) {
    return key;
  }
  const newKey = await generateKey();
  exportKey(newKey);
  return newKey;
};

const generateKey = async () => {
  return await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );
};

const exportKey = async (key: CryptoKey) => {
  const exportKey = await crypto.subtle.exportKey("jwk", key);
  Deno.writeTextFile("./encryptionKey.json", JSON.stringify(exportKey));
};

const importKey = async (): Promise<CryptoKey | undefined> => {
  try {
    const importKey = await Deno.readTextFile("./encryptionKey.json");
    const key = await crypto.subtle.importKey(
      "jwk",
      JSON.parse(importKey),
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign", "verify"],
    );
    return key;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
