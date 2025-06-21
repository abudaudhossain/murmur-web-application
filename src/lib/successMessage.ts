import { toast } from "react-toastify";

/**
 * @description Displays success messages as toast notifications.
 * @param message - A comma-separated string of success messages.
 */
const successMessage = (message: string): void => {
    //console.log("message"); // You might want to log the actual message instead
    const successMessages = message.split(",");

    successMessages.forEach((msg, index) => {
        const formattedMsg = msg.trim();
        setTimeout(() => {
            toast.success(
                formattedMsg.charAt(0).toUpperCase() + formattedMsg.slice(1)
            );
        }, 300 * index);
    });
};

export default successMessage;
