var {Given, When, Then } = require('@cucumber/cucumber');
var assert = require('assert');
const {Builder, By} = require('selenium-webdriver');
var driver;
Given('Voy a la pagina principal', async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://cursosdedesarrollo.com/');
});

When('Escribo {string} en el buscador y pulso buscar', async function (string) {
    await driver.findElement(By.css("input.search-field")).sendKeys(string);
    await driver.findElement(By.css("input.search-submit.button")).click();
});

  Then('Encuento el titulo {string}', async function(string) {
    var h1 = await driver.findElement(By.css("header.page-header h1"), 5000);
    assert.strictEqual(await h1.getText(), string);
    await driver.quit();

  });
