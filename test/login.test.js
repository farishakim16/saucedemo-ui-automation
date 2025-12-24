const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Login Page Tests", function () {
  this.timeout(60000);
  let driver;

  it("Login sukses & sort produk Z-A", async function () {
    driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://www.saucedemo.com/");

    // login
    await driver.findElement(By.css('[data-test="username"]'))
      .sendKeys("standard_user");
    await driver.findElement(By.css('[data-test="password"]'))
      .sendKeys("secret_sauce");
    await driver.findElement(By.css('[data-test="login-button"]')).click();

    await driver.wait(
      until.elementsLocated(By.css(".inventory_item_name")),
      10000
    );

    // Sort produk Z-A
    const sortDropdown = await driver.findElement(
      By.css('[data-test="product-sort-container"]')
    );
    await sortDropdown.click();

    const optionZA = await driver.findElement(
      By.css('option[value="za"]')
    );
    await optionZA.click();

    await driver.wait(
      until.elementsLocated(By.css(".inventory_item_name")),
      10000
    );

    const products = await driver.findElements(
      By.css(".inventory_item_name")
    );

    const firstName = await products[0].getText();
    const lastName = await products[products.length - 1].getText();

    // console.log("FIRST PRODUCT:", firstName);
    // console.log("LAST PRODUCT :", lastName);

    assert.ok(
      firstName.localeCompare(lastName) > 0,
      "Produk tidak terurut dari Z ke A"
    );
  });

  after(async function () {
    if (driver) await driver.quit();
  });
});
