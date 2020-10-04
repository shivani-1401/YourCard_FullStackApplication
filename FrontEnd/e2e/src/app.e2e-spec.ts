import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Home', () => {
  const homePage = new AppPage();

  beforeAll(() => {
    homePage.navigateToHome();
  });

  it('should navigate to home page', () => {
    expect(homePage.getPageCurrentUrl()).toContain('/home');
  });


  it('should have the correct title', () => {
    expect(homePage.getPageTitle()).toBe('FrontEnd');
  });

});
