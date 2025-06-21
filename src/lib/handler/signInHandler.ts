/**
 * @description Handles the form submit for sign-in.
 * @param e - The form submit event.
 * @param formData - The current form data.
 */

interface SignInFormData {
    email: string;
    password: string;
    // Add other fields if needed
}

import { FormEvent } from "react";

const signInHandler = (
    e: FormEvent<HTMLFormElement>,
    formData: SignInFormData
): { isLoading: boolean } => {
    e.preventDefault();
    //console.log("Form data:", formData);

    return {
        isLoading: true,
    };
};

export default signInHandler;
