import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './ReportIntro.module.scss'
import calendar from '../../../../../public/img/calendar.png'
import { Context } from '@/app/components/ui/Context/Context';
import MyContainer from '@/app/components/ui/MyContainer/MyContainer'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRouter } from 'next/router';
import ErrorMessage from '@/app/components/ui/Message/ErrorMessage/ErrorMessage';
import PieChart from '@/app/components/ui/PieChart/PieChart';
import chart from "../../../../../public/img/chart.png"


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
]

const ReportIntro = () => {
    const { setError, auth_token, url } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Ҳисобот');
    const [activeRight, setActiveRight] = React.useState('Бу ойда');
    const [dataChart, setDataChart] = React.useState([])
    const [de, setDe] = React.useState(false)
    const [date, setDate] = React.useState('thismonth')

    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    // Error Start
    const [errorDate, setErrorDate] = React.useState('')
    // Error End

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
                router.push('/reportIntro')
            }
        },
        {
            label: 'Созламалар',
            action: () => {
                router.push('/settings')
            }
        }
    ];

    // Функции для правого списка
    const rightFunctions = [
        {
            label: 'Бугун',
            action: () => {
                setDate('today')
                setStartDate('')
                setEndDate('')
            }
        },
        {
            label: 'Бу ҳафта',
            action: () => {
                setDate('thisweek')
                setStartDate('')
                setEndDate('')
            }
        },
        {
            label: 'Бу ойда',
            action: () => {
                setDate('thismonth')
                setStartDate('')
                setEndDate('')
            }
        },
        {
            label: 'Бу квартал',
            action: () => {
                setDate('thisquarter')
                setStartDate('')
                setEndDate('')
            }
        }
    ];

    const handleStartDateChange = (e) => {
        const selectedStartDate = e.target.value;
        if (!endDate || selectedStartDate <= endDate) {
            setStartDate(selectedStartDate);
        } else {
            setError(true)
            setErrorDate("Tanlangan sana tugash sanasidan katta bo‘lishi mumkin emas.")
        }
    };

    const handleEndDateChange = (e) => {
        const selectedEndDate = e.target.value;
        if (!startDate || selectedEndDate >= startDate) {
            setEndDate(selectedEndDate);
        } else {
            setError(true)
            setErrorDate("Tanlangan sana boshlanish sanasidan kichkina boʻlmasligi kerak.")
        }
    };


    const colors = ['#FF3A29', '#4339F2', '#FFB200',];

    const handleSubmit = (e) => {
        e.preventDefault();

        ///// get statistics Start
        const fullUrl = `${url}/admin/reports/?start_date=${startDate}&end_date=${endDate}`;

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
        ///// get statistics End
    };

    const exportPDF = () => {
        const input = document.getElementById('tableToExport');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('table.pdf');
        });
    };

    ///// get statistics Start
    React.useEffect(() => {
        const fullUrl = `${url}/admin/reports/?filter=${date}`;

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
    }, [de, date]);
    ///// get statistics End

    const data = [dataChart.graph_data?.overall_sum_expense_current_month, dataChart.graph_data?.overall_sum_of_sale, dataChart.graph_data?.overall_sum_of_profit];

    return (
        <section className={styles.reportIntro}>
            <ErrorMessage errorText={errorDate} />
            <div className={styles.reportIntro__header}>
                <div className={styles.reportIntro__header__left}>
                    <ul className={styles.reportIntro__header__left__list}>
                        {leftFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.reportIntro__header__left__list__item} ${activeLeft === label ? styles.act : ''}`}
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

            <div className={styles.reportIntro__center}>
                <div className={styles.reportIntro__center__left}>
                    <Image
                        width={40}
                        height={40}
                        src={calendar}
                        alt='calendar'
                    />

                    <form className={styles.reportIntro__center__left__form} onSubmit={handleSubmit}>
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                        <button type='submit'>Филтр</button>
                    </form>
                    <button
                        className={styles.reportIntro__center__left__pdf}
                        onClick={exportPDF}
                    >
                        <i className="fa-solid fa-file-invoice"></i>
                        Export
                    </button>
                </div>
                <div className={styles.reportIntro__center__right}>
                    <ul className={styles.reportIntro__center__right__list}>
                        {rightFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.reportIntro__center__right__list__item} ${activeRight === label ? styles.act : ''}`}
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
            <div className={styles.reportIntro__chart}>
                <div className={styles.reportIntro__chart__item}>
                    <p className={styles.name}>Аптекада</p>
                    <b>{dataChart.graph_data?.overall_sum_of_sale}</b>
                    <p>+{dataChart.graph_data?.sales_percent_change}%</p>
                    <Image
                        src={chart}
                        alt='Chart'
                        priority
                    />
                </div>
                <div className={styles.reportIntro__chart__item}>
                    <p className={styles.name}>Соф фойда</p>
                    <b>{dataChart.graph_data?.overall_sum_of_profit}</b>
                    <p>+{dataChart.graph_data?.profit_percent_change}%</p>
                    <Image
                        src={chart}
                        alt='Chart'
                        priority
                    />
                </div>
                <div className={styles.reportIntro__chart__item}>
                    <p className={styles.name}>Насия савдо</p>
                    <b>{dataChart.graph_data?.nasiya_savdo}</b>
                    <p>+{dataChart.graph_data?.p}%</p>
                    <Image
                        src={chart}
                        alt='Chart'
                        priority
                    />
                </div>
                <div className={styles.reportIntro__chart__item}>
                    <p className={styles.name}>Нақд савдо</p>
                    <b>{dataChart.graph_data?.naqd_savdo}</b>
                    <p>+{dataChart.graph_data?.p}%</p>
                    <Image
                        src={chart}
                        alt='Chart'
                        priority
                    />
                </div>
                <div className={styles.reportIntro__chart__item}>
                    <p className={styles.name}>Сотувлар</p>
                    <b>{dataChart.graph_data?.quantity_of_sales_current_month}</b>
                    <p>+{dataChart.graph_data?.quantity_sales_percent_change}%</p>
                    <Image
                        src={chart}
                        alt='Chart'
                        priority
                    />
                </div>
                <div className={styles.reportIntro__chart__item}>
                    <p className={styles.name}>Ишчилар маоши</p>
                    <b>{dataChart.graph_data?.overall_sum_salaries_current_month}</b>
                    <p>+{dataChart.graph_data?.salary_change_percent}%</p>
                    <Image
                        src={chart}
                        alt='Chart'
                        priority
                    />
                </div>
            </div>
            <div className={styles.reportIntro__bottom}>
                <div className={styles.reportIntro__bottom__chart}>
                    <div className={styles.reportIntro__bottom__chart__header}>
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

                <div className={styles.reportIntro__bottom__table}>
                    <div className={styles.reportIntro__bottom__table__header}>
                        <p>ТОП 10 та сотилган товарлар</p>
                    </div>
                    <div className={styles.reportIntro__bottom__table__table}>

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
                                    dataChart.table_data?.map((item, key) => (
                                        <tr key={key}>
                                            <td>{item.product_name}</td>
                                            <td>{(item.quantity_sold).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                            <td>{(item.total_sales).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                            <td>{item.percentage_of_overall_sales_revenue}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReportIntro;