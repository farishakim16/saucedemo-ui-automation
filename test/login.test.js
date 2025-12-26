const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Inventory Sort Tests", function () {
  this.timeout(60000);
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://www.saucedemo.com/");
    console.log("Situs dibuka");

    await driver.findElement(By.css('[data-test="username"]'))
      .sendKeys("standard_user");

    await driver.findElement(By.css('[data-test="password"]'))
      .sendKeys("secret_sauce");

    await driver.findElement(By.css('[data-test="login-button"]')).click();

    await driver.wait(
      until.elementLocated(By.css('[data-test="product-sort-container"]')),
      10000
    );

    const sortDropdown = await driver.findElement(
      By.css('[data-test="product-sort-container"]')
    );
    await sortDropdown.click();

    console.log("Dropdown sort dibuka");
  });

  it("Sort produk A-Z", async function () {
    await driver.findElement(By.css('option[value="az"]')).click();

    const products = await driver.findElements(
      By.css(".inventory_item_name")
    );

    const firstName = await products[0].getText();
    const lastName = await products[products.length - 1].getText();

    console.log("A-Z Produk pertama:", firstName);
    console.log("A-Z Produk terakhir:", lastName);

    assert.ok(
      firstName.localeCompare(lastName) < 0,
      "Produk tidak terurut dari A ke Z"
    );
  });

  it("Sort produk Z-A", async function () {
    await driver.findElement(By.css('option[value="za"]')).click();

    const products = await driver.findElements(
      By.css(".inventory_item_name")
    );

    const firstName = await products[0].getText();
    const lastName = await products[products.length - 1].getText();

    console.log("Z-A Produk pertama:", firstName);
    console.log("Z-A Produk terakhir:", lastName);

    assert.ok(
      firstName.localeCompare(lastName) > 0,
      "Produk tidak terurut dari Z ke A"
    );
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
