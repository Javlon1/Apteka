import { useContext, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { Context } from '../../ui/Context/Context';
import Image from 'next/image';
import logo from '../../../../public/img/logo.png'
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
    const { url, setAuth_token, auth_token, sale, setSale, setType } = useContext(Context);
    const [dateTime, setDateTime] = useState(new Date());
    const { pathname } = useRouter();
    const router = useRouter();
    const [modal, setModal] = useState(false)
    const [userData, setUserData] = useState([])

    const [formData, setFormData] = useState({
        expenseType: '',
        expenseAmount: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const logOut = () => {

        window.localStorage.removeItem('auth_token');

        setAuth_token("")

        router.push('/');
    }

    const [headerData] = useState([
        {
            id: 1,
            link: '/login',
            nav: 'Асосий',
            icon: "fa-solid fa-house"
        },
        {
            id: 3,
            link: '/profil',
            nav: 'Профил',
            icon: "fa-regular fa-user"
        },
    ]);

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
        setType("Нақд")
        setSale(true)
    };

    const handleF2 = () => {
        console.log('Карта');
        setType("Карта")
        setSale(true)
    };

    const handleF3 = () => {
        console.log('Насия');
        setType("Насия")
        setSale(true)
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

    const handleSubmit = async (event) => {
        event.preventDefault();


        const fullUrl = `${url}/expance/add`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
                body: JSON.stringify({
                    name: formData.expenseType,
                    amount: formData.expenseAmount,
                }),
            });

            const data = await response.json();

            if (data.message) {
                // setDe(!de)
                setModal(false);
                setFormData({
                    expenseType: '',
                    expenseAmount: ''
                })
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };

    useEffect(() => {
        const fullUrl = `${url}/profile`;
        const fetchData = async () => {
            try {
                const response = await fetch(fullUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth_token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }

                const data = await response.json();

                if (data) {
                    setUserData(data)
                } else {
                    console.error('Ошибка: Некорректные данные получены от сервера.');
                }

            } catch (error) {
                console.error('Ошибка при запросе данных:', error.message);
            }
        };

        fetchData();
    }, [sale])

    return (
        <div>
            <header className={styles.header}>

                <div
                    className={`${styles.modalOpacity} ${modal ? styles.actModal : ""}`}
                    onClick={() => {
                        setModal(false)
                    }}
                ></div>

                <div className={`${styles.modal} ${modal ? styles.actModal : ""}`}>
                    <div className={styles.modal__body}>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <p onClick={() => setModal(false)}>
                                    <i className="fa-solid fa-x"></i>
                                </p>
                            </div>
                            <label>
                                <p>Чиқим тури:</p>
                                <input
                                    type="text"
                                    name="expenseType"
                                    value={formData.expenseType}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                <p>Чиқим суммаси:</p>
                                <input
                                    type="text"
                                    name="expenseAmount"
                                    value={formData.expenseAmount}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <button type="submit">
                                <i className="fa-solid fa-file-invoice"></i>
                                Сақлаш
                            </button>
                        </form>
                    </div>
                </div>
                <h1 style={{ color: 'white' }}>Darmon</h1>
                <div className={styles.header__items}>
                    <div className={styles.header__items__time}>
                        <p>{formatDate(dateTime)}</p>
                        <p>{formatTime(dateTime)}</p>
                    </div>
                    {
                        (pathname === '/login' || pathname === '/profil') && (
                            <div className={styles.header__items__star}>
                                <i className="fa-regular fa-star"></i>
                                <p>{userData.overall_user_score}</p>
                            </div>
                        )
                    }
                </div>
            </header>
            {/* sidebar start */}
            <aside className={styles.sidebar}>
                {
                    (pathname === '/login') && (
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
                    )
                }
                <div className={styles.sidebar__bottom}>
                    <div className={styles.sidebar__bottom__items}>
                        {

                            (pathname === '/login' || pathname === '/profil' || pathname === "/return") && (headerData?.map((item) => (
                                <Link
                                    key={item.id}
                                    className={`${pathname === item.link ? styles.active : ""}`}
                                    href={item.link}
                                >
                                    <i className={item.icon}></i>
                                    <p>
                                        {item.nav}
                                    </p>
                                </Link>
                            )))
                        }
                        {
                            (pathname === '/profil' || pathname === "/settings" || pathname === "/workers" || pathname === "/chakana-savdo" || pathname === "/product" || pathname === "/report" || pathname === "/statistic") && (
                                <button onClick={() => setModal(true)} className={styles.qwe}>
                                    <i className="fa-solid fa-plus"></i>
                                    <p>
                                        Чиқим
                                    </p>
                                </button>
                            )
                        }
                    </div>
                    <div className={styles.sidebar__bottom__items}>
                        {
                            (pathname === '/login' || pathname === "/return") && (

                                <button onClick={() => {
                                    router.push('/return');
                                }}>
                                    <i className="fa-solid fa-rotate-left"></i>
                                    Возврат
                                </button>
                            )
                        }
                        <button
                            onClick={() => {
                                logOut()
                            }}
                        >
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