import * as React from 'react';
import Image from 'next/image'
import styles from './Workers.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import calendar from '../../../../../public/img/calendar.png'
import { useRouter } from 'next/router';
import ErrorMessage from '@/app/components/ui/Message/ErrorMessage/ErrorMessage';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


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

const WorkersInrto = () => {
    const { setError } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Ишчилар');
    const [activeRight, setActiveRight] = React.useState('Бугун');
    const [modal, setModal] = React.useState(false)

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

    const handleSubmitPost = (e) => {
        e.preventDefault();
        console.log('Submitted data:', formData);
    };

    return (
        <section className={styles.workers}>
            <ErrorMessage errorText={errorDate} />

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
                    <form onSubmit={handleSubmitPost}>
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
            <div className={styles.workers__header}>
                <div className={styles.workers__header__left}>
                    <ul className={styles.workers__header__left__list}>
                        {leftFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.workers__header__left__list__item} ${activeLeft === label ? styles.act : ''}`}
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

            <div className={styles.workers__center}>
                <div className={styles.workers__center__left}>
                    <Image
                        width={40}
                        height={40}
                        src={calendar}
                        alt='calendar'
                    />

                    <form className={styles.workers__center__left__form} onSubmit={handleSubmit}>
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
                        className={styles.workers__center__left__pdf}
                        onClick={exportPDF}
                    >
                        <i className="fa-solid fa-file-invoice"></i>
                        Export
                    </button>
                </div>
                <div className={styles.workers__center__right}>
                    <ul className={styles.workers__center__right__list}>
                        {rightFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.workers__center__right__list__item} ${activeRight === label ? styles.act : ''}`}
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

            <div id="tableToExport" className={styles.workers__table}>
                <div className={styles.workers__table__header}>
                    <p>Ишчилар статистикаси</p>
                    <button
                        onClick={() => setModal(true)}
                    >
                        <i className="fa-solid fa-user-plus"></i>
                        Ишчи қўшиш
                    </button>
                </div>
                <div className={styles.workers__table__table}>

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
        </section>
    )
}

export default WorkersInrto;