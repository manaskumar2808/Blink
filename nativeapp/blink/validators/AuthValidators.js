export const userNameValidator = (value) => {
    if(value.trim().length < 3) {
        return "Username must have atleast 3 characters.";
    }
    return null;
}

export const emailValidator = (value) => {
    if(value.indexOf('@') === -1) {
        return "Please enter a valid email address.";
    }
    return null;
}

export const passwordValidator = (value) => {
    if(value.trim().length < 8) {
        return "Password must be atleast 8 characters long.";
    }
    return null;
}

export const passwordConfirmValidator = (value, passwordValue) => {
    if(value !== passwordValue) {
        return "Please confirm your password.";
    }
    return null;
}