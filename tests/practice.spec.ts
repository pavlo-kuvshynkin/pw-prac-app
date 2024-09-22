import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locators syntax rule', async ({page}) => {

    //By Tag name
    await page.locator('input').first().click()
    //By ID
    page.locator('#inputEmail1')
    //By class value
    page.locator('.shape-rectangle')
    //By attribute
    page.locator('[placeholder="Email"]')
    //By class value (full)
    page.locator('class="input-full-width size-medium status-basic shape-rectangle nb-transition"')
    //Combine different selector (don't put a space between)
    page.locator('input[placeholder="Email"][nbinput]')
    //By the partial text match
    page.locator(':text("Using)')
    //By exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User face locators', async({page}) => {
    await page.getByRole('textbox', {name:"Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    //await page.getByTestId('SignIn').click()
})

test('Locating child elements', async({page}) =>{
    await page.locator('nb-card nb-radio :text-is ("Option 1")').click()
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
})

test('Locating parent elements', async({page}) =>{
    await page.locator('nb-card', {hasText:("Using the Grid")}).getByRole('button', {name: "Sign in"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('button', {name: "Sign in"}).click()

    await page.locator('nb-card').filter({hasText: ("Basic form")}).getByRole('button', {name: "Sign in"}).click()
    await page.locator('nb-card').filter({has: page.locator (".status-danger")}).getByRole('button', {name: "Sign in"}).click()
})

test('Reuse locators', async({page}) =>{
    const basicForm = page.locator('nb-card').filter({hasText: ("Basic form")})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    const passwordField = basicForm.getByRole('textbox', {name: "Password"})
    const signInButton = basicForm.getByRole('button', {name: "Sign in"})
    
    await emailField.fill("testrson@getnada.com")
    await passwordField.fill("welcome")
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button', {name: "Sign in"}).click()

    await expect(emailField).toHaveValue('testrson@getnada.com')
})

test('Extract text', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: ("Basic form")})
    const buttonText = basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    const radioButtonsTexts = await page.locator('nb-radio').allTextContents()
    expect(radioButtonsTexts).toContain("Option 1")
    //Extract entered text
    const emailField = await page.getByRole('textbox', {name: "Email"})
    await emailField.fill("testing@test.com")
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual("testing@test.com")
    //Grab placeholder name
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual("Eamil")
})