# qa-webdriverio-js-pom

![E2E Tests](https://github.com/elderalvesf/qa-webdriverio-js-pom/actions/workflows/ci.yml/badge.svg)
[![WebDriverIO](https://img.shields.io/badge/WebDriverIO-v8-EA5906?style=flat&logo=webdriverio&logoColor=white)](https://webdriver.io)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Mocha](https://img.shields.io/badge/Mocha-8896F7?style=flat&logo=mocha&logoColor=white)](https://mochajs.org)
[![Allure](https://img.shields.io/badge/Allure-Report-brightgreen?style=flat)](https://allurereport.org)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=flat&logo=github-actions&logoColor=white)](https://github.com/features/actions)

Professional E2E test automation framework built with **WebDriverIO v8**, **JavaScript (ES2022+)**, and **Page Object Model** — targeting [SauceDemo](https://www.saucedemo.com), a public e-commerce application created specifically for automation testing practice.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [WebDriverIO v8](https://webdriver.io) | E2E automation framework |
| JavaScript (ES2022+) | Primary language |
| [Mocha](https://mochajs.org) | Test runner |
| [Allure Reporter](https://allurereport.org) | Test reporting |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
| [SauceDemo](https://www.saucedemo.com) | Application under test |

---

## Project Architecture

```
qa-webdriverio-js-pom/
│
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions — runs on every push/PR
│
├── test/
│   ├── pageobjects/              # Page Object Model layer
│   │   ├── base.page.js         # Base class with shared browser interactions
│   │   ├── login.page.js        # Login page interactions
│   │   ├── inventory.page.js    # Product listing page interactions
│   │   ├── cart.page.js         # Shopping cart interactions
│   │   └── checkout.page.js     # Checkout flow interactions
│   │
│   └── specs/                    # Test suites
│       ├── login.spec.js        # Login scenarios
│       ├── inventory.spec.js    # Product listing and sorting
│       ├── cart.spec.js         # Cart management
│       └── checkout.spec.js     # Checkout E2E flow
│
├── data/
│   └── testData.js              # Centralized test data (users, products, checkout)
│
├── wdio.conf.js                 # WebDriverIO central configuration
└── package.json                 # Dependencies and npm scripts
```

### Page Object Model

Each page of the application has a corresponding Page Object class that encapsulates:
- **Selectors** as getter properties (`get loginButton() { return $('#login-button'); }`)
- **Actions** as async methods (`async login(username, password) { ... }`)

Specs import Page Objects and call their methods — assertions live exclusively in spec files, never in Page Objects.

---

## Prerequisites

- **Node.js 18+** — [download](https://nodejs.org)
- **npm** (bundled with Node.js)
- **Google Chrome** installed locally

---

## Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/elderalvesf/qa-webdriverio-js-pom.git
cd qa-webdriverio-js-pom

# 2. Install dependencies
npm ci

# 3. Run all tests
npm test
```

Tests run in **headless Chrome** by default. To run with a visible browser, remove the `--headless` flag from `wdio.conf.js`.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm test` | Run all test suites |
| `npm run test:login` | Run login tests only |
| `npm run test:inventory` | Run inventory/product tests only |
| `npm run test:cart` | Run cart tests only |
| `npm run test:checkout` | Run checkout tests only |
| `npm run report` | Generate and open Allure HTML report |

---

## Test Coverage

| Suite | File | Cases | Scenarios covered |
|---|---|---|---|
| Login | `login.spec.js` | 5 | Valid login, invalid password, locked user, empty fields, logout |
| Inventory | `inventory.spec.js` | 5 | Product count, sort by price, sort by name, add to cart, remove from cart |
| Cart | `cart.spec.js` | 4 | Add product, remove product, continue shopping, verify quantity |
| Checkout | `checkout.spec.js` | 6 | Full E2E, missing first/last name, missing zip, order summary, confirmation |
| **Total** | | **20** | |

---

## Viewing the Allure Report

After running the tests, generate and open the HTML report:

```bash
npm run report
```

This runs `allure generate allure-results --clean -o allure-report` and opens the report in your default browser.

In CI, the Allure report is uploaded as a GitHub Actions artifact and available for download from the **Actions** tab for 30 days.

---

## Design Decisions

### Page Object Model
POM separates UI interaction logic from test assertions. Page Objects describe *how* to interact with the UI; specs describe *what* to verify. This separation reduces duplication and makes tests easier to maintain when the UI changes.

### Mocha as test runner
Mocha is WebDriverIO's default framework and requires zero extra configuration. It supports `describe/it` blocks, `before/beforeEach/after/afterEach` hooks, and async/await natively.

### Allure Reporter
Allure generates rich HTML reports with step-by-step execution details, screenshots on failure, and historical trend tracking. It is the industry standard for professional QA teams and integrates natively with WebDriverIO via `@wdio/allure-reporter`.

### JavaScript over TypeScript
JavaScript is the primary language used in day-to-day WebDriverIO projects in most QA teams. It keeps the setup minimal and focuses the framework on automation patterns rather than type system configuration.

### SauceDemo as the target app
SauceDemo is a stable, publicly available e-commerce application purpose-built for automation testing. It provides realistic multi-step user flows (login → browse → cart → checkout) and uses consistent `data-test` attributes across all interactive elements, enabling stable selectors.

---

## Author

**Elder Freitas** — QA Analyst (Senior)  
[linkedin.com/in/elderalvesf](https://linkedin.com/in/elderalvesf)
