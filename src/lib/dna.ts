const BIN_TO_DNA: Record<string, string> = {
  "00": "A",
  "01": "C",
  "10": "G",
  "11": "T",
};

const DNA_TO_BIN: Record<string, string> = {
  A: "00",
  C: "01",
  G: "10",
  T: "11",
};

const DNA_COMPLEMENT: Record<string, string> = {
  A: "T",
  C: "G",
  G: "C",
  T: "A",
};

export interface EncodeResults {
  binary: string;
  dnaNegative: string;
  dnaPositive: string;
}

export interface DecodeResults {
  binary: string;
  cleanDna: string;
  complement: string;
  text: string;
}

export function utf8ToBinary(text: string): string {
  return Array.from(new TextEncoder().encode(text))
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join(" ");
}

export function binaryToUtf8(binary: string): string {
  const bits = binary.replace(/\s/g, "");
  const bytes: number[] = [];

  for (let index = 0; index < bits.length; index += 8) {
    const byte = bits.slice(index, index + 8).padEnd(8, "0");
    bytes.push(Number.parseInt(byte, 2));
  }

  return new TextDecoder().decode(new Uint8Array(bytes));
}

export function binaryToDna(binary: string): string {
  const bits = binary.replace(/\s/g, "");
  let dna = "";

  for (let index = 0; index < bits.length; index += 2) {
    const pair = bits.slice(index, index + 2).padEnd(2, "0");
    dna += BIN_TO_DNA[pair];
  }

  return dna;
}

export function dnaToBinary(dna: string): string {
  const bits = Array.from(dna)
    .map((base) => DNA_TO_BIN[base] ?? "00")
    .join("");

  return bits.match(/.{1,8}/g)?.join(" ") ?? "";
}

export function complementDna(dna: string): string {
  return Array.from(dna)
    .map((base) => DNA_COMPLEMENT[base] ?? base)
    .join("");
}

export function encodeText(text: string): EncodeResults {
  const binary = utf8ToBinary(text);
  const dnaPositive = binaryToDna(binary);

  return {
    binary,
    dnaPositive,
    dnaNegative: complementDna(dnaPositive),
  };
}

export function decodeDna(dna: string): DecodeResults {
  const cleanDna = dna.toUpperCase().replace(/[^ATGC]/g, "");
  const binary = dnaToBinary(cleanDna);

  return {
    binary,
    cleanDna,
    complement: complementDna(cleanDna),
    text: binaryToUtf8(binary),
  };
}
