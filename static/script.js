// Theme management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("theme-toggle")
    this.themeIcon = this.themeToggle.querySelector(".material-symbols-outlined")

    // Initialize theme
    this.initTheme()

    // Bind events
    this.themeToggle.addEventListener("click", () => this.toggleTheme())

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        this.updateThemeIcon(e.matches ? "dark" : "light")
      }
    })
  }

  initTheme() {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme)
      this.updateThemeIcon(savedTheme)
    } else {
      // Follow system preference
      this.updateThemeIcon(systemPrefersDark ? "dark" : "light")
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    this.updateThemeIcon(newTheme)
  }

  updateThemeIcon(theme) {
    this.themeIcon.textContent = theme === "dark" ? "light_mode" : "dark_mode"
  }
}

// API service
class ApiService {
  static async encode(text) {
    const response = await fetch("/encode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Encoding failed")
    }

    return response.json()
  }

  static async decode(dna) {
    const response = await fetch("/decode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dna }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Decoding failed")
    }

    return response.json()
  }
}

// UI utilities
class UIUtils {
  static showLoading() {
    document.getElementById("loading-overlay").style.display = "flex"
  }

  static hideLoading() {
    document.getElementById("loading-overlay").style.display = "none"
  }

  static showSnackbar(message, isError = false) {
    const snackbar = document.getElementById("snackbar")
    snackbar.textContent = message
    snackbar.className = `snackbar show ${isError ? "error" : ""}`

    setTimeout(() => {
      snackbar.className = "snackbar"
    }, 3000)
  }

  static async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text)
      this.showSnackbar("Copied to clipboard!")
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      this.showSnackbar("Copied to clipboard!")
    }
  }
}

// Main application
class DNAConverterApp {
  constructor() {
    this.themeManager = new ThemeManager()
    this.initEventListeners()
  }

  initEventListeners() {
    // Encode functionality
    document.getElementById("encode-btn").addEventListener("click", () => this.handleEncode())
    document.getElementById("encode-input").addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        this.handleEncode()
      }
    })

    // Decode functionality
    document.getElementById("decode-btn").addEventListener("click", () => this.handleDecode())
    document.getElementById("decode-input").addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        this.handleDecode()
      }
    })

    // Copy buttons
    document.querySelectorAll(".copy-button").forEach((button) => {
      button.addEventListener("click", (e) => this.handleCopy(e))
    })

    // Auto-resize textareas
    document.querySelectorAll("textarea").forEach((textarea) => {
      textarea.addEventListener("input", () => this.autoResize(textarea))
    })
  }

  async handleEncode() {
    const input = document.getElementById("encode-input")
    const text = input.value.trim()

    if (!text) {
      UIUtils.showSnackbar("Please enter some text to encode", true)
      return
    }

    try {
      UIUtils.showLoading()
      const result = await ApiService.encode(text)

      // Display results
      document.getElementById("binary-output").value = result.binary
      document.getElementById("dna-positive-output").value = result.dna_positive
      document.getElementById("dna-negative-output").value = result.dna_negative

      // Show results section
      document.getElementById("encode-results").style.display = "block"

      // Auto-resize output textareas
      document.querySelectorAll("#encode-results textarea").forEach((textarea) => {
        this.autoResize(textarea)
      })

      UIUtils.showSnackbar("Text encoded successfully!")
    } catch (error) {
      UIUtils.showSnackbar(error.message, true)
    } finally {
      UIUtils.hideLoading()
    }
  }

  async handleDecode() {
    const input = document.getElementById("decode-input")
    const dna = input.value.trim().toUpperCase()

    if (!dna) {
      UIUtils.showSnackbar("Please enter a DNA sequence to decode", true)
      return
    }

    // Basic validation
    if (!/^[ATGC]+$/.test(dna)) {
      UIUtils.showSnackbar("Invalid DNA sequence. Only A, T, G, C are allowed.", true)
      return
    }

    try {
      UIUtils.showLoading()
      const result = await ApiService.decode(dna)

      // Display results
      document.getElementById("decoded-text-output").value = result.decoded_text
      document.getElementById("decode-binary-output").value = result.binary
      document.getElementById("dna-complement-output").value = result.dna_complement

      // Show results section
      document.getElementById("decode-results").style.display = "block"

      // Auto-resize output textareas
      document.querySelectorAll("#decode-results textarea").forEach((textarea) => {
        this.autoResize(textarea)
      })

      UIUtils.showSnackbar("DNA sequence decoded successfully!")
    } catch (error) {
      UIUtils.showSnackbar(error.message, true)
    } finally {
      UIUtils.hideLoading()
    }
  }

  handleCopy(event) {
    const targetId = event.currentTarget.getAttribute("data-target")
    const textarea = document.getElementById(targetId)
    const text = textarea.value

    if (!text) {
      UIUtils.showSnackbar("Nothing to copy", true)
      return
    }

    UIUtils.copyToClipboard(text)
  }

  autoResize(textarea) {
    textarea.style.height = "auto"
    textarea.style.height = Math.max(textarea.scrollHeight, 60) + "px"
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new DNAConverterApp()
})
