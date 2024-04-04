const isValidEmail = (email) => {
    //Add email validation code here
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const specialCharValid = /[!@#$%^&*]/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const digitValid = /\d/.test(password);

    return {
        length: lengthValid,
        specialChar: specialCharValid,
        uppercase: uppercaseValid,
        lowercase: lowercaseValid,
        digit: digitValid,
    };
};

export { isValidEmail, validatePassword };