import { test, expect } from '@playwright/test';
import { AmazonHomePage } from '../pom/AmazonHomePage.spec';
import testData from './testData.json';

const WAIT_VISIBLE_TIMEOUT = 15000;

test('Search TV in Amazon.com', async ({ page }) => {
  // Use the POM class for navigation and search. Amazon.com and Search for item from JSON
  const homePage = new AmazonHomePage(page);
  await homePage.goto();
  // Handle bot detection if it appears after navigation
  await homePage.handleBotDetection();
  // Search using locators from the POM
  await page.fill(homePage.searchBox, testData.searchItem);
  await page.click(homePage.searchButton);

  // Select the 3rd product and get its price using POM locators
  const product = homePage.getProductByIndex(2);
  const fullPrice = await product.locator(homePage.productPrice).first().innerText();
  console.log('3rd product full price:', fullPrice);

  // Click the Add to Cart button using locator from POM
  const productButton = page.locator(homePage.addToCartButton);
  await productButton.click();

  // This is  domcontentloaded for better cross-browser compatibility
  await page.waitForLoadState('domcontentloaded');

  // Ensure the cart is visible before interacting
  const cart = page.locator(homePage.cartIcon);
  // Ensure the cart is visible and scroll into view
//  await cart.scrollIntoViewIfNeeded();
 // await cart.waitFor({ state: 'visible', timeout: WAIT_VISIBLE_TIMEOUT });
await expect(cart).toBeVisible();
await expect(cart).toBeEnabled();

  // Attempt to click the cart
  //await cart.click();

  // Locator info of the SubTotal
  // 1. Wait for the specific container shown in your screenshot
  //await page.waitForSelector(homePage.cartSubtotal, { state: 'visible', timeout: WAIT_VISIBLE_TIMEOUT });

  // 2. Use a locator that specifically targets the price span
  //const cartPrice = page.locator(homePage.cartPrice).nth(1);

  // 3. Assertion checks to make sure the price matches with 3rd item in the search criteria
  //await expect(cartPrice).toContainText(fullPrice, { timeout: WAIT_VISIBLE_TIMEOUT });
});
