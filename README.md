# Intelligent Registration System

A modern, user-friendly Registration System with comprehensive client-side validations and automated testing using Playwright.

## 🎯 Features

### Web Application
- ✅ Responsive, modern UI design
- ✅ Real-time form validation with inline error messages
- ✅ Password strength meter (Weak/Medium/Strong)
- ✅ Dynamic Country → State → City dropdowns
- ✅ Disposable email domain detection
- ✅ Phone number validation with country codes
- ✅ Success/Error alerts with smooth animations
- ✅ Submit button disabled until all fields are valid

### Automation Testing
- ✅ **Flow A**: Negative scenario testing (missing required fields)
- ✅ **Flow B**: Positive scenario testing (successful registration)
- ✅ **Flow C**: Form logic validation (dropdowns, password strength, etc.)
- ✅ Screenshot capture on error and success states
- ✅ Video recording support
- ✅ Cross-browser testing (Chrome, Firefox, Safari)

## 📁 Project Structure

```
Intelligent Registration System/
│
├── index.html          # Main registration form
├── styles.css          # Styling and responsive design
├── script.js           # Validation logic and form handling
├── package.json        # Node.js dependencies
├── playwright.config.js # Playwright configuration
├── tests/
│   └── registration.spec.js  # Automation test suite
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Python 3 (for local web server)

### Installation

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Running the Application

#### Option 1: Using Python HTTP Server (Recommended)
```bash
python -m http.server 8000
```
Then open your browser and navigate to: `http://localhost:8000`

#### Option 2: Using Node.js HTTP Server
```bash
npx http-server -p 8000
```

#### Option 3: Using VS Code Live Server
- Install "Live Server" extension in VS Code
- Right-click on `index.html` and select "Open with Live Server"

### Running Automation Tests

#### Run all tests:
```bash
npm test
```

#### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

#### Run tests with UI mode (interactive):
```bash
npm run test:ui
```

#### Run tests in debug mode:
```bash
npm run test:debug
```

#### View test report:
```bash
npm run test:report
```

## 📋 Form Fields

### Required Fields
- **First Name** - Minimum 2 characters
- **Last Name** - Minimum 2 characters
- **Email** - Valid email format, no disposable domains
- **Phone Number** - Must match selected country code format
- **Gender** - Radio button selection (Male/Female/Other)
- **Country** - Dropdown selection
- **State** - Dropdown (updates based on country)
- **City** - Dropdown (updates based on state)
- **Password** - Minimum 8 characters with strength indicator
- **Confirm Password** - Must match password
- **Terms & Conditions** - Checkbox must be checked

### Optional Fields
- **Age** - Number between 1-120
- **Address** - Text area

## ✅ Validation Rules

### Client-Side Validations

1. **First Name & Last Name**
   - Required
   - Minimum 2 characters
   - Real-time validation on blur and input

2. **Email**
   - Required
   - Valid email format
   - Blocks disposable email domains (tempmail.com, 10minutemail.com, etc.)
   - Real-time validation

3. **Phone Number**
   - Required
   - Must start with country code if country is selected
   - Format validation based on country
   - Example: +1 for USA, +91 for India

4. **Password**
   - Required
   - Minimum 8 characters
   - Strength meter shows: Weak / Medium / Strong
   - Strength based on:
     - Length (8+ = weak, 12+ = medium)
     - Contains lowercase letters
     - Contains uppercase letters
     - Contains numbers
     - Contains special characters

5. **Confirm Password**
   - Required
   - Must match password exactly
   - Real-time validation

6. **Country/State/City**
   - Required
   - State dropdown updates when country changes
   - City dropdown updates when state changes
   - Cascading dropdowns with proper enable/disable logic

7. **Terms & Conditions**
   - Required checkbox
   - Submit button disabled if unchecked

## 🧪 Automation Test Scenarios

### Flow A: Negative Scenario
**Objective:** Test form validation with missing required fields

**Steps:**
1. Launch the web page
2. Print Page URL + Page Title
3. Fill form with:
   - First Name → filled
   - Last Name → **skipped** (intentionally)
   - Email → valid
   - Phone Number → valid
   - Gender → checked
   - All other required fields → filled
4. Click Submit (button should be disabled)
5. Validate:
   - Error message for missing Last Name appears
   - Last Name field highlighted in red
6. Capture Screenshot: `error-state.png`

### Flow B: Positive Scenario
**Objective:** Test successful form submission

**Steps:**
1. Fill form with all valid fields
2. Ensure Password & Confirm Password match
3. Ensure Terms & Conditions is checked
4. Verify password strength shows "Strong"
5. Submit the form
6. Validate:
   - Success message appears: "Registration Successful!"
   - Form fields reset
7. Capture Screenshot: `success-state.png`

### Flow C: Form Logic Validation
**Objective:** Test dynamic form behavior and validations

**Steps:**
1. **Country → States Dropdown:**
   - Change Country → Verify States dropdown updates
   - Verify States dropdown is enabled

2. **State → Cities Dropdown:**
   - Change State → Verify Cities dropdown updates
   - Verify Cities dropdown is enabled

3. **Password Strength:**
   - Enter weak password → Verify "Weak" indicator
   - Enter medium password → Verify "Medium" indicator
   - Enter strong password → Verify "Strong" indicator

4. **Password Mismatch:**
   - Enter different passwords → Verify error message appears
   - Verify field highlighted in red
   - Fix passwords → Verify error clears

5. **Submit Button State:**
   - Fill all fields → Verify button enabled
   - Remove required field → Verify button disabled
   - Fix field → Verify button re-enabled

6. **Additional Validations:**
   - Test disposable email domain rejection
   - Test phone number country code validation

## 📸 Screenshots

After running the tests, you'll find:
- `error-state.png` - Screenshot of form with validation errors
- `success-state.png` - Screenshot of successful registration

## 🎥 Video Recording

Playwright automatically records videos of test failures. To record videos for all tests:

1. Update `playwright.config.js`:
   ```javascript
   use: {
     video: 'on', // Change from 'retain-on-failure' to 'on'
   }
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Videos will be saved in `test-results/` directory

## 🔧 Configuration

### Playwright Configuration
The `playwright.config.js` file includes:
- Base URL: `http://localhost:8000`
- Automatic web server startup (Python HTTP server)
- Screenshot on failure
- Video recording on failure
- Cross-browser testing (Chrome, Firefox, Safari)

### Customization
You can modify:
- **Countries/States/Cities**: Edit `LOCATION_DATA` in `script.js`
- **Disposable Email Domains**: Edit `DISPOSABLE_EMAIL_DOMAINS` in `script.js`
- **Country Codes**: Edit `COUNTRY_CODES` in `script.js`
- **Validation Rules**: Modify validation functions in `script.js`

## 🎨 UI Enhancements

The form includes:
- Modern gradient background
- Smooth animations and transitions
- Responsive design (mobile-friendly)
- Color-coded validation states (red for errors, green for valid)
- Password strength visual indicator
- Professional alert messages
- Disabled submit button styling

## 📝 Step-by-Step Automation Explanation

### How the Automation Script Works

1. **Setup Phase:**
   - Playwright launches a browser (Chrome/Firefox/Safari)
   - Starts a local web server (Python HTTP server on port 8000)
   - Navigates to the registration page

2. **Test Execution:**
   - Each test fills form fields using Playwright's `fill()` method
   - Waits for dynamic content (dropdowns) using `waitForTimeout()`
   - Validates UI state using `expect()` assertions
   - Captures screenshots at key moments

3. **Validation:**
   - Checks error messages using `toContainText()`
   - Verifies field classes (invalid/valid) using `toHaveClass()`
   - Confirms button states (enabled/disabled) using `toBeEnabled()` / `toBeDisabled()`

4. **Cleanup:**
   - Screenshots saved automatically
   - Videos recorded (on failure or when configured)
   - Browser closed after tests complete

## 🐛 Troubleshooting

### Issue: Tests fail with "Connection refused"
**Solution:** Make sure port 8000 is available. Try:
```bash
# Kill process on port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use a different port in playwright.config.js
```

### Issue: Dropdowns not updating
**Solution:** Increase `waitForTimeout` values in test file if needed

### Issue: Screenshots not captured
**Solution:** Check that the test completes. Screenshots are taken at specific points in the test flow.

## 📚 Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Testing:** Playwright
- **Package Manager:** npm
- **Web Server:** Python HTTP Server (or any static file server)

## 📄 License

MIT License - Feel free to use this project for learning and development purposes.

## 👨‍💻 Author

Developed as part of the Intelligent Registration System project.

---

**Happy Testing! 🚀**
