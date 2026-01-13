// Test file to verify keyword highlighting in both comments and code

// TODO: This is a comment with keyword
const TODO = "This is a variable named TODO";

// important: Another keyword in comment
let important = "keyword in variable name";
let data = "important data in string";

function testFunction() {
    // FIX: Fix this later
    const FIX = 123;
    // Test multiple keywords on same line: TODO and important
    console.log("TODO: important task");
}

// NOTE: Keywords should be highlighted everywhere
const NOTE = {
    message: "NOTE appears in comment, code, and strings"
};

// Test special characters in keywords
const test = "Should handle regular keywords";
