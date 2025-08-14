# Format for writing a test

Tests are for confirming the *functionality* of modules before bundling.
*Not* for checking whether an environment is correctly setup.

* Return nothing, test passed. throw error if test fails.
* `console.error` to provide specific error messages.

```typescript

// MUST BE: export default
export default function testName(): void {

}

```
