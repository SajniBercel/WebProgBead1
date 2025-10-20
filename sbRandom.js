let s = 1;

export function seed(x) {
    s = x || 1;
}

// random number
export function rand() {
    //s = (s * 1664525 + 1013904223) >>> 0;
    s = (s * 75) % 65537;
    return s;
}