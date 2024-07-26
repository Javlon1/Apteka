import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './ChakanaSavdo.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import { useRouter } from 'next/router';
import calendar from '../../../../../public/img/calendar.png'
import ErrorMessage from '@/app/components/ui/Message/ErrorMessage/ErrorMessage';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ChakanaSavdo = () => {
    const { setError, auth_token, url } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Чакана савдо');
    const [activeRight, setActiveRight] = React.useState('Бу ойда');
    const [date, setDate] = React.useState('thismonth')
    const [dataTable, setDataTable] = React.useState([])

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

    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');


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

    const handleSubmit = (e) => {
        e.preventDefault();

        ///// get statistics Start
        const fullUrl = `${url}/admin/retail/?start_date=${startDate}&end_date=${endDate}`;

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
                    setDataTable(data)
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
        const fullUrl = `${url}/admin/retail/?filter=${date}`;

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
                    setDataTable(data)
                } else {
                    console.error('Ошибка: Некорректные данные получены от сервера.');
                }

            } catch (error) {
                console.error('Ошибка при запросе данных:', error.message);
            }
        };

        fetchData();
    }, [date]);
    ///// get statistics End

    console.log(dataTable);

    return (
        <div className={styles.chakanaSavdo}>
            <ErrorMessage errorText={errorDate} />
            <div className={styles.chakanaSavdo__header}>
                <div className={styles.chakanaSavdo__header__left}>
                    <ul className={styles.chakanaSavdo__header__left__list}>
                        {leftFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.chakanaSavdo__header__left__list__item} ${activeLeft === label ? styles.act : ''}`}
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
            <div className={styles.chakanaSavdo__center}>
                <div className={styles.chakanaSavdo__center__left}>
                    <Image
                        width={40}
                        height={40}
                        src={calendar}
                        alt='calendar'
                    />

                    <form className={styles.chakanaSavdo__center__left__form} onSubmit={handleSubmit}>
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
                        className={styles.chakanaSavdo__center__left__pdf}
                        onClick={exportPDF}
                    >
                        <i className="fa-solid fa-file-invoice"></i>
                        Export
                    </button>
                </div>
                <div className={styles.chakanaSavdo__center__right}>
                    <ul className={styles.chakanaSavdo__center__right__list}>
                        {rightFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.chakanaSavdo__center__right__list__item} ${activeRight === label ? styles.act : ''}`}
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
            <div id="tableToExport" className={styles.chakanaSavdo__table}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>№</th>
                            <th>Сана</th>
                            <th>Тури</th>
                            <th>Мижоз</th>
                            <th>сумма</th>
                            <th>накд</th>
                            <th>Karta</th>
                            <th>Насия</th>
                            <th>кириш санаси</th>
                            <th>Фойдаланувчи</th>
                            <th>смена</th>
                            <th>ф.и.о</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataTable?.map((item) => (
                                <tr key={item.sale_id}>
                                    <td></td>
                                    <td>{item.sale_id}</td>
                                    <td>{item.date_added}</td>
                                    <td>чакана савдо</td>
                                    <td>{item.person}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.payment_type == "naqd" ? item.amount : 0}</td>
                                    <td>{item.payment_type == "card" ? item.amount : 0}</td>
                                    <td>{item.payment_type == "nasiya" ? item.amount : 0}</td>
                                    <td>{item.date_added}</td>
                                    <td>{item.user_type}</td>
                                    <td>{item.shift_name}</td>
                                    <td>{item.owner_first_name} {item.owner_last_name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    {/* <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>160.520.24</th>
                            <th>160.520.24</th>
                            <th>160.520.24</th>
                            <th>160.520.24</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot> */}
                </table>
            </div>
        </div>
    )
}

export default ChakanaSavdo;