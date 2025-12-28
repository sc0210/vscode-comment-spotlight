// Example file to test Custom Comment Highlighter extension

function calculateSum(a, b) {
    // TODO: Add input validation
    return a + b;
}

function processData(data) {
    // FIX: This function needs optimization
    // NOTE: Currently only handles arrays
    // [SamChen] Review the error handling logic here

    if (!Array.isArray(data)) {
        // LOG: Temporary workaround for non-array inputs
        return [];
    }

    return data.map(item => item * 2);
}

// Regular comment - this won't be highlighted
function cleanup() {
    // TODO: Implement cleanup logic
    console.log('Cleaning up...');
}

/*
 * Multi-line comment
 * // TODO: This should be highlighted even in multi-line comment
 * //FIX: And this too
 */
