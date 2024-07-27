import { useContext, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './Login.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import { useRouter } from 'next/router';

const LoginIntro = () => {
    const { url, setAuth_token } = useContext(Context);
    const [activeUser, setActiveUser] = useState(0);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [loader, setLoader] = useState(false);

    const handleUser = (index) => {
        setActiveUser(index);
    };

    const handleLoginChange = (e) => setLogin(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true); 

        const fullUrl = `${url}/token/`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: login,
                    password
                }),
            });

            const data = await response.json();

            if (data) {
                setAuth_token(data.access_token)

                if (data.is_admin && activeUser == 1) {
                    router.push('/statistic');
                } else if (!data.is_admin && activeUser == 0) {
                    router.push('/login')
                }
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        } finally {
            setLoader(false); 
        }
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
                        <p>Darmon - Mezana Pharm</p>
                        {
                            activeUser === 0 ? (
                                <p>Сотувчи профилига кириш</p>
                            ) : (
                                <p>Админ профилига кириш</p>
                            )
                        }
                    </div>
                    {/* <p className={styles.text}>Хатолик юз берди. Логин ёки парол нотўғри киритилган, илтимос текшириб қайтадан киритинг!</p> */}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="login">
                                <p>Логин</p>
                                <input
                                    id="login"
                                    type="text"
                                    value={login}
                                    required
                                    onChange={handleLoginChange}
                                />
                            </label>
                            <label htmlFor="password">
                                <p>Парол</p>
                                <input
                                    id="password"
                                    type="text"
                                    value={password}
                                    required
                                    onChange={handlePasswordChange}
                                />
                            </label>
                        </div>
                        {
                            loader ? (
                                <b className={styles.btn}>
                                    <div className={styles.loader}></div>
                                </b>
                            ) : (
                                <button type="submit">Кириш</button>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginIntro;
