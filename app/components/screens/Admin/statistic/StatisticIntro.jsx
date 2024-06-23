import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './StatisticIntro.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import PieChart from '@/app/components/ui/PieChart/PieChart';
import chart from "../../../../../public/img/chart.png"
import { useRouter } from 'next/router';


const StatisticIntro = () => {
    const { auth_token, url } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Статистика');
    const [modal, setModal] = React.useState(false)
    const [de, setDe] = React.useState(false)
    const [dataChart, setDataChart] = React.useState([])
    const [dataShifts, setDataShifts] = React.useState([])

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
                router.push('/report')
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
                router.push('/settings')
            }
        }
    ];

    const colors = ['#FF3A29', '#4339F2', '#FFB200',];

    const [formData, setFormData] = React.useState({
        name: '',
        last_name: '',
        birthDate: '',
        phone: '',
        address: '',
        shift: 1,
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    ///// get statistics Start
    React.useEffect(() => {
        const fullUrl = `${url}/admin/statistics/`;

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
                    setDataChart(data)
                } else {
                    console.error('Ошибка: Некорректные данные получены от сервера.');
                }

            } catch (error) {
                console.error('Ошибка при запросе данных:', error.message);
            }
        };

        fetchData();
    }, [de]);
    ///// get statistics End

    ///// get shifts Start
    React.useEffect(() => {
        const fullUrl = `${url}/admin/shifts/`;

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
                    setDataShifts(data)
                } else {
                    console.error('Ошибка: Некорректные данные получены от сервера.');
                }

            } catch (error) {
                console.error('Ошибка при запросе данных:', error.message);
            }
        };

        fetchData();
    }, [de]);
    ///// get shifts End
    
    ///// post Cource Start
    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullUrl = `${url}/admin/create_user`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
                body: JSON.stringify({
                    username: formData.username,
                    hashed_password: formData.password,
                    first_name: formData.name,
                    last_name: formData.last_name,
                    birth_date: formData.birthDate,
                    phone_number: formData.phone,
                    address: formData.address,
                    shift_id: formData.shift,
                    is_admin: false
                }),
            });

            const data = await response.json();

            if (data) {
                setFormData([])
                setDe(!de)
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };
    ///// post Cource End

    const data = [dataChart.graph_objects?.overall_sum_expance_current_month, dataChart.graph_objects?.overall_sum_of_sale, dataChart.graph_objects?.overall_sum_of_profit];

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
                        <label htmlFor="username">
                            <p>Логини:</p>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                        </label>
                        <label htmlFor="password">
                            <p>Пароли:</p>
                            <input type="text" id="password" name="password" value={formData.password} onChange={handleChange} />
                        </label>
                        <label htmlFor="name">
                            <p>Исм:</p>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                        </label>
                        <label htmlFor="last_name">
                            <p>Фамилияси:</p>
                            <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
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
                            <select id="shift" name="shift" value={formData.shift} onChange={handleChange}>
                                {
                                    dataShifts?.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
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
            </div>

            <div className={styles.statisticIntro__body}>

                <div className={styles.statisticIntro__body__left}>
                    <div className={styles.statisticIntro__body__left__top}>
                        <div className={styles.statisticIntro__body__left__top__chart}>
                            <p className={styles.name}>Аптекада</p>
                            <b>{dataChart.graph_objects?.overall_sum_of_sale}</b>
                            <p>+{dataChart.graph_objects?.sales_percent_change}%</p>
                            <Image
                                src={chart}
                                alt='Chart'
                                priority
                            />
                        </div>
                        <div className={styles.statisticIntro__body__left__top__chart}>
                            <p className={styles.name}>Соф фойда</p>
                            <b>{dataChart.graph_objects?.overall_sum_of_profit}</b>
                            <p>+{dataChart.graph_objects?.profit_percent_change}%</p>
                            <Image
                                src={chart}
                                alt='Chart'
                                priority
                            />
                        </div>
                        <div className={styles.statisticIntro__body__left__top__chart}>
                            <p className={styles.name}>Сотувлар</p>
                            <b>{dataChart.graph_objects?.quantity_of_sales_current_month}</b>
                            <p>+{dataChart.graph_objects?.quantity_sales_percent_change}%</p>
                            <Image
                                src={chart}
                                alt='Chart'
                                priority
                            />
                        </div>
                        <div className={styles.statisticIntro__body__left__top__chart}>
                            <p className={styles.name}>Ишчилар маоши</p>
                            <b>{dataChart.graph_objects?.overall_sum_salaries_current_month}</b>
                            <p>+{dataChart.graph_objects?.salary_change_percent}%</p>
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
                                        dataChart.top_10_products?.map((item, key) => (
                                            <tr key={key}>
                                                <td>{item.product_name}</td>
                                                <td>{(item.quantity_sold).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                                <td>{(item.total_sales).toLocaleString('en-US').replace(/,/g, ' ')}</td>
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
                                        dataChart.workers_table?.map((item, key) => (
                                            <tr key={key}>
                                                <td>{item.worker}</td>
                                                <td>{(item.user_sale_count)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                                <td>{(item.user_scores)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                                <td>{(item.user_salaries)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                                <td>{(item.user_bonus)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
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