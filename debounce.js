/**
 * Limits how often a function can fire over time.
 * @param {Function} func - The function to debounce
 * @param {number} delay - Delay in milliseconds
 */
function debounce(func, delay = 300) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// How to use in your application:
const handleSearch = debounce((event) => {
    console.log("Searching for:", event.target.value);
}, 500);

// Attach to an input field:
// document.getElementById("searchInput").addEventListener("input", handleSearch);