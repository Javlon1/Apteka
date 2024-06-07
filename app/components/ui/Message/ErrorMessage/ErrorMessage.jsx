import * as React from 'react';
import styles from './ErrorMessage.module.scss'
import { Context } from '@/app/components/ui/Context/Context';


const ErrorMessage = ({ errorText }) => {
    const { error, setError } = React.useContext(Context);

    // Error Start
    React.useEffect(() => {
        function changeErrorValue() {
            setError(false)
        }
        setTimeout(changeErrorValue, 3000);
    }, [error])
    // Error End

    return (
        <p className={`${styles.errorMessage} ${error ? styles.errorAct : ""}`}>
            <i className="fa-solid fa-triangle-exclamation"></i>
            Xato - {errorText}
        </p>
    )
}

export default ErrorMessage;