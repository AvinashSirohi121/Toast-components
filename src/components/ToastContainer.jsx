import { useRef, useState, useEffect } from "react"
import "./toastContainer.css"

const ToastContainer = () => {

    const [toasts, setToasts] = useState([]);
    const timeRef = useRef({});

    useEffect(() => {
    return () => {
        Object.values(timeRef.current).forEach(clearTimeout);
    };
    }, []);

    const addNewToast = (message, type) => {
        let id = crypto.randomUUID();
        setToasts((prevToast)=>[
            ...prevToast,
            {id,message,type}
        ]);
        timeRef.current[id] = setTimeout(() => closeToast(id), 5000)
    }
    const closeToast = (id) => {
        if(timeRef.current[id]){
            clearTimeout(timeRef.current[id]);
            delete timeRef.current[id];
        }
        
        setToasts((prevToast) => {
            let filteredToast = prevToast.filter((toast) => {
                return toast.id !== id
            })
            return filteredToast;
        });
    }

    return (
        <div className="container">

            <div className="toast-btns">
                <button onClick={() => addNewToast("Success Toast", "success")}
                    className="toast-btn">Success</button>
                <button onClick={() => addNewToast("Info Toast", "info")}
                    className="toast-btn">Info</button>
                <button onClick={() => addNewToast("Alert Toast", "alert")}
                    className="toast-btn">Alert</button>
                <button onClick={() => addNewToast("Failure Toast", "failure")}
                    className="toast-btn">Failure</button>
            </div>

            <div className="toast-container">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`toast ${toast.type}`}>
                        <span>{toast.message}</span>
                        <span onClick={() => closeToast(toast.id)} className="close-toast">X</span>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ToastContainer