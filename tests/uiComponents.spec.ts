import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Input fields', () => {
    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })
    test('Input fields', async({page}) =>{
        
        const usingTheGridFormEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
        await usingTheGridFormEmailInput.fill('testrson@gmail.com')
        //await usingTheGridFormEmailInput.clear()
        //await usingTheGridFormEmailInput.pressSequentially('palito@gmail.com', {delay: 500})

        //Generic assertion
        const inoutValue = await usingTheGridFormEmailInput.inputValue()
        expect(inoutValue).toEqual('testrson@gmail.com')
        //Locator assertion
        await expect(usingTheGridFormEmailInput).toHaveValue('testrson@gmail.com')

    })
})