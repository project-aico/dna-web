# api/app.py
from __future__ import annotations
from flask import Flask, request, jsonify, render_template
from pathlib import Path
import re


from dna.core import (
    utf8_to_binary,
    binary_to_utf8,
    binary_to_dna,
    dna_to_binary,
    complement_dna,
)

app = Flask(
    __name__,
    template_folder=str(Path(__file__).parent.parent / "templates"),
    static_folder=str(Path(__file__).parent.parent / "static"),
)

# small helper to sanitize DNA (allow only ACGTacgt)
DNA_RE = re.compile(r"^[ACGTacgt]+$")


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/api/transcode", methods=["POST"])
def api_transcode():
    data = request.get_json(force=True)
    mode = data.get("mode")
    payload = data.get("text", "")

    try:
        if mode == "encode":
            # UTF-8 text -> DNA
            binary = utf8_to_binary(payload)
            dna_pos = binary_to_dna(binary)
            dna_neg = complement_dna(dna_pos)
            bin_pos = dna_to_binary(dna_pos)
            bin_neg = dna_to_binary(dna_neg)
            text_pos = binary_to_utf8(bin_pos)
            text_neg = binary_to_utf8(bin_neg)

            return jsonify(
                {
                    "ok": True,
                    "mode": "encode",
                    "text_utf8": payload,
                    "dna": {
                        "positive_strand": {
                            "sequence": dna_pos,
                            "binary": bin_pos,
                            "text": text_pos,
                        },
                        "negative_strand": {
                            "sequence": dna_neg,
                            "binary": bin_neg,
                            "text": text_neg,
                        },
                    },
                }
            )

        elif mode == "decode":
            seq = payload.strip().upper()
            if not seq:
                return jsonify({"ok": False, "error": "empty DNA sequence"}), 400
            if not DNA_RE.match(seq):
                return (
                    jsonify(
                        {
                            "ok": False,
                            "error": "DNA sequence contains invalid characters (allow A C G T)",
                        }
                    ),
                    400,
                )

            bin_pos = dna_to_binary(seq)
            text_pos = binary_to_utf8(bin_pos)
            # also provide complement
            seq_neg = complement_dna(seq)
            bin_neg = dna_to_binary(seq_neg)
            text_neg = binary_to_utf8(bin_neg)

            return jsonify(
                {
                    "ok": True,
                    "mode": "decode",
                    "dna": {
                        "positive_strand": {
                            "sequence": seq,
                            "binary": bin_pos,
                            "text": text_pos,
                        },
                        "negative_strand": {
                            "sequence": seq_neg,
                            "binary": bin_neg,
                            "text": text_neg,
                        },
                    },
                }
            )
        else:
            return jsonify({"ok": False, "error": "unknown mode"}), 400

    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


if __name__ == "__main__":

    app.run(host="0.0.0.0", port=5000, debug=True)
