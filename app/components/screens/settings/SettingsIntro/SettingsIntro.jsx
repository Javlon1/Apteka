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


const SettingsIntro = () => {
    const { setError, auth_token, url } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Созламалар');
    const [activeRight, setActiveRight] = React.useState('Бугун');
    const [dataShifts, setDataShifts] = React.useState([])
    const [de, setDe] = React.useState(false)
    const [dataChart, setDataChart] = React.useState([])
    const [dataUser, setDataUser] = React.useState([])
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
        categoryName: '',
        worker: '',
        workerSalary: '',
        firstName: '',
        lastName: '',
        phoneNumberr: ''
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

    React.useEffect(() => {
        const fullUrl = `${url}/admin/users/`;

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
                    setDataUser(data)
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

    const handleAddCategorySubmit = async (e) => {
        e.preventDefault();

        const fullUrl = `${url}/admin/category/add`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
                body: JSON.stringify({
                    name: formData.categoryName,
                }),
            });

            const data = await response.json();

            console.log(data);

            if (data) {
                setFormData({
                    categoryName: '',
                })
                setDe(!de)
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };

    const handleAddSalarySubmit = async (e) => {
        e.preventDefault();

        const fullUrl = `${url}/admin/salary/`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
                body: JSON.stringify({
                    amount: formData.workerSalary,
                    type: "oylik",
                    receiver_id: formData.worker
                }),
            });

            const data = await response.json();

            console.log(data);

            if (data) {
                setFormData({
                    workerSalary: '',
                    worker: '',
                })
                setDe(!de)
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };

    const handleAddCashbackCardSubmit = async (e) => {
        e.preventDefault();

        const fullUrl = `${url}/admin/discount-card/create/`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
                body: JSON.stringify({
                    number: formData.phoneNumberr,
                    amount: 0,
                    name: formData.firstName,
                    surname: formData.lastName
                }),
            });

            const data = await response.json();

            console.log(data);

            if (data) {
                setFormData({
                    phoneNumberr: '',
                    firstName: '',
                    lastName: '',
                })
                setDe(!de)
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };


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

            <div className={styles.settingsIntro__bottom}>

                <div className={styles.settingsIntro__bottom__right}>

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

                    <div>
                        <div className={styles.header}>
                            <p>махсулот категорияси</p>
                        </div>

                        <form onSubmit={handleAddCategorySubmit}>
                            <label htmlFor="categoryName">
                                <p>категория номи:</p>
                                <input
                                    type="text"
                                    id="categoryName"
                                    name="categoryName"
                                    value={formData.categoryName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <button type="submit">
                                Саклаш
                            </button>
                        </form>
                    </div>

                    <div>
                        <div className={styles.header}>
                            <p>ишчиларга ойлик</p>
                        </div>

                        <form onSubmit={handleAddSalarySubmit}>
                            <label htmlFor="worker">
                                <p>ишчи:</p>
                                <select name="worker" id="worker" value={formData.worker} onChange={handleInputChange} required>
                                    <option value="">Выберите ишчи</option>
                                    {
                                        dataUser?.map((item) => (
                                            <option key={item.id} value={item.id}>{item.first_name}</option>
                                        ))
                                    }
                                </select>
                            </label>
                            <label htmlFor="workerSalary">
                                <p>ишчини пули:</p>
                                <input
                                    type="number"
                                    id="workerSalary"
                                    name="workerSalary"
                                    value={formData.workerSalary}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <button type="submit">
                                Саклаш
                            </button>
                        </form>
                    </div>

                    <div>
                        <div className={styles.header}>
                            <p>Кешбек карта</p>
                        </div>

                        <form onSubmit={handleAddCashbackCardSubmit}>
                            <label htmlFor="firstName">
                                <p>исми:</p>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label htmlFor="lastName">
                                <p>фамилияси:</p>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label htmlFor="phoneNumberr">
                                <p>телефон раками:</p>
                                <input
                                    type="text"
                                    id="phoneNumberr"
                                    name="phoneNumberr"
                                    value={formData.phoneNumberr}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <button type="submit">
                                Саклаш
                            </button>
                        </form>
                    </div>

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
                </div>
            </div>
        </section>
    )
}

export default SettingsIntro;