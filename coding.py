#!/usr/bin/env python
# -*- coding:utf-8 -*-
"""
DNA coding mappings for binary to DNA conversion.
"""

# Binary to DNA base mapping (2 bits -> 1 base)
BIN_TO_DNA = {
    "00": "A",
    "01": "T", 
    "10": "G",
    "11": "C"
}

# DNA to binary mapping (1 base -> 2 bits)
DNA_TO_BIN = {
    "A": "00",
    "T": "01",
    "G": "10", 
    "C": "11"
}

# DNA complement mapping
DNA_COMPLEMENT = {
    "A": "T",
    "T": "A",
    "G": "C",
    "C": "G"
}
