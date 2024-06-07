import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './StatisticIntro.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import PieChart from '@/app/components/ui/PieChart/PieChart';
import chart from "../../../../../public/img/chart.png"
import { useRouter } from 'next/router';


const dataTable = [
    {
        id: 1,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        share: "Узбекиjстан",
    },
    {
        id: 2,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        share: "Узбекистан",
    },
    {
        id: 3,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        share: "Узбекистан",
    },
    {
        id: 4,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        share: "Узбекистан",
    },
    {
        id: 5,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        share: "Узбекистан",
    },
    {
        id: 5,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        share: "Узбекистан",
    },
    {
        id: 5,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        share: "Узбекистан",
    },
    {
        id: 5,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        share: "Узбекистан",
    },
    {
        id: 5,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        share: "Узбекистан",
    },
    {
        id: 5,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        share: "Узбекистан",
    },
    {
        id: 5,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        share: "Узбекистан",
    },
    {
        id: 5,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        share: "Узбекистан",
    },
]

const StatisticIntro = () => {
    const { lan } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Статистика');
    const [activeRight, setActiveRight] = React.useState('Бугун');
    const [modal, setModal] = React.useState(false)

    const router = useRouter()

    // Функции для левого списка
    const leftFunctions = [
        {
            label: 'Статистика',
            action: () => {
                router.push('/statistic')
            }
        },
        {
            label: 'Ҳисобот',
            action: () => {
                router.push('/ew')
            }
        },
        {
            label: 'Товар кирими',
            action: () => {
                router.push('/product')
            }
        },
        {
            label: 'Чакана савдо',
            action: () => {
                router.push('/chakana-savdo')
            }
        },
        {
            label: 'Ишчилар',
            action: () => {
                router.push('/workers')
            }
        },
        {
            label: 'Созламалар',
            action: () => {
                router.push('/ew')
            }
        }
    ];

    // Функции для правого списка
    const rightFunctions = [
        {
            label: 'Бугун',
            action: () => console.log('Функция для Бугуна')
        },
        {
            label: 'Бу ҳафта',
            action: () => console.log('Функция для Бу ҳафта')
        },
        {
            label: 'Бу ойда',
            action: () => console.log('Функция для Бу ойда')
        },
        {
            label: 'Бу квартал',
            action: () => console.log('Функция для Бу квартал')
        }
    ];

    const data = [30, 30, 30];
    const colors = ['#FF3A29', '#4339F2', '#FFB200',];

    const [formData, setFormData] = React.useState({
        name: '',
        birthDate: '',
        phone: '',
        address: '',
        shift: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted data:', formData);
    };

    return (
        <section className={styles.statisticIntro}>
            <div
                className={`${styles.modalOpacity} ${modal ? styles.actModal : ""}`}
                onClick={() => {
                    setModal(false)
                }}
            ></div>

            <div className={`${styles.modal} ${modal ? styles.actModal : ""}`}>

                <div className={styles.modal__header}>
                    <p onClick={() => setModal(false)}>
                        <i className="fa-solid fa-x"></i>
                    </p>
                </div>

                <div className={styles.modal__body}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            <p>Исм:</p>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </label>
                        <label htmlFor="birthDate">
                            <p>Туғилган сана:</p>
                            <input type="text" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                        </label>
                        <label htmlFor="phone">
                            <p>Телефон:</p>
                            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </label>
                        <label htmlFor="address">
                            <p>Манзил:</p>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                        </label>
                        <label htmlFor="shift">
                            <p>Смена:</p>
                            <input type="text" id="shift" name="shift" value={formData.shift} onChange={handleChange} />
                        </label>

                        <button type="submit">
                            <i className="fa-solid fa-file-lines"></i>
                            Сақлаш
                        </button>
                    </form>
                </div>
            </div>

            <div className={styles.statisticIntro__header}>
                <div className={styles.statisticIntro__header__left}>
                    <ul className={styles.statisticIntro__header__left__list}>
                        {leftFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.statisticIntro__header__left__list__item} ${activeLeft === label ? styles.act : ''}`}
                                onClick={() => {
                                    setActiveLeft(label);
                                    action();
                                }}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.statisticIntro__header__right}>
                    <ul className={styles.statisticIntro__header__right__list}>
                        {rightFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.statisticIntro__header__right__list__item} ${activeRight === label ? styles.act : ''}`}
                                onClick={() => {
                                    setActiveRight(label);
                                    action();
                                }}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.statisticIntro__body}>

                <div className={styles.statisticIntro__body__left}>
                    <div className={styles.statisticIntro__body__left__top}>
                        <div className={styles.statisticIntro__body__left__top__chart}>
                            <p className={styles.name}>Аптекада</p>
                            <b>65,123,376</b>
                            <p>+5%</p>
                            <Image
                                src={chart}
                                alt='Chart'
                                priority
                            />
                        </div>
                        <div className={styles.statisticIntro__body__left__top__chart}>
                            <p className={styles.name}>Соф фойда</p>
                            <b>15,123,376</b>
                            <p>+8%</p>
                            <Image
                                src={chart}
                                alt='Chart'
                                priority
                            />
                        </div>
                        <div className={styles.statisticIntro__body__left__top__chart}>
                            <p className={styles.name}>Сотувлар</p>
                            <b>3,376</b>
                            <p>+1%</p>
                            <Image
                                src={chart}
                                alt='Chart'
                                priority
                            />
                        </div>
                        <div className={styles.statisticIntro__body__left__top__chart}>
                            <p className={styles.name}>Ишчилар маоши</p>
                            <b>8.200.000</b>
                            <p>+1%</p>
                            <Image
                                src={chart}
                                alt='Chart'
                                priority
                            />
                        </div>
                    </div>
                    <div className={styles.statisticIntro__body__left__bottom}>
                        <div className={styles.statisticIntro__body__left__bottom__header}>
                            <p>Аптекада</p>
                            <ul>
                                <li>
                                    <b></b>
                                    <p>Чиқим</p>
                                </li>
                                <li>
                                    <b></b>
                                    <p>Кирим</p>
                                </li>
                                <li>
                                    <b></b>
                                    <p>Фойда</p>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.chart}>
                            <PieChart data={data} colors={colors} />
                            <p>Аптекада мавжуд молия диаграммаси</p>
                        </div>
                    </div>
                </div>

                <div className={styles.statisticIntro__body__right}>

                    <div className={styles.statisticIntro__body__right__top}>
                        <div className={styles.statisticIntro__body__right__top__header}>
                            <p>ТОП 10 та сотилган товарлар</p>
                        </div>
                        <div className={styles.statisticIntro__body__right__top__table}>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Тўлиқ номи</th>
                                        <th>Миқдори</th>
                                        <th>Нархи</th>
                                        <th>% улуши</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataTable.map((item, key) => (
                                            <tr key={key}>
                                                <td>{item.name}</td>
                                                <td>{(item.quantity).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                                <td>{(item.price).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                                <td>{item.share}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>

                    <div className={styles.statisticIntro__body__right__bottom}>
                        <div className={styles.statisticIntro__body__right__bottom__header}>
                            <p>Ишчилар статистикаси</p>
                            <button
                                onClick={() => setModal(true)}
                            >
                                <i className="fa-solid fa-user-plus"></i>
                                Ишчи қўшиш
                            </button>
                        </div>
                        <div className={styles.statisticIntro__body__right__bottom__table}>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Ишчи</th>
                                        <th>Сотувлар</th>
                                        <th>Баллар</th>
                                        <th>Маош</th>
                                        <th>Премия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataTable.map((item, key) => (
                                            <tr key={key}>
                                                <td>{item.name}</td>
                                                <td>{(item.quantity).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                                <td>{(item.price).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                                <td>{item.share}</td>
                                                <td>{item.share}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default StatisticIntro;