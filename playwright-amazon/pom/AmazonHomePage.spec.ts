import { Page,expect } from '@playwright/test';

export class AmazonHomePage {
  readonly page: Page;
  // Core search page locators
  readonly searchBox = 'input#twotabsearchtextbox';
  readonly searchButton = 'input#nav-search-submit-button';

  // Search results locators
  readonly productItem = 'div.s-main-slot div[data-component-type="s-search-result"]';
  readonly productPrice = 'span.a-price > span.a-offscreen';
  readonly addToCartButton = '#a-autoid-3-announce';

  // Cart page locators
  readonly cartIcon = '#nav-cart';
  readonly cartSubtotal = '#sc-subtotal-amount-buybox';
  readonly cartPrice = '#sc-active-cart [class*="sc-price"]';

  constructor(page: Page) {
    this.page = page;
    
  }

  async goto() {
    // Add stealth-like scripts before navigation. Address Amazon bot detection when continue shopping appears on intermittent basis
    await this.addStealthScripts();
    await this.page.goto('https://www.amazon.com/');
    await this.handleBotDetection();
  }
  // Add stealth-like scripts to mask automation. This code will bypass Amazon BOT detection
  async addStealthScripts() {
    // Remove webdriver property
    await this.page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });
    // Mock plugins and languages
    await this.page.addInitScript(() => {
      Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
      Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
    });
    
  }

  // Handles bot detection popup if present in continue shopping 
  async handleBotDetection() {
    // If a bot-detection URL or popup appears, handle it
    // Example: look for 'Continue shopping' button
    const continueButton = this.page.getByRole('button', { name: /continue shopping/i });
    try {
      // Wait up to 5 seconds for the button to appear
      await continueButton.waitFor({ timeout: 5000 });
      await continueButton.click();
    } catch (e) {
      // Button did not appear, continue as normal
    }
  }

  // Get product locator by index
  getProductByIndex(index: number) {
    return this.page.locator(this.productItem).nth(index);
  }

  
  async clickOnProduct(index: number) {
    const productButton = this.getProductByIndex(index);
    await productButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(productButton).toBeEnabled();
    await productButton.click();
  }
}


