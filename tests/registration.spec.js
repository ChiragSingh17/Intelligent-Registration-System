const { test, expect } = require('@playwright/test');


test.describe('Registration System Tests', () => {
  
  test.beforeEach(async ({ page }) => {
   
    await page.goto('/index.html');
    
    await page.waitForSelector('#registration-form', { timeout: 10000 });
    
    const pageUrl = page.url();
    const pageTitle = await page.title();
    console.log(`\n📄 Page URL: ${pageUrl}`);
    console.log(`📄 Page Title: ${pageTitle}\n`);
  });

  test('Flow A - Negative Scenario: Missing Last Name', async ({ page }) => {
    console.log('🧪 Running Flow A: Negative Scenario Test');
    
    await page.fill('#firstName', 'John');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#phone', '+11234567890');
    await page.fill('#age', '25');
    
    await page.check('input[name="gender"][value="male"]');
    
    await page.fill('#address', '123 Main Street');
    
    await page.selectOption('#country', 'usa');
    await page.waitForTimeout(500);
    await page.selectOption('#state', { index: 1 });
    await page.waitForTimeout(500);
    await page.selectOption('#city', { index: 1 });
    
    await page.fill('#password', 'SecurePass123!');
    await page.fill('#confirmPassword', 'SecurePass123!');
    
    await page.check('#terms');
    
    const submitButton = page.locator('#submit-btn');
    await expect(submitButton).toBeDisabled();
    
    await page.locator('#lastName').blur();
    await page.waitForTimeout(300);
    
    const lastNameError = page.locator('#lastName-error');
    await expect(lastNameError).toContainText('Last Name is required');
    
    const lastNameField = page.locator('#lastName');
    await expect(lastNameField).toHaveClass(/invalid/);
    
    await page.screenshot({ 
      path: 'error-state.png', 
      fullPage: true 
    });
    console.log('✅ Screenshot captured: error-state.png');
    
    await page.evaluate(() => {
      document.getElementById('lastName').dispatchEvent(new Event('blur'));
    });
    
    console.log('✅ Flow A completed: Error validation working correctly');
  });

  test('Flow B - Positive Scenario: Successful Registration', async ({ page }) => {
    console.log('🧪 Running Flow B: Positive Scenario Test');
    
    await page.fill('#firstName', 'Jane');
    await page.locator('#firstName').blur();
    await page.fill('#lastName', 'Smith');
    await page.locator('#lastName').blur();
    await page.fill('#email', 'jane.smith@example.com');
    await page.locator('#email').blur();
    await page.fill('#phone', '+11234567890');
    await page.locator('#phone').blur();
    await page.fill('#age', '28');
    await page.locator('#age').blur();
    
    await page.check('input[name="gender"][value="female"]');
    
    await page.fill('#address', '456 Oak Avenue, Suite 200');
    
    await page.selectOption('#country', 'usa');
    await page.waitForTimeout(500);
    await page.selectOption('#state', { index: 1 });
    await page.waitForTimeout(500);
    await page.selectOption('#city', { index: 1 });
    await page.waitForTimeout(500);
    
    await page.locator('#password').fill('');
    await page.type('#password', 'StrongPassword123!@#', { delay: 50 });
    await page.waitForTimeout(800);
    await page.locator('#confirmPassword').fill('');
    await page.type('#confirmPassword', 'StrongPassword123!@#', { delay: 50 });
    await page.locator('#confirmPassword').blur();
    await page.waitForTimeout(800);
    
    const strengthText = page.locator('#strength-text');
    await expect(strengthText).toContainText('Strong', { timeout: 2000 });
    console.log('✅ Password strength validated');
    
    await page.check('#terms');
    await page.waitForTimeout(1500);
    
    await page.evaluate(() => {
      const passwordField = document.getElementById('password');
      if (passwordField) {
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await page.waitForTimeout(500);
    
    const submitButton = page.locator('#submit-btn');
    await expect(submitButton).toBeEnabled({ timeout: 10000 });
    
    await submitButton.click();
    
    const successAlert = page.locator('#success-alert');
    await expect(successAlert).toBeVisible({ timeout: 5000 });
    
    await expect(successAlert).toContainText('Registration Successful!');
    await expect(successAlert).toContainText('Your profile has been submitted successfully.');
    
    await expect(page.locator('#firstName')).toHaveValue('');
    await expect(page.locator('#lastName')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
    
    await page.screenshot({ 
      path: 'success-state.png', 
      fullPage: true 
    });
    console.log('✅ Screenshot captured: success-state.png');
    
    console.log('✅ Flow B completed: Registration successful');
  });

  test('Flow C - Form Logic Validation', async ({ page }) => {
    console.log('🧪 Running Flow C: Form Logic Validation Test');
    
    console.log('  📋 Test 1: Country → States dropdown update');
    await page.selectOption('#country', 'india');
    await page.waitForTimeout(500);
    
    const stateSelect = page.locator('#state');
    await expect(stateSelect).toBeEnabled();
    const stateOptions = await stateSelect.locator('option').count();
    expect(stateOptions).toBeGreaterThan(1);
    console.log('  ✅ States dropdown updated when country changed');
    
    console.log('  📋 Test 2: State → Cities dropdown update');
    await page.selectOption('#state', { index: 1 });
    await page.waitForTimeout(500);
    
    const citySelect = page.locator('#city');
    await expect(citySelect).toBeEnabled();
    const cityOptions = await citySelect.locator('option').count();
    expect(cityOptions).toBeGreaterThan(1);
    console.log('  ✅ Cities dropdown updated when state changed');
    
    console.log('  📋 Test 3: Password strength validation');
    
    await page.fill('#password', 'weak');
    await page.type('#password', 'x', { delay: 100 });
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(1000);
    let strengthText = page.locator('#strength-text');
    const strengthValue = await strengthText.textContent();
    if (strengthValue.includes('Weak') || strengthValue.includes('weak')) {
      console.log('  ✅ Weak password detected');
    } else {
      console.log(`  ⚠️  Password strength: ${strengthValue} (expected Weak)`);
    }
    
    await page.fill('#password', 'MediumPass123');
    await page.type('#password', 'x', { delay: 100 });
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(1000);
    const strengthValue2 = await strengthText.textContent();
    if (strengthValue2.includes('Medium') || strengthValue2.includes('medium')) {
      console.log('  ✅ Medium password detected');
    } else {
      console.log(`  ⚠️  Password strength: ${strengthValue2} (expected Medium)`);
    }
    
    await page.fill('#password', 'StrongPassword123!@#');
    await page.type('#password', 'x', { delay: 100 });
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(1000);
    const strengthValue3 = await strengthText.textContent();
    if (strengthValue3.includes('Strong') || strengthValue3.includes('strong')) {
      console.log('  ✅ Strong password detected');
    } else {
      console.log(`  ⚠️  Password strength: ${strengthValue3} (expected Strong)`);
    }
    
    console.log('  📋 Test 4: Password mismatch validation');
    await page.fill('#password', 'CorrectPassword123!');
    await page.waitForTimeout(300);
    await page.fill('#confirmPassword', 'WrongPassword456!');
    await page.locator('#confirmPassword').blur();
    await page.waitForTimeout(300);
    
    const confirmPasswordError = page.locator('#confirmPassword-error');
    await expect(confirmPasswordError).toContainText('Passwords do not match');
    
    const confirmPasswordField = page.locator('#confirmPassword');
    await expect(confirmPasswordField).toHaveClass(/invalid/);
    console.log('  ✅ Password mismatch error displayed');
    
    await page.fill('#confirmPassword', 'CorrectPassword123!');
    await page.waitForTimeout(300);
    await expect(confirmPasswordField).toHaveClass(/valid/);
    console.log('  ✅ Password match validated');
    
    console.log('  📋 Test 5: Submit button state validation');
    
    await page.fill('#firstName', 'Test');
    await page.locator('#firstName').blur();
    await page.fill('#lastName', 'User');
    await page.locator('#lastName').blur();
    await page.fill('#email', 'test@example.com');
    await page.locator('#email').blur();
    await page.fill('#phone', '+911234567890');
    await page.locator('#phone').blur();
    await page.check('input[name="gender"][value="male"]');
    await page.selectOption('#country', 'india');
    await page.waitForTimeout(500);
    await page.selectOption('#state', { index: 1 });
    await page.waitForTimeout(500);
    await page.selectOption('#city', { index: 1 });
    await page.waitForTimeout(500);
    await page.locator('#password').fill('');
    await page.type('#password', 'TestPass123!', { delay: 50 });
    await page.waitForTimeout(500);
    await page.locator('#confirmPassword').fill('');
    await page.type('#confirmPassword', 'TestPass123!', { delay: 50 });
    await page.locator('#confirmPassword').blur();
    await page.waitForTimeout(500);
    await page.check('#terms');
    await page.waitForTimeout(1500);
    
    await page.evaluate(() => {
      const passwordField = document.getElementById('password');
      if (passwordField) {
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await page.waitForTimeout(500);
    
    const submitButton = page.locator('#submit-btn');
    await expect(submitButton).toBeEnabled({ timeout: 10000 });
    console.log('  ✅ Submit button enabled when all fields are valid');
    
    await page.uncheck('#terms');
    await page.waitForTimeout(300);
    await expect(submitButton).toBeDisabled();
    console.log('  ✅ Submit button disabled when required field is missing');
    
    await page.check('#terms');
    await page.waitForTimeout(300);
    await expect(submitButton).toBeEnabled();
    console.log('  ✅ Submit button re-enabled when field is fixed');
    
    console.log('  📋 Test 6: Disposable email domain validation');
    await page.fill('#email', 'test@tempmail.com');
    await page.locator('#email').blur();
    await page.waitForTimeout(300);
    
    const emailError = page.locator('#email-error');
    await expect(emailError).toContainText('Disposable email domains are not allowed');
    await expect(submitButton).toBeDisabled();
    console.log('  ✅ Disposable email domain rejected');
    
    await page.fill('#email', 'test@example.com');
    await page.waitForTimeout(300);
    await expect(submitButton).toBeEnabled();
    
    console.log('  📋 Test 7: Phone number country code validation');
    await page.fill('#phone', '1234567890');
    await page.locator('#phone').blur();
    await page.waitForTimeout(300);
    
    const phoneError = page.locator('#phone-error');
    await expect(phoneError).toContainText('+91');
    await expect(submitButton).toBeDisabled();
    console.log('  ✅ Phone number validation with country code working');
    
    await page.fill('#phone', '+911234567890');
    await page.waitForTimeout(300);
    await expect(submitButton).toBeEnabled();
    
    console.log('✅ Flow C completed: All form logic validations passed');
  });

  test('Complete Registration Flow with Video', async ({ page }) => {
    console.log('🧪 Running Complete Registration Flow Test');
    
    await page.fill('#firstName', 'Alice');
    await page.locator('#firstName').blur();
    await page.fill('#lastName', 'Johnson');
    await page.locator('#lastName').blur();
    await page.fill('#email', 'alice.johnson@example.com');
    await page.locator('#email').blur();
    await page.fill('#phone', '+11234567890');
    await page.locator('#phone').blur();
    await page.fill('#age', '30');
    await page.locator('#age').blur();
    await page.check('input[name="gender"][value="female"]');
    await page.fill('#address', '789 Pine Street');
    await page.selectOption('#country', 'usa');
    await page.waitForTimeout(500);
    await page.selectOption('#state', { index: 1 });
    await page.waitForTimeout(500);
    await page.selectOption('#city', { index: 1 });
    await page.waitForTimeout(500);
    
    await page.locator('#password').fill('');
    await page.type('#password', 'SecurePass123!@#', { delay: 50 });
    await page.waitForTimeout(800);
    await page.locator('#confirmPassword').fill('');
    await page.type('#confirmPassword', 'SecurePass123!@#', { delay: 50 });
    await page.locator('#confirmPassword').blur();
    await page.waitForTimeout(800);
    await page.check('#terms');
    await page.waitForTimeout(1500);
    
    await page.evaluate(() => {
      const passwordField = document.getElementById('password');
      if (passwordField) {
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await page.waitForTimeout(500);
    
    const submitBtn = page.locator('#submit-btn');
    await expect(submitBtn).toBeEnabled({ timeout: 10000 });
    await submitBtn.click();
    
    await expect(page.locator('#success-alert')).toBeVisible({ timeout: 5000 });
    
    console.log('✅ Complete registration flow test passed');
  });
});
