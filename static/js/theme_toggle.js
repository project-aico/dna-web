document.addEventListener("DOMContentLoaded", function () {
    // init materialize select
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});

    const convertBtn = document.getElementById("convert-btn");
    const clearBtn = document.getElementById("clear-btn");
    const copyBtn = document.getElementById("copy-btn");
    const downloadBtn = document.getElementById("download-btn");
    const inputText = document.getElementById("input-text");
    const outputText = document.getElementById("output-text");
    const modeSelect = document.getElementById("mode-select");
    const themeToggle = document.getElementById("theme-toggle");

    // system theme follow
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    const setTheme = (dark) => {
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
        themeToggle.checked = dark;
    };
    setTheme(prefersDark.matches);
    prefersDark.addEventListener("change", e => setTheme(e.matches));

    themeToggle.addEventListener("change", () => setTheme(themeToggle.checked));

    clearBtn.addEventListener("click", () => {
        inputText.value = "";
        outputText.value = "";
        M.textareaAutoResize(inputText);
        M.textareaAutoResize(outputText);
    });

    convertBtn.addEventListener("click", async () => {
        const mode = modeSelect.value;
        const payload = inputText.value.trim();
        if (!payload) {
            M.toast({ html: "Please enter input text or DNA sequence." });
            return;
        }

        convertBtn.classList.add("disabled");
        try {
            const res = await fetch("/api/transcode", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode: mode, text: payload })
            });
            const j = await res.json();
            if (!j.ok) {
                M.toast({ html: "Error: " + (j.error || "unknown") });
                outputText.value = j.error || "error";
            } else {
                // show compacted output for mobile
                if (j.mode === "encode") {
                    outputText.value = j.dna.positive_strand.sequence;
                } else {
                    outputText.value = j.dna.positive_strand.text;
                }
            }
            M.textareaAutoResize(outputText);
        } catch (e) {
            M.toast({ html: "Network error" });
            outputText.value = String(e);
        } finally {
            convertBtn.classList.remove("disabled");
        }
    });

    copyBtn.addEventListener("click", async () => {
        const text = outputText.value;
        if (!text) { M.toast({ html: "Nothing to copy" }); return; }
        try {
            await navigator.clipboard.writeText(text);
            M.toast({ html: "Copied!" });
        } catch (e) {
            M.toast({ html: "Copy failed" });
        }
    });

    downloadBtn.addEventListener("click", () => {
        const text = outputText.value;
        if (!text) { M.toast({ html: "Nothing to download" }); return; }
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "output.txt"; document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
    });

});