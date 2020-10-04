import { browser, by, element, ElementFinder, $ } from 'protractor';

export class AppPage {
  public navigateToHome() {
    browser.get('/');
}

public getToolbarTitle(): ElementFinder {
    return element(by.css('mat-toolbar span'));
}

public getPageTitle() {
    return browser.getTitle();
}

public getPageCurrentUrl() {
    return browser.getCurrentUrl();
}

// public getUsernameInput() {
//     return element(by.name('username'));

// }

// public getPasswordInput() {
//     return element(by.name('password'));
// }

// public getLoginButton() {
//     return $('.button');
// }
}
