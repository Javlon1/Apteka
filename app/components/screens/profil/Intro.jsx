import { useContext, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './Intro.module.scss'
import { Context } from '@/app/components/ui/Context/Context';

const data = [
    {
        id: 1,
        name: 'Маош-442  13:41 15.04.2024',
        price: "2.000.000",
        expiration: "13:41 15.04.2024",
        admin: "Админ",
    },
    {
        id: 2,
        name: 'Маош-442  13:41 15.04.2024',
        price: "2.000.000",
        expiration: "13:41 15.04.2024",
        admin: "Админ",
    },
    {
        id: 3,
        name: 'Маош-442  13:41 15.04.2024',
        price: "2.000.000",
        expiration: "13:41 15.04.2024",
        admin: "Админ",
    },
    {
        id: 4,
        name: 'Маош-442  13:41 15.04.2024',
        price: "2.000.000",
        expiration: "13:41 15.04.2024",
        admin: "Админ",
    },
    {
        id: 5,
        name: 'Маош-442  13:41 15.04.2024',
        price: "2.000.000",
        expiration: "13:41 15.04.2024",
        admin: "Админ",
    },
    {
        id: 6,
        name: 'Маош-442  13:41 15.04.2024',
        price: "2.000.000",
        expiration: "13:41 15.04.2024",
        admin: "Админ",
    },
]

const Intro = () => {
    const { lan } = useContext(Context);
    const [activeDateFilter, setActiveDateFilter] = useState(0);
    const [activeDateBall, setActiveDateBall] = useState(0);
    const [modal, setModal] = useState(false)

    const handleDateFilter = (index) => {
        setActiveDateFilter(index);
        console.log(`index: ${index}`);
    };

    const handleDateBall = (index) => {
        setActiveDateBall(index);
        console.log(`index: ${index}`);
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

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            name,
            birthDate,
            phone,
            address
        });

    };


    return (
        <div className={styles.intro}>
            <div
                className={`${styles.modalOpacity} ${modal ? styles.actModal : ""}`}
                onClick={() => {
                    setModal(false)
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
                            value={name}
                            onChange={handleNameChange}
                        />
                    </label>
                    <label htmlFor="birthDate">
                        <p>Туғилган caна:</p>
                        <input
                            id="birthDate"
                            placeholder='Туғилган caна:'
                            type="date"
                            value={birthDate}
                            onChange={handleBirthDateChange}
                        />
                    </label>
                    <label htmlFor="phone">
                        <p>Телефон:</p>
                        <input
                            id="phone"
                            placeholder='Телефон:'
                            type="number"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </label>
                    <label htmlFor="address">
                        <p>Манзил:</p>
                        <input
                            id="address"
                            placeholder='Манзил:'
                            type="text"
                            value={address}
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
                                <b className={styles.name}>Mukhammadjonov Javlon</b>
                            </span>
                            <span className={styles.intro__center__left__user__list__item}>
                                <p>Туғилган сана:</p>
                                <b>05.03.2003</b>
                            </span>
                            <span className={styles.intro__center__left__user__list__item}>
                                <p>Телефон:</p>
                                <b>+998905251243</b>
                            </span>
                            <span className={styles.intro__center__left__user__list__item}>
                                <p>Манзил:</p>
                                <b>Norin tum.Haqulobod sh. Mirzo Ulug’bek 21-uy</b>
                            </span>
                            <span className={styles.intro__center__left__user__list__item}>
                                <p>Смена:</p>
                                <b>1-Смена</b>
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
                            <b>213.560</b>
                        </div>
                        <div className={styles.intro__center__left__userItem__bottom}>
                            <span>
                                <i className="fa-solid fa-calendar-days"></i>
                                <p>Бу ой</p>
                            </span>
                            <b>12.000</b>
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
                                {data.map((item, key) => (
                                    <tr key={key}>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.expiration}</td>
                                        <td>{item.admin}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro;