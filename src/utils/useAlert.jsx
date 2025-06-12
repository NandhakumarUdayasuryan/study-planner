import {useState, useEffect} from 'react';
const useAlert = (message) => {
    // Custom hook to manage alert messages
    // message: The message to display in the alert
    // Returns an object with type and message properties
    // The alert will automatically clear after 3 seconds
    // Usage: const alert = useAlert('success', 'Task added successfully!');
        const [alert, setAlert] = useState('');
    
        useEffect(() => {
            if (message) {
                setAlert(message);
                const timer = setTimeout(() => {
                    setAlert("");
                }, 3000);
                return () => clearTimeout(timer);
            } else {
                setAlert('');
            }
        }, [message]);
    
        return alert;
    }   

export default useAlert;
