import useAlert from "../utils/useAlert";

import { useState } from "react";
import PropTypes from "prop-types";

function CustomAlert({ message }) {
    useAlert(message);
    const [visible, setVisible] = useState(true);

    const onClose = () => {
        // Logic to close the alert
        setVisible(false); // Hide the alert
    };

    return (message && visible ?
        (<div className="custom-alert fixed top-30 left-6/12 -translate-6/12 m-2 p-5 px-7 bg-amber-50 text-gray-800 rounded shadow-lg transition-transform">
            <div className="alert-content">
                <span>{message}</span>
                <button onClick={onClose} className="close-button border-1 rounded-md px-2 py-1 ml-5 border-gray-500 cursor-pointer">Close</button>
            </div>
        </div>) : <div className="hidden"></div>
    );
}   
CustomAlert.propTypes = {
    message: PropTypes.string.isRequired,
};

export default CustomAlert;