# 🧪 Automation Test Store — Playwright Test Suite

Welcome to **Automation Test Store Playwright Automation**, a personal end-to-end test suite powered by [Playwright](https://playwright.dev/). This project demonstrates modern test automation practices for five key e-commerce features:
- 🔐 Login  
- 🧍 Register  
- ❓ Forgot Password  
- 🛒 Add to Cart  
- 💳 Checkout  

This project is fully integrated with Qase.io for test case management—where all test steps are documented, and execution results are automatically updated after every run.
Additionally, a CI/CD pipeline is set up using GitHub Actions, ensuring tests are executed on every push or manual trigger. The pipeline generates a detailed Playwright HTML report, which is automatically deployed to GitHub Pages for easy access.

📄 Live CI/CD Test Report: [view github page report](https://irfanplazuardi.github.io/automationteststore/)

![qase report](snapshots/qase-report.png)
![github actions](snapshots/github-action.png)

## 🚀 Getting Started

### 1. Clone This Repository

```bash
git clone https://github.com/your-username/automation-test-store-playwright.git
cd automation-test-store-playwright
```

### 2. Install Dependencies

Make sure [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) is installed on your system.

```bash
yarn install
yarn playwright install
```

## 🔐 Environment Setup

### 3. Create `.env` File

Set up a `.env` file in the project root to store credentials and personal data:

```env
LOGIN_NAME=
PASSWORD=
EMAIL=
FIRST_NAME=
LAST_NAME=
```

> ⚠️ Never commit your `.env` file to version control.

### 4. Generate `auth.json` for Authenticated Tests

Some tests require bypassing the login flow using a saved authentication state.

To generate `auth.json`:

```bash
yarn playwright codegen --save-storage=auth.json https://automationteststore.com
```

A browser window will open. Log in manually with your valid credentials. After successful login, close the browser—`auth.json` will be created automatically.

## ✅ Running the Tests

Once everything is set up, run all test cases using:

```bash
yarn playwright test
```

## 📁 Project Structure

```bash
.
├── pages/               # Page object locaters
├── snapshots/           # Aria yamal snapshot collection
├── tests                # Playwright test files
├── .env                 # Environment variables
├── auth.json            # Stored login session (optional)
└── playwright.config.ts # Playwright configuration
```

## 🤝 Contributions

This is a personal project, but if you find something that could be improved—feel free to fork it and send a pull request. Feedback is always welcome!