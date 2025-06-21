import { toast } from "react-toastify";

/**
 * @description Displays error messages as toast notifications.
 * @param message - A comma-separated string of error messages.
 */
const errorMessage = (message: string): void => {
    const errorMessages = message.split(",");
    
    errorMessages.forEach((msg, index) => {
        const formattedMsg = msg.trim();
        setTimeout(() => {
            toast.error(
                formattedMsg.charAt(0).toUpperCase() + formattedMsg.slice(1)
            );
        }, 300 * index);
    });
};

export default errorMessage;
