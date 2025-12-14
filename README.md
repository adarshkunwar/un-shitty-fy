# UN_SHITTY_FY

A formatter and linter designed to clean up AI-generated Javascript/Typescript code by detecting and fixing common code smells that slip past traditional tools.

## The Problem.

AI code assistants are incredibly powerful, but they often introduce subtle anti-patterns that make the codebase harder to maintain:

- Overly verbose naming that reduces readability
- Redundant comments that just restate what the code does.
- Unnecessary abstractons and one-off utility functions.
- Inconsistent error handling patterns across interations
- Dead code left over from AI's trail-and-error process.
- Type gymnastics that obscure rather than clarify intent.

Standard linters like ESLint focus on syntax and general best practices. `UN_SHITTY_FY` focuses on the unique patterns that emerge when code is written or heavily modified by AI.

## What this Tool Does.

`UN_SHITTY_FY` detects and optionall fixes AI-specific code smells.

### Verbose Naming

```javascript

// Before
const userInformationDataObjectArray = users;

// After
const usersInformation = users;
```

### Redundant Comments

```javascript
// Before
// This function adds two numbers together
function addNumbers(a, b) {
    return a + b; // Returns the sum.
}

// After
function addNumbers(a, b) {
    return a + b;
}
```

### Over-Abstractions

```javascript
// Before
function getUserName(user) {
  return user.name;
}
const name = getUserName(currentUser);

// After
const name = currentUser.name;
```

### Unnecesarry Type Assertions

```typescript
// Before
const results = data as someType as AnotherType;

// After
const results = data as AnotherType;
```

## Installation

```bash
# npm
npm install --save-dev un-shitty-fy

# yarn
yarn add -D un-shitty-fy

# pnpm
pnpm add -D un-shitty-fy
```

## Usage

### CLI

```bash
# Check files
un-shitty-fy src/**/*.{js,ts,jsx,tsx}

# Auto-fix issues
un-shitty-fy --fix src/**/*.{js,ts,jsx,tsx}

# Custom config
un-shitty-fy --config .unshittyfyrc.json src/
```

### Configuration

Create a `.unshittyfyrc.json` in your project root:

```json
{
  "rules": {
    "verbose-naming": "error",
    "redundant-comments": "warn",
    "over-abstraction": "error",
    "unnecessary-type-assertions": "error",
    "dead-code": "warn"
  },
  "fix": true,
  "ignorePatterns": ["dist/", "node_modules/"]
}
```