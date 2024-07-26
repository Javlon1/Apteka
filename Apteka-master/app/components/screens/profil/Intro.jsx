import { useContext, useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './Intro.module.scss'
import { Context } from '@/app/components/ui/Context/Context';

const Intro = () => {
    const { auth_token, url } = useContext(Context);
    const [activeDateFilter, setActiveDateFilter] = useState(0);
    const [activeDateBall, setActiveDateBall] = useState(0);
    const [modal, setModal] = useState(false)
    const [modalDate, setModalDate] = useState(false)
    const [de, setDe] = useState(false)
    const [userData, setUserData] = useState([])
    const [dateTime] = useState(new Date());
    const [danDate, setDanDate] = useState('');
    const [gachaDate, setGachaDate] = useState('');

    const handleDanDateChange = (e) => {
        setDanDate(e.target.value);
    };

    const handleGachaDateChange = (e) => {
        setGachaDate(e.target.value);
    };


    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    };

    const handleDateFilter = (index) => {
        setActiveDateFilter(index);
    };

    const handleDateBall = (index) => {
        setActiveDateBall(index);
    };

    const dateFilter = [
        { icon: "fa-regular fa-clock", text: "Бугунги сотувларим" },
        { icon: "fa-regular fa-calendar", text: "Бу ойдаги сотувлар" },
        { icon: "fa-solid fa-filter", text: "Кунлар бўйича саралаш" }
    ];

    const dateBall = [
        { icon: "fa-solid fa-calendar-days", text: "Маошларим" },
        { icon: "fa-regular fa-star", text: "Балларим" },
    ];

    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleNameChange = (e) => setName(e.target.value);
    const handleBirthDateChange = (e) => setBirthDate(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handleAddressChange = (e) => setAddress(e.target.value);

    if (activeDateFilter == 0) {
        console.log(formatDate(dateTime));
        ///// get statistics Start
        const fullUrl = `${url}/profile/?date=${formatDate(dateTime)}`;
        useEffect(() => {
            setModalDate(false);

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
                        setName(data.user.first_name)
                        setBirthDate(data.user.born_date)
                        setPhone(data.user.phone)
                        setAddress(data.user.address)
                    } else {
                        console.error('Ошибка: Некорректные данные получены от сервера.');
                    }

                } catch (error) {
                    console.error('Ошибка при запросе данных:', error.message);
                }
            };

            fetchData();
        }, [de, activeDateFilter])
        ///// get statistics End
    } else if (activeDateFilter == 1) {
        ///// get statistics Start
        const fullUrl = `${url}/profile/?this_month=${formatDate(dateTime)}`;
        useEffect(() => {

            setModalDate(false);
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
        }, [de, activeDateFilter])
        ///// get statistics End
    } else if (activeDateFilter == 2) {
        const fullUrl = `${url}/profile/?start_date=${danDate}&end_date=${gachaDate}`;

        useEffect(() => {
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
                        setDanDate('')
                        setGachaDate('')
                        setModalDate(false)
                    } else {
                        console.error('Ошибка: Некорректные данные получены от сервера.');
                    }

                } catch (error) {
                    console.error('Ошибка при запросе данных:', error.message);
                }
            };

            fetchData();
        }, [danDate, gachaDate])
    }

    useEffect(() => {
        if (activeDateFilter === 2) {
            setModalDate(true);
        } else {
            setModalDate(false);
        }
    }, [activeDateFilter]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullUrl = `${url}/profile/edit`;

        try {
            const response = await fetch(fullUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
                body: JSON.stringify({
                    first_name: name,
                    born_date: birthDate,
                    phone_number: phone,
                    address
                }),
            });

            const data = await response.json();

            if (data) {
                setName('')
                setBirthDate('')
                setPhone('')
                setAddress('')
                setDe(!de)
                setModal(false)
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };

    return (
        <div className={styles.intro}>
            <div
                className={`${styles.modalOpacity} ${modal ? styles.actModal : modalDate ? styles.actModal : ""}`}
                onClick={() => {
                    setModal(false)
                    setModalDate(false)
                }}
            ></div>

            <div className={`${styles.modal} ${modal ? styles.actModal : ""}`}>
                <p
                    className={styles.x}
                    onClick={() => setModal(false)}
                >
                    <i className="fa-solid fa-x"></i>
                </p>
                <form onSubmit={handleSubmit} className={styles.modal__body}>
                    <label htmlFor="name">
                        <p>Исм:</p>
                        <input
                            id="name"
                            placeholder='Исм:'
                            type="text"
                            defaultValue={userData.user?.first_name}
                            onChange={handleNameChange}
                        />
                    </label>
                    <label htmlFor="birthDate">
                        <p>Туғилган caна:</p>
                        <input
                            id="birthDate"
                            placeholder='Туғилган caна:'
                            type="date"
                            defaultValue={userData.user?.born_date}
                            onChange={handleBirthDateChange}
                        />
                    </label>
                    <label htmlFor="phone">
                        <p>Телефон:</p>
                        <input
                            id="phone"
                            placeholder='Телефон:'
                            type="text"
                            defaultValue={userData.user?.phone}
                            onChange={handlePhoneChange}
                        />
                    </label>
                    <label htmlFor="address">
                        <p>Манзил:</p>
                        <input
                            id="address"
                            placeholder='Манзил:'
                            type="text"
                            defaultValue={userData.user?.address}
                            onChange={handleAddressChange}
                        />
                    </label>
                    <button
                        className={styles.modal__btn}
                        onClick={() => setModal(false)}
                    >
                        <i className="fa-solid fa-clipboard-check"></i>
                        Сақлаш
                    </button>
                </form>
            </div>
            <div className={`${styles.modal} ${modalDate ? styles.actModal : ""}`}>
                <p
                    className={styles.x}
                    onClick={() => {
                        setModalDate(false)
                        // setActiveDateFilter(2)
                    }}
                >
                    <i className="fa-solid fa-x"></i>
                </p>
                <form className={styles.modal__body} onSubmit={handleSubmit}>
                    <label htmlFor="dan">
                        <p>dan:</p>
                        <input
                            id="dan"
                            placeholder='dan:'
                            type="date"
                            value={danDate}
                            onChange={handleDanDateChange}
                        />
                    </label>
                    <label htmlFor="gacha">
                        <p>gacha:</p>
                        <input
                            id="gacha"
                            placeholder='gacha:'
                            type="date"
                            value={gachaDate}
                            onChange={handleGachaDateChange}
                        />
                    </label>
                    <p
                        className={styles.modal__btn}
                        onClick={() => {
                            setModalDate(false)
                            // setActiveDateFilter(2)
                        }}
                    >юбориш</p>
                </form>
            </div>

            <div className={styles.intro__top}>
                <ul className={styles.intro__top__list}>
                    {dateFilter.map((item, index) => (
                        <li
                            key={index}
                            className={`${styles.intro__top__list__item} ${activeDateFilter === index ? styles.active : ''}`}
                            onClick={() => handleDateFilter(index)}
                        >
                            <i className={item.icon}></i>
                            <p>{item.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.intro__center}>
                <div className={styles.intro__center__left}>
                    <div className={styles.intro__center__left__user}>
                        <div className={styles.intro__center__left__user__list}>
                            <span className={styles.intro__center__left__user__list__item}>
                                <p>Кассир:</p>
                                <b className={styles.name}>{userData.user?.last_name} {userData.user?.first_name}</b>
                            </span>
                            <span className={styles.intro__center__left__user__list__item}>
                                <p>Туғилган сана:</p>
                                <b>{userData.user?.born_date}</b>
                            </span>
                            <span className={styles.intro__center__left__user__list__item}>
                                <p>Телефон:</p>
                                <b>{userData.user?.phone}</b>
                            </span>
                            <span className={styles.intro__center__left__user__list__item}>
                                <p>Манзил:</p>
                                <b>{userData.user?.address}</b>
                            </span>
                            <span className={styles.intro__center__left__user__list__item}>
                                <p>Смена:</p>
                                <b>{userData.user?.shift.name}</b>
                            </span>
                        </div>
                        <button
                            className={styles.intro__center__left__user__btn}
                            onClick={() => setModal(true)}
                        >
                            <i className="fa-solid fa-pen"></i>
                            Таҳрирлаш
                        </button>
                    </div>
                    <div className={styles.intro__center__left__userItem}>
                        <div className={styles.intro__center__left__userItem__top}>
                            <span>
                                <i className="fa-regular fa-star"></i>
                                <p>Менинг балларим</p>
                            </span>
                            <b>{userData.overall_user_score}</b>
                        </div>
                        <div className={styles.intro__center__left__userItem__bottom}>
                            <span>
                                <i className="fa-solid fa-calendar-days"></i>
                                <p>Бу ой</p>
                            </span>
                            <b>{userData.this_month_score}</b>
                        </div>
                    </div>
                </div>
                <div className={styles.intro__center__right}>
                    <div className={styles.intro__center__right__top}>
                        <ul className={styles.intro__center__right__top__list}>
                            {dateBall.map((item, index) => (
                                <li
                                    key={index}
                                    className={`${styles.intro__center__right__top__list__item} ${activeDateBall === index ? styles.active : ''}`}
                                    onClick={() => handleDateBall(index)}
                                >
                                    <i className={item.icon}></i>
                                    <p>{item.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.intro__center__right__table}>
                        {
                            activeDateBall === 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Маош</th>
                                            <th>Суммаси</th>
                                            <th>Вақти</th>
                                            <th>Берувчи</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData.user_salaries?.map((item, key) => (
                                            <tr key={key}>
                                                <td>{item.type}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.date_received}</td>
                                                <td>{item.giver_username}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Махсулот номи</th>
                                            <th>Балл</th>
                                            <th>Вақти</th>
                                            <th>Махсулот суммаси</th>
                                        </tr>
                                    </thead>
                                    {
                                        userData.user_scores.message ? (
                                            <div></div>
                                        ) :
                                            (
                                                <tbody>
                                                    {userData.user_scores?.map((item, key) => (
                                                        <tr key={key}>
                                                            <td>{item.item.sale_product_items.name}</td>
                                                            <td>{item.score}</td>
                                                            <td>{item.date_scored}</td>
                                                            <td>{item.item.total_sum}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            )
                                    }
                                </table>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro;