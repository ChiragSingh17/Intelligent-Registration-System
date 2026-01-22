const DISPOSABLE_EMAIL_DOMAINS = [
    'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
    'throwaway.email', 'temp-mail.org', 'getnada.com', 'mohmal.com',
    'fakeinbox.com', 'yopmail.com', 'sharklasers.com', 'trashmail.com'
];

const COUNTRY_CODES = {
    'usa': '+1',
    'uk': '+44',
    'canada': '+1',
    'india': '+91',
    'australia': '+61',
    'germany': '+49',
    'france': '+33'
};

const LOCATION_DATA = {
    'usa': {
        states: {
            'california': ['Los Angeles', 'San Francisco', 'San Diego'],
            'newyork': ['New York City', 'Buffalo', 'Rochester'],
            'texas': ['Houston', 'Dallas', 'Austin']
        }
    },
    'uk': {
        states: {
            'england': ['London', 'Manchester', 'Birmingham'],
            'scotland': ['Edinburgh', 'Glasgow', 'Aberdeen'],
            'wales': ['Cardiff', 'Swansea', 'Newport']
        }
    },
    'canada': {
        states: {
            'ontario': ['Toronto', 'Ottawa', 'Hamilton'],
            'quebec': ['Montreal', 'Quebec City', 'Laval'],
            'britishcolumbia': ['Vancouver', 'Victoria', 'Surrey']
        }
    },
    'india': {
        states: {
            'maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
            'karnataka': ['Bangalore', 'Mysore', 'Hubli'],
            'delhi': ['New Delhi', 'Delhi', 'Noida']
        }
    },
    'australia': {
        states: {
            'newsouthwales': ['Sydney', 'Newcastle', 'Wollongong'],
            'victoria': ['Melbourne', 'Geelong', 'Ballarat'],
            'queensland': ['Brisbane', 'Gold Coast', 'Cairns']
        }
    },
    'germany': {
        states: {
            'bavaria': ['Munich', 'Nuremberg', 'Augsburg'],
            'berlin': ['Berlin'],
            'northrhine': ['Cologne', 'Düsseldorf', 'Dortmund']
        }
    },
    'france': {
        states: {
            'iledefrance': ['Paris', 'Versailles', 'Boulogne-Billancourt'],
            'provence': ['Marseille', 'Nice', 'Toulon'],
            'rhone': ['Lyon', 'Grenoble', 'Saint-Étienne']
        }
    }
};

const form = document.getElementById('registration-form');
const submitBtn = document.getElementById('submit-btn');
const errorAlert = document.getElementById('error-alert');
const successAlert = document.getElementById('success-alert');
const errorMessage = document.getElementById('error-message');

const fields = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    age: document.getElementById('age'),
    gender: document.querySelectorAll('input[name="gender"]'),
    address: document.getElementById('address'),
    country: document.getElementById('country'),
    state: document.getElementById('state'),
    city: document.getElementById('city'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    terms: document.getElementById('terms')
};

const errorElements = {
    firstName: document.getElementById('firstName-error'),
    lastName: document.getElementById('lastName-error'),
    email: document.getElementById('email-error'),
    phone: document.getElementById('phone-error'),
    age: document.getElementById('age-error'),
    gender: document.getElementById('gender-error'),
    address: document.getElementById('address-error'),
    country: document.getElementById('country-error'),
    state: document.getElementById('state-error'),
    city: document.getElementById('city-error'),
    password: document.getElementById('password-error'),
    confirmPassword: document.getElementById('confirmPassword-error'),
    terms: document.getElementById('terms-error')
};

function validateFirstName() {
    const value = fields.firstName.value.trim();
    if (!value) {
        showFieldError('firstName', 'First Name is required');
        return false;
    }
    if (value.length < 2) {
        showFieldError('firstName', 'First Name must be at least 2 characters');
        return false;
    }
    clearFieldError('firstName');
    return true;
}

function validateLastName() {
    const value = fields.lastName.value.trim();
    if (!value) {
        showFieldError('lastName', 'Last Name is required');
        return false;
    }
    if (value.length < 2) {
        showFieldError('lastName', 'Last Name must be at least 2 characters');
        return false;
    }
    clearFieldError('lastName');
    return true;
}

function validateEmail() {
    const value = fields.email.value.trim();
    if (!value) {
        showFieldError('email', 'Email is required');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        showFieldError('email', 'Please enter a valid email address');
        return false;
    }
    
    const domain = value.split('@')[1]?.toLowerCase();
    if (DISPOSABLE_EMAIL_DOMAINS.some(d => domain.includes(d))) {
        showFieldError('email', 'Disposable email domains are not allowed');
        return false;
    }
    
    clearFieldError('email');
    return true;
}

function validatePhone() {
    const value = fields.phone.value.trim();
    if (!value) {
        showFieldError('phone', 'Phone Number is required');
        return false;
    }
    
    const country = fields.country.value;
    if (country && COUNTRY_CODES[country]) {
        const countryCode = COUNTRY_CODES[country];
        if (!value.startsWith(countryCode)) {
            showFieldError('phone', `Phone number must start with ${countryCode}`);
            return false;
        }
        const phoneNumber = value.replace(countryCode, '').replace(/\s/g, '');
        if (!/^\d{7,12}$/.test(phoneNumber)) {
            showFieldError('phone', 'Please enter a valid phone number');
            return false;
        }
    } else {
        if (!/^\+?\d{7,15}$/.test(value.replace(/\s/g, ''))) {
            showFieldError('phone', 'Please enter a valid phone number');
            return false;
        }
    }
    
    clearFieldError('phone');
    return true;
}

function validateAge() {
    const value = fields.age.value;
    if (value) {
        const age = parseInt(value);
        if (isNaN(age) || age < 1 || age > 120) {
            showFieldError('age', 'Age must be between 1 and 120');
            return false;
        }
    }
    clearFieldError('age');
    return true;
}

function validateGender() {
    const checked = Array.from(fields.gender).some(radio => radio.checked);
    if (!checked) {
        showFieldError('gender', 'Please select a gender');
        return false;
    }
    clearFieldError('gender');
    return true;
}

function validateCountry() {
    const value = fields.country.value;
    if (!value) {
        showFieldError('country', 'Country is required');
        return false;
    }
    clearFieldError('country');
    return true;
}

function validateState() {
    const value = fields.state.value;
    if (!value) {
        showFieldError('state', 'State is required');
        return false;
    }
    clearFieldError('state');
    return true;
}

function validateCity() {
    const value = fields.city.value;
    if (!value) {
        showFieldError('city', 'City is required');
        return false;
    }
    clearFieldError('city');
    return true;
}

function validatePassword() {
    const value = fields.password.value;
    if (!value) {
        showFieldError('password', 'Password is required');
        return false;
    }
    
    if (value.length < 8) {
        showFieldError('password', 'Password must be at least 8 characters');
        return false;
    }
    
    clearFieldError('password');
    updatePasswordStrength(value);
    return true;
}

function validateConfirmPassword() {
    const value = fields.confirmPassword.value;
    const password = fields.password.value;
    
    if (!value) {
        showFieldError('confirmPassword', 'Please confirm your password');
        return false;
    }
    
    if (value !== password) {
        showFieldError('confirmPassword', 'Passwords do not match');
        return false;
    }
    
    clearFieldError('confirmPassword');
    return true;
}

function validateTerms() {
    if (!fields.terms.checked) {
        showFieldError('terms', 'You must agree to the Terms & Conditions');
        return false;
    }
    clearFieldError('terms');
    return true;
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
}

function updatePasswordStrength(password) {
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    
    if (!password) {
        strengthFill.className = 'strength-fill';
        strengthFill.style.width = '0%';
        strengthText.textContent = 'Password Strength';
        strengthText.className = 'strength-text';
        return;
    }
    
    const strength = calculatePasswordStrength(password);
    strengthFill.className = `strength-fill ${strength}`;
    strengthText.className = `strength-text ${strength}`;
    strengthText.textContent = `Password Strength: ${strength.charAt(0).toUpperCase() + strength.slice(1)}`;
}

function showFieldError(fieldName, message) {
    const field = fields[fieldName];
    const errorElement = errorElements[fieldName];
    
    if (field) {
        field.classList.add('invalid');
        field.classList.remove('valid');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldError(fieldName) {
    const field = fields[fieldName];
    const errorElement = errorElements[fieldName];
    
    if (field) {
        field.classList.remove('invalid');
        field.classList.add('valid');
    }
    
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function hideAlerts() {
    errorAlert.style.display = 'none';
    successAlert.style.display = 'none';
}

function showErrorAlert(message) {
    errorMessage.textContent = message;
    errorAlert.style.display = 'flex';
    successAlert.style.display = 'none';
}

function showSuccessAlert() {
    errorAlert.style.display = 'none';
    successAlert.style.display = 'flex';
    console.log('Success alert shown');
    successAlert.style.visibility = 'visible';
    successAlert.style.opacity = '1';
}

function validateAllFields() {
    const validations = [
        validateFirstName(),
        validateLastName(),
        validateEmail(),
        validatePhone(),
        validateAge(),
        validateGender(),
        validateCountry(),
        validateState(),
        validateCity(),
        validatePassword(),
        validateConfirmPassword(),
        validateTerms()
    ];
    
    return validations.every(v => v === true);
}

function updateSubmitButton() {
    const isValid = validateAllFields();
    submitBtn.disabled = !isValid;
}

function updateStates() {
    const country = fields.country.value;
    const stateSelect = fields.state;
    const citySelect = fields.city;
    
    stateSelect.innerHTML = '<option value="">Select State</option>';
    citySelect.innerHTML = '<option value="">Select City</option>';
    
    if (country && LOCATION_DATA[country]) {
        stateSelect.disabled = false;
        const states = LOCATION_DATA[country].states;
        
        for (const [stateKey, stateName] of Object.entries(states)) {
            const option = document.createElement('option');
            option.value = stateKey;
            option.textContent = stateName[0].split(' ').map(w => 
                w.charAt(0).toUpperCase() + w.slice(1)
            ).join(' ');
            stateSelect.appendChild(option);
        }
    } else {
        stateSelect.disabled = true;
        citySelect.disabled = true;
    }
    
    citySelect.disabled = true;
    updateSubmitButton();
}

function updateCities() {
    const country = fields.country.value;
    const state = fields.state.value;
    const citySelect = fields.city;
    
    citySelect.innerHTML = '<option value="">Select City</option>';
    
    if (country && state && LOCATION_DATA[country]?.states[state]) {
        citySelect.disabled = false;
        const cities = LOCATION_DATA[country].states[state];
        
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.toLowerCase().replace(/\s/g, '');
            option.textContent = city;
            citySelect.appendChild(option);
        });
    } else {
        citySelect.disabled = true;
    }
    
    updateSubmitButton();
}

fields.firstName.addEventListener('blur', validateFirstName);
fields.firstName.addEventListener('input', () => {
    validateFirstName();
    updateSubmitButton();
});

fields.lastName.addEventListener('blur', validateLastName);
fields.lastName.addEventListener('input', () => {
    validateLastName();
    updateSubmitButton();
});

fields.email.addEventListener('blur', validateEmail);
fields.email.addEventListener('input', () => {
    validateEmail();
    updateSubmitButton();
});

fields.phone.addEventListener('blur', validatePhone);
fields.phone.addEventListener('input', () => {
    validatePhone();
    updateSubmitButton();
});

fields.age.addEventListener('blur', validateAge);
fields.age.addEventListener('input', () => {
    if (fields.age.classList.contains('invalid')) {
        validateAge();
    }
    updateSubmitButton();
});

fields.gender.forEach(radio => {
    radio.addEventListener('change', () => {
        validateGender();
        updateSubmitButton();
    });
});

fields.country.addEventListener('change', () => {
    validateCountry();
    updateStates();
    if (fields.country.value && COUNTRY_CODES[fields.country.value]) {
        fields.phone.placeholder = `e.g., ${COUNTRY_CODES[fields.country.value]}1234567890`;
    }
});

fields.state.addEventListener('change', () => {
    validateState();
    updateCities();
});

fields.city.addEventListener('change', () => {
    validateCity();
    updateSubmitButton();
});

fields.password.addEventListener('input', () => {
    validatePassword();
    if (fields.confirmPassword.value) {
        validateConfirmPassword();
    }
    updateSubmitButton();
});

fields.confirmPassword.addEventListener('blur', validateConfirmPassword);
fields.confirmPassword.addEventListener('input', () => {
    validateConfirmPassword();
    updateSubmitButton();
});

fields.terms.addEventListener('change', () => {
    validateTerms();
    updateSubmitButton();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlerts();
    
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePhone();
    validateAge();
    validateGender();
    validateCountry();
    validateState();
    validateCity();
    validatePassword();
    validateConfirmPassword();
    validateTerms();
    
    updateSubmitButton();
    
    const allValid = validateAllFields();
    console.log('All fields valid:', allValid);
    
    if (allValid) {
        console.log('Form is valid, submitting...');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span>Submitting...';
        
        setTimeout(() => {
            console.log('Showing success alert');
            showSuccessAlert();
            form.reset();
            
            Object.keys(fields).forEach(key => {
                if (fields[key]) {
                    if (fields[key].nodeName === 'INPUT') {
                        if (fields[key].type !== 'radio' && fields[key].type !== 'checkbox') {
                            if (fields[key].classList) {
                                fields[key].classList.remove('valid', 'invalid');
                            }
                        }
                    } else if (fields[key].classList) {
                        fields[key].classList.remove('valid', 'invalid');
                    }
                }
            });
            
            Object.values(errorElements).forEach(el => {
                if (el) el.textContent = '';
            });
            
            fields.gender.forEach(radio => radio.checked = false);
            
            fields.state.innerHTML = '<option value="">Select State</option>';
            fields.state.disabled = true;
            fields.city.innerHTML = '<option value="">Select City</option>';
            fields.city.disabled = true;
            
            updatePasswordStrength('');
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Register';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    } else {
        const errors = [];
        if (!validateFirstName()) errors.push('First Name');
        if (!validateLastName()) errors.push('Last Name');
        if (!validateEmail()) errors.push('Email');
        if (!validatePhone()) errors.push('Phone Number');
        if (!validateGender()) errors.push('Gender');
        if (!validateCountry()) errors.push('Country');
        if (!validateState()) errors.push('State');
        if (!validateCity()) errors.push('City');
        if (!validatePassword()) errors.push('Password');
        if (!validateConfirmPassword()) errors.push('Confirm Password');
        if (!validateTerms()) errors.push('Terms & Conditions');
        
        showErrorAlert(`Please fix the following fields: ${errors.join(', ')}`);
        
        const firstError = Object.values(errorElements).find(el => el && el.textContent);
        if (firstError && firstError.parentElement) {
            firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

updateSubmitButton();
