import * as React from 'react';
import Image from 'next/image'
import styles from './DescIntro.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import { useRouter } from 'next/router';
import calendar from '../../../../../public/img/calendar.png'
import ErrorMessage from '@/app/components/ui/Message/ErrorMessage/ErrorMessage';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DescIntro = () => {
    const { auth_token, url } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Чегирма карталар');
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
            label: 'Чегирма карталар',
            action: () => {
                router.push('/desc')
            }
        },
        {
            label: 'Созламалар',
            action: () => {
                router.push('/settings')
            }
        }
    ];

    ///// get statistics Start
    React.useEffect(() => {
        const fullUrl = `${url}/admin/discount-cards/`;

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
    }, []);
    ///// get statistics End

    const handlePrint = (qrCodeId, item) => {
        const element = document.getElementById(qrCodeId);
        if (element) {
            html2canvas(element).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();

                pdf.addImage(imgData, 'PNG', 10, 10, 50, 50);

                pdf.text(70, 20, `Исми: ${item.name}`);
                pdf.text(70, 30, `Фамилияси: ${item.surname}`);
                pdf.text(70, 40, `Телефон: ${item.number}`);

                pdf.save("qr_code.pdf");
            }).catch(error => {
                console.error('Ошибка при создании PDF:', error);
            });
        } else {
            console.error('Элемент с указанным id не найден:', qrCodeId);
        }
    };

    return (
        <div className={styles.descIntro}>
            <ErrorMessage errorText={errorDate} />
            <div className={styles.descIntro__header}>
                <div className={styles.descIntro__header__left}>
                    <ul className={styles.descIntro__header__left__list}>
                        {leftFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.descIntro__header__left__list__item} ${activeLeft === label ? styles.act : ''}`}
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
            <div id="tableToExport" className={styles.descIntro__table}>
                <table>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Исми</th>
                            <th>Фамилияси</th>
                            <th>Номери</th>
                            <th>Суммаси</th>
                            <th>Qr-code</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.number}</td>
                                <td>{item.amount}</td>
                                <td>
                                    <div id={`qrCode-${item.id}`} style={{ display: 'inline-block' }}>
                                        <Image
                                            src={`${url}/${item.qr_code_image}`}
                                            alt='qr-code'
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button
                                            className={styles.descIntro__table__btn}
                                            onClick={() => handlePrint(`qrCode-${item.id}`, item)}
                                        >
                                            <i className="fa-solid fa-print"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DescIntro;