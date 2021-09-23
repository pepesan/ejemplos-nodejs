## Arranque de la app
npm install
npm start
## Arranque de test
### Para ejecutar mocha
npm test
### Para ejecutar mocha con mochawesome
npm run test-guapo

Los informes están en ./mochawesome-report
## Instalación de dependencias de Cypress
Si tienes linux:
apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

## Instalación de dependencias
npm install -D cypress
npm install -g cypress
### Ejecución de Cypress
cypress open

## Selenium driver
### Instalación de Chrome webdriver
descargar el ejecutable para la versión de chrome que tengamos desde
https://chromedriver.chromium.org/downloads

npm install -D selenium-webdriver

copiarlo a un directorio dentro del path
## Ejecución de cucumber
npm install -D @cucumber/cucumber
npm install -g @cucumber/cucumber

## Ejecución de Cucumber
Local: node node_modules\@cucumber\cucumber\bin\cucumber-js
Global: cucumber-js

package.json
npm run cucumber


