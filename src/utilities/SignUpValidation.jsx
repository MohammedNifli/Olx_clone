export const signUpValidate = (name, phoneNumber, email, password) => {
    // Regular expressions to validate email, name, password, and mobile number
    const validEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
    const validName = /^[a-zA-Z ]{2,30}$/.test(name);
    const validPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
    const validMobile = /^[0]?[789]\d{9}$/.test(phoneNumber);
  
    // Validate the name
    if (!name.trim() || !validName) return "Please enter a valid name.";
  
    // Validate the mobile number
    if (!phoneNumber.trim() || !validMobile) return "Please enter a valid mobile number.";
  
    // Validate the email
    if (!email.trim() || !validEmail) return "Please enter a valid email address.";
  
    // Validate the password
    if (!password.trim() || !validPassword) return "Password must be at least 6 characters long and contain at least one numeric digit and one special character.";
  
    // If all validations pass
    return null;
  };
  