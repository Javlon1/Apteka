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
    const { setError, auth_token, url } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Созламалар');
    const [activeRight, setActiveRight] = React.useState('Бугун');
    const [dataShifts, setDataShifts] = React.useState([])
    const [de, setDe] = React.useState(false)
    const [dataChart, setDataChart] = React.useState([])
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


    const [formDataWor, setFormDataWor] = React.useState({
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
        setFormDataWor({
            ...formDataWor,
            [name]: value
        });
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
        shiftId: 1,
    });


    const [shiftFormData, setShiftFormData] = React.useState({
        shiftName: ''
    });



    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        const newValue = name === 'logoFile' ? files[0] : value;
        setFormData({
            ...formData,
            [name]: newValue,
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


    const handleGeneralSettingsSubmit = async (event) => {
        event.preventDefault();
        const fullUrl = `${url}/admin/check-layout/`;

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.organizationName);
        formDataToSend.append('logo', formData.logoFile);
        formDataToSend.append('image', formData.logoFile);
        formDataToSend.append('phone', formData.phoneNumber);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('shift_id', formData.shiftId);

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    'Authorization': `Bearer ${auth_token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.message) {
                setFormData({
                    organizationName: '',
                    logoFile: null,
                    phoneNumber: '',
                    address: '',
                    shiftId: 1,
                });
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };


    const handleAddShiftSubmit = async (event) => {
        event.preventDefault();

        const fullUrl = `${url}/admin/shift/add/`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
                body: JSON.stringify({
                    name: shiftFormData.shiftName,
                }),
            });

            const data = await response.json();

            if (data.message) {
                setDe(!de)
                setShiftFormData({
                    shiftName: ''
                })
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };

    ///// post Cource Start
    const handleSubmitPost = async (e) => {
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
                    username: formDataWor.username,
                    hashed_password: formDataWor.password,
                    first_name: formDataWor.name,
                    last_name: formDataWor.last_name,
                    birth_date: formDataWor.birthDate,
                    phone_number: formDataWor.phone,
                    address: formDataWor.address,
                    shift_id: formDataWor.shift,
                    is_admin: false
                }),
            });

            const data = await response.json();

            if (data) {
                setFormDataWor({
                    name: '',
                    last_name: '',
                    birthDate: '',
                    phone: '',
                    address: '',
                    shift: 1,
                    username: '',
                    password: ''
                })
                setDe(!de)
                setModal(false)
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };
    ///// post Cource End



    return (
        <section className={styles.settingsIntro}>
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
                        <label htmlFor="username">
                            <p>Логини:</p>
                            <input type="text" id="username" name="username" value={formDataWor.username} onChange={handleChange} />
                        </label>
                        <label htmlFor="password">
                            <p>Пароли:</p>
                            <input type="text" id="password" name="password" value={formDataWor.password} onChange={handleChange} />
                        </label>
                        <label htmlFor="name">
                            <p>Исм:</p>
                            <input type="text" id="name" name="name" value={formDataWor.name} onChange={handleChange} />
                        </label>
                        <label htmlFor="last_name">
                            <p>Фамилияси:</p>
                            <input type="text" id="last_name" name="last_name" value={formDataWor.last_name} onChange={handleChange} />
                        </label>

                        <label htmlFor="birthDate">
                            <p>Туғилган сана:</p>
                            <input type="date" id="birthDate" name="birthDate" value={formDataWor.birthDate} onChange={handleChange} />
                        </label>
                        <label htmlFor="phone">
                            <p>Телефон:</p>
                            <input type="text" id="phone" name="phone" value={formDataWor.phone} onChange={handleChange} />
                        </label>
                        <label htmlFor="address">
                            <p>Манзил:</p>
                            <input type="text" id="address" name="address" value={formDataWor.address} onChange={handleChange} />
                        </label>
                        <label htmlFor="shift">
                            <p>Смена:</p>
                            <select id="shift" name="shift" value={formDataWor.shift} onChange={handleChange}>
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

            {/* <div className={styles.settingsIntro__center}>
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
            </div> */}

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
                                    dataChart.workers_table?.map((item, key) => (
                                        <tr key={key}>
                                            <td>{item.worker}</td>
                                            <td>{(item.user_sale_count)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                            <td>{(item.user_scores)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                            <td>{(item.user_salaries)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                            <td>{(item.user_scores)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
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
                            <label htmlFor="shiftId">
                                <p>Смена:</p>
                                <select
                                    id="shiftId"
                                    name="shiftId"
                                    value={formData.shiftId}
                                    onChange={handleInputChange}
                                >
                                    {dataShifts?.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
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