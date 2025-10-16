export default function evaluateRule(rule, context = {}) {
    if (!rule || !rule.trim()) return false;

    // Allowed operators: >, >=, <, <=, ==, ===, !=
    // I used new Function(...) in evaluateRule for simplicity. 
    // Production: I need to replace with an expression parser (e.g., expr-eval or jsep) to avoid arbitrary code execution and to provide a strictly-typed expression language.
    try {
        const argNames = Object.keys(context);
        const argValues = Object.values(context);
        // Building a function like (revenue) => (revenue > 1000000)
        const fn = new Function(...argNames, `return (${rule});`);

        console.log("context ------", context);


        console.log("eval ------", !!fn(...argValues));

        return !!fn(...argValues); // ensure boolean - (double !! ensures the result is converted to a clean boolean (true/false).)
    } catch (err) {
        console.warn('Rule eval error', err);
        return false;
    }
}
