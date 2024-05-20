import { useContext, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { Context } from '../../ui/Context/Context';
import Image from 'next/image';
import logo from '../../../../public/img/logo.png'
import Link from 'next/link';

const Header = () => {
    const { close, setClose } = useContext(Context);
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleF1 = () => {
        console.log('Нақд');
    };

    const handleF2 = () => {
        console.log('Карта');
    };

    const handleF3 = () => {
        console.log('Насия');
    };

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'F1':
                event.preventDefault();
                handleF1();
                break;
            case 'F2':
                event.preventDefault();
                handleF2();
                break;
            case 'F3':
                event.preventDefault();
                handleF3();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div>
            <header className={styles.header}>
                <Image
                    src={logo}
                    alt='logo'
                    priority
                />
                <div className={styles.header__items}>
                    <div className={styles.header__items__time}>
                        <p>{formatDate(dateTime)}</p>
                        <p>{formatTime(dateTime)}</p>
                    </div>
                    <div className={styles.header__items__star}>
                        <i className="fa-regular fa-star"></i>
                        <p>213.560</p>
                    </div>
                </div>
            </header>
            {/* sidebar start */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebar__top}>
                    <button onClick={handleF1}>
                        <i className="fa-solid fa-money-bill"></i>
                        Нақд F1
                    </button>
                    <button onClick={handleF2}>
                        <i className="fa-regular fa-credit-card"></i>
                        Карта F2
                    </button>
                    <button onClick={handleF3}>
                        <i className="fa-solid fa-hand-holding-heart"></i>
                        Насия F3
                    </button>
                </div>
                <div className={styles.sidebar__bottom}>
                    <Link href={'/profil'}>
                        <i className="fa-regular fa-user"></i>
                        Профил
                    </Link>
                    <div className={styles.sidebar__bottom__items}>
                        <button>
                            <i className="fa-solid fa-rotate-left"></i>
                            Возврат
                        </button>
                        <button>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            Чиқиш
                        </button>
                    </div>
                </div>
            </aside>
            {/* sidebar end */}
        </div>
    );
};

export default Header;