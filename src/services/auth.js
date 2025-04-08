



import auth from '@react-native-firebase/auth';

export const registerUser = async (email, password) => {
    try {
        console.log("Attempting to register user...");

        if (!email || !password) {
            throw new Error("Email and password are required.");
        }

        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        console.log("User registered successfully:", userCredential.user);

        await userCredential.user.sendEmailVerification();
        console.log("Verification email sent");

        return userCredential.user;
    } catch (error) {
        console.error("Firebase Auth Error:", error.code, error.message);

        let errorMessage;
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already registered. Please use another email or login.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'The email address is invalid. Please enter a valid email.';
                break;
            case 'auth/weak-password':
                errorMessage = 'The password is too weak. It should be at least 6 characters.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email/password accounts are not enabled. Contact support.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your internet connection.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many attempts. Please try again later.';
                break;
            default:
                errorMessage = 'Registration failed. Please try again.';
                break;
        }

        throw new Error(errorMessage);
    }
};

export const loginUser  = async (email, password) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user=userCredential.user;
        return {user,emailVerified:user.emailVerified};
    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/wrong-password':
                errorMessage = 'Incorrect Password.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No user found!.';
                break;
            default:
                errorMessage = 'An unknown error occurred: ' + error.message;
                break;
        }
        throw new Error(errorMessage);
        
    }
}

export const sendPasswordResetEmail=async (email)=>{
    try {
        await auth().sendPasswordResetEmail(email);
    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No user found!.';
                break;
            case 'auth/invalid-email':
                errorMessage='Invalid Email.';
                break;
            default:
                errorMessage = 'An unknown error occurred: ' + error.message;
                break;
    }
    throw new Error(errorMessage);
}
}
