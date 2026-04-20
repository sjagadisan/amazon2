# Amazon Playwright Tests

This repository contains Playwright tests for automating interactions with the Amazon website. The tests are designed to ensure cross-browser compatibility and stability.

## Project Structure

- **package.json**: Contains project dependencies and scripts.
- **playwright.config.ts**: Configuration file for Playwright, including browser settings and test options.
- **playwright-report/**: Directory for storing test reports.
- **pom/**: Page Object Model (POM) files for modularizing test logic.
- **test-results/**: Directory for storing test results.
- **tests/**: Contains test files.
  - `amazon.spec.ts`: Tests for Amazon interactions.


## Prerequisites

- Node.js (v16 or higher)
- Playwright

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd amazon
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

To run all tests:
```bash
npx playwright test
```

To run a specific test file:
```bash
npx playwright test tests/amazon.spec.ts
```

To run tests in headed mode:
```bash
npx playwright test --headed
```

## Debugging Tests

Use the following command to debug tests:
```bash
npx playwright test --debug
```

## Generating Reports

After running tests, a report will be generated in the `playwright-report/` directory. To view the report:
```bash
npx playwright show-report
```

## Folder Details

- **playwright-report/**: Contains HTML reports for test runs.
- **pom/**: Page Object Model files for modularizing test logic.
- **test-results/**: Stores raw test results.
- **tests/**: Contains all test scripts.

## Common Issues

- **Flaky Tests**: Ensure proper waits and locators are used.
- **Browser Compatibility**: Test across Chrome, Edge, and Safari.

## Test Coverage

The tests in this repository include the following scenarios:

1. **Amazon BOT Detection**: Ensures that the tests can bypass or handle Amazon's bot detection mechanisms.
2. **Dynamic Price Check**: Dynamically verifies the price of the third item in the search results.
3. **Dynamic Assertion**: Performs assertions based on the third item's price on the Subtotal page.
4. **Cross-Browser Testing**: Runs tests in both Chrome and Edge browsers in parallel to ensure compatibility.

## Test Data

The tests use a JSON file (`testData.json`) to provide dynamic input data. This file contains the search item and other parameters used in the tests. By externalizing the data, the tests become more flexible and easier to maintain.

### Example `testData.json` Structure:
```json
{
  "searchItem": "TV"
}
```

Place the `testData.json` file in the `tests` directory, and ensure it is properly imported in the test files.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.