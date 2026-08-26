import { describe, expect, it } from "vitest";

import {
  binaryToDna,
  complementDna,
  decodeDna,
  dnaToBinary,
  encodeText,
  utf8ToBinary,
} from "./dna";

describe("DNA transcoding", () => {
  it("maps each binary pair to the expected DNA base", () => {
    expect(binaryToDna("00 01 10 11")).toBe("ACGT");
    expect(dnaToBinary("ACGT")).toBe("00011011");
    expect(complementDna("ACGT")).toBe("TGCA");
  });

  it.each(["Hello, DNA!", "你好，DNA！", "DNA 🧬 日本語"])(
    "round-trips UTF-8 text: %s",
    (text) => {
      const encoded = encodeText(text);
      expect(decodeDna(encoded.dnaPositive).text).toBe(text);
    },
  );

  it("keeps the existing UTF-8 binary representation", () => {
    expect(utf8ToBinary("A")).toBe("01000001");
    expect(encodeText("A").dnaPositive).toBe("CAAC");
  });

  it("normalizes DNA input before decoding", () => {
    const result = decodeDna("ca-ac xyz");
    expect(result.cleanDna).toBe("CAAC");
    expect(result.text).toBe("A");
  });
});
