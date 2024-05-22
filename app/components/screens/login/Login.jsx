import { useContext, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './Login.module.scss'
import { Context } from '@/app/components/ui/Context/Context';


const LoginIntro = () => {
    const { lan } = useContext(Context);
    const [activeUser, setActiveUser] = useState(0);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleUser = (index) => {
        setActiveUser(index);
    };

    const handleLoginChange = (e) => setLogin(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            userType: activeUser === 0 ? 'Сотувчи' : 'Админ',
            login,
            password
        });
    };

    const user = [
        { icon: "fa-solid fa-user-clock", text: "Сотувчи" },
        { icon: "fa-regular fa-user", text: "Админ" },
    ];


    return (
        <div className={styles.login}>
            <div className={styles.login__body}>
                <div className={styles.login__body__top}>
                    <ul className={styles.login__body__top__list}>
                        {user.map((item, index) => (
                            <li
                                key={index}
                                className={`${styles.login__body__top__list__item} ${activeUser === index ? styles.active : ''}`}
                                onClick={() => handleUser(index)}
                            >
                                <i className={item.icon}></i>
                                <p>{item.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.login__body__center}>
                    <div className={styles.login__body__center__top}>
                        <p>USG Darmon - Mezana Pharm</p>
                        {
                            activeUser === 0 ? (
                                <p>Сотувчи профилига кириш</p>
                            ) : (
                                <p>Админ профилига кириш</p>
                            )
                        }
                    </div>
                    <p className={styles.text}>Хатолик юз берди. Логин ёки парол нотўғри киритилган, илтимос текшириб қайтадан киритинг!</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="login">
                                <p>Логин</p>
                                <input
                                    id="login"
                                    placeholder='Логин'
                                    type="text"
                                    value={login}
                                    onChange={handleLoginChange}
                                />
                            </label>
                            <label htmlFor="password">
                                <p>Парол</p>
                                <input
                                    id="password"
                                    placeholder='Парол'
                                    type="text"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </label>
                        </div>
                        <button type="submit">Кириш</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginIntro;