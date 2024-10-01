import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('Auto waitings', async({page}) => {
    const successButton = page.locator('.bg-success')

    //const text = successButton.textContent()
    await successButton.waitFor({state: "attached"})
    const text = successButton.allTextContents()

    expect(text).toContain("Data loaded with AJAX get request.")

    await expect(successButton).toHaveText("Data loaded with AJAX get request.", {timeout: 20000}) //Will fail as the default autowait is 5 sec.
})

test('Alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    //__wait for element
    //await page.waitForSelector('.bg-success')

    //__wait for response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    const text = successButton.allTextContents()
    expect(text).toContain("Data loaded with AJAX get request.")
})