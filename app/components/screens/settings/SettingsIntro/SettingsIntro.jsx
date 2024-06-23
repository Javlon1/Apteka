import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './SettingsIntro.module.scss'
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

const SettingsIntro = () => {
    const { setError } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Созламалар');
    const [activeRight, setActiveRight] = React.useState('Бугун');

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
                router.push('/settingsIntro')
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

    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

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


    const data = [30, 30, 30];
    const colors = ['#FF3A29', '#4339F2', '#FFB200',];

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(startDate, '-', endDate);
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

    const [formData, setFormData] = React.useState({
        organizationName: '',
        logoFile: null,
        phoneNumber: '',
        address: '',
    });


    const [shiftFormData, setShiftFormData] = React.useState({
        shiftName: ''
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        const newValue = name === 'logoFile' ? files[0] : value;

        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const handleGeneralSettingsSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
    };

    const handleAddShiftSubmit = async (event) => {
        event.preventDefault();
        console.log(shiftFormData);
    };



    return (
        <section className={styles.settingsIntro}>
            <ErrorMessage errorText={errorDate} />
            <div className={styles.settingsIntro__header}>
                <div className={styles.settingsIntro__header__left}>
                    <ul className={styles.settingsIntro__header__left__list}>
                        {leftFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.settingsIntro__header__left__list__item} ${activeLeft === label ? styles.act : ''}`}
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

            <div className={styles.settingsIntro__center}>
                <div className={styles.settingsIntro__center__left}>
                    <Image
                        width={40}
                        height={40}
                        src={calendar}
                        alt='calendar'
                    />

                    <form className={styles.settingsIntro__center__left__form} onSubmit={handleSubmit}>
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
                        className={styles.settingsIntro__center__left__pdf}
                        onClick={exportPDF}
                    >
                        <i className="fa-solid fa-file-invoice"></i>
                        Export
                    </button>
                </div>
                <div className={styles.settingsIntro__center__right}>
                    <ul className={styles.settingsIntro__center__right__list}>
                        {rightFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.settingsIntro__center__right__list__item} ${activeRight === label ? styles.act : ''}`}
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
            <div className={styles.settingsIntro__bottom}>
                <div id="tableToExport" className={styles.settingsIntro__bottom__table}>
                    <div className={styles.settingsIntro__bottom__table__header}>
                        <p>Ишчилар статистикаси</p>
                        <button
                            onClick={() => setModal(true)}
                        >
                            <i className="fa-solid fa-user-plus"></i>
                            Ишчи қўшиш
                        </button>
                    </div>
                    <div className={styles.settingsIntro__bottom__table__table}>

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

                <div className={styles.settingsIntro__bottom__right}>
                    <div>
                        <div className={styles.header}>
                            <p>менинг аптекам</p>
                        </div>

                        <form onSubmit={handleGeneralSettingsSubmit}>
                            <label htmlFor="organizationName">
                                <p>Ташкилот номи:</p>
                                <input
                                    type="text"
                                    id="organizationName"
                                    name="organizationName"
                                    value={formData.organizationName}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label htmlFor="logoFile">
                                <p>Логотип:</p>
                                <input
                                    type="file"
                                    id="logoFile"
                                    name="logoFile"
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label htmlFor="phoneNumber">
                                <p>Телефон:</p>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label htmlFor="address">
                                <p>Манзил:</p>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </label>

                            <button type='submit'>
                                Саклаш
                            </button>
                        </form>
                    </div>

                    <div>
                        <div className={styles.header}>
                            <p>смена кушиш</p>
                        </div>

                        <form onSubmit={handleAddShiftSubmit}>
                            <label htmlFor="shiftName">
                                <p>Смена номи:</p>
                                <input
                                    type="text"
                                    id="shiftName"
                                    name="shiftName"
                                    value={shiftFormData.shiftName}
                                    onChange={(e) => setShiftFormData({ shiftName: e.target.value })}
                                />
                            </label>
                            <button type='submit'>
                                Саклаш
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SettingsIntro;