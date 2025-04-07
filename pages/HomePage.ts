import { Page, Locator, expect } from "@playwright/test";
import { url } from "inspector";

export class HomePage {
  readonly page: Page;
  readonly increaseCounterButton: Locator;
  readonly decreaseCounterButton: Locator;
  readonly resetCounterValue: Locator;
  readonly logoutButton: Locator;
  private currentCounter: number = 0;


  constructor(page: Page) {
    this.page = page;
    this.increaseCounterButton = page.getByRole("button", { name: "+" });
    this.decreaseCounterButton = page.getByRole("button", { name: "-" });
    this.resetCounterValue = page.getByRole("button", { name: "Reset" });
    this.logoutButton = page.getByRole("button", { name: "Logout" });
  }


  async increaseCounter(clicks: number) {
    for (let i = 1; i <= clicks; i++) {
      await this.increaseCounterButton.click();
      await this.page.waitForTimeout(500);

      this.currentCounter++; //icreament of the global counter variable 
    }

    // assert the counter value
    const counterValue = this.page.getByText(`${this.currentCounter}`);
    await expect(counterValue).toHaveText(this.currentCounter.toString());
  }


  async decreaseCounter(clicks: number) {
    // verify the current counter value
    const currentCounterValue = this.currentCounter;
    console.log("Current Counter Value:", currentCounterValue);
    
    for (let i = 1; i <= clicks; i++) {
      await this.decreaseCounterButton.click();
      await this.page.waitForTimeout(500);
      this.currentCounter--;
    }

    // Calculate the expected value after decreasing
    const expectedValue = this.currentCounter;

    // assert the expected value
    const expectedCounterValue = this.page.getByText(`${expectedValue}`);
    await expect(expectedCounterValue).toHaveText(expectedValue.toString());
  }


  async resetCounter(counter: number) {
    this.currentCounter = 0;
    const counterValue = this.page.getByText(`${this.currentCounter}`);

    await this.resetCounterValue.click();
    await expect(counterValue).toHaveText(counter.toString());
  }

  
  async logout() {
    await this.logoutButton.click();
  }


  async verifySuccessLogout(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async verifySuccessLogoutBackToHomePage(url: any){
    await this.page.goBack();
    await expect(this.page).not.toHaveURL(url)
    console.log(this.page.url()) // should be expected login page
  }
}

export default HomePage;
