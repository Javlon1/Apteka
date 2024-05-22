import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './Login.module.scss'
import { Context } from '@/app/components/ui/Context/Context';


const LoginIntro = () => {
    const { lan } = React.useContext(Context);
    const [activeUser, setActiveUser] = React.useState(0);

    const handleUser = (index) => {
        setActiveUser(index);
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
                            activeUser == 0 ? (
                                <p>Сотувчи профилига кириш</p>
                            ) : (
                                <p>Админ  профилига кириш</p>
                            )
                        }
                    </div>
                    <p className={styles.text}>Хатолик юз берди. Логин ёки парол нотўғри киритилган, илтимос текшириб қайтадан киритинг !</p>
                    <form >
                        <div>
                            <label htmlFor="">
                                <p>Логин</p>
                                <input
                                    placeholder='Логин'
                                    type="text"
                                />
                            </label>
                            <label htmlFor="">
                                <p>Парол</p>
                                <input
                                    placeholder='Парол'
                                    type="text"
                                />
                            </label>
                        </div>
                        <button>Кириш</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginIntro;