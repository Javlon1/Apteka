import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Intro.module.scss';
import { Context } from '@/app/components/ui/Context/Context';
import printer from '../../../../public/img/printer.png'
import Image from 'next/image';

const Intro = () => {
    const { order, setOrder, url, auth_token, sale, setSale, type } = useContext(Context);
    const [dateTime, setDateTime] = useState(new Date());
    const [modal, setModal] = useState(false)
    const [de, setDe] = useState(false)
    const [deCard, setDeCard] = useState(false)
    const [card, setCard] = useState([])
    const [data, setData] = useState([])
    const [dataCheck, setDataCheck] = useState(0)
    const [dataItems, setDataItems] = useState([])
    const [checkObject, setCheckObject] = useState([])
    const [totalAmount, setTotalAmount] = useState(0);
    const [discountCard, setDiscountCard] = useState(0);

    // onClick={() => inputQrcodeRef.current.focus()}

    const [formSaleData, setFormSaleData] = useState({
        discount: '',
        cash: '',
        payment: '',
        humo: '',
        card: card.amount,
        total: '',
    });

    const [scanResult, setScanResult] = useState('');
    const inputQrcodeRef = useRef(null);

    useEffect(() => {

        setScanResult("");
        inputQrcodeRef.current.value = '';

        const handleScan = (event) => {
            if (event.target === inputQrcodeRef.current) {
                const newScanResult = event.target.value;
                setScanResult(newScanResult);
            }
        };

        document.addEventListener('input', handleScan);
        const inputElement = inputQrcodeRef.current;

        if (inputQrcodeRef.current) {
            inputQrcodeRef.current.focus();
            inputElement.addEventListener('input', handleScan);
        }


        return () => {
            document.removeEventListener('input', handleScan);
        };
    }, [inputQrcodeRef, de]);


    useEffect(() => {
        if (scanResult) {
            const item = data.find(item => item.serial_number === scanResult);
            if (item) {
                setAddItem(item);
                setModal(true);
            }
        }
        setScanResult("")
    }, [scanResult, de]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormSaleData({
            ...formSaleData,
            [name]: value,
        });
    };

    const [formData, setFormData] = useState({
        additionalField1: '',
        additionalField2: '',
        additionalField3: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    ///// get statistics Start
    useEffect(() => {

        const fullUrl = `${url}/home/?check_id=${dataCheck}`;

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
                    setData(data.products)
                    setDataCheck(data.check.id)
                    setDataItems(data.items)
                    setCheckObject(data.check_object)
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


    // Date Format
    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    // Date Format

    // Data-Table Start
    const [itemsPerPage, setItemsPerPage] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState('');

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const filteredData = data.filter((item) => {
        const matchesFilterText = JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase());

        return matchesFilterText;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    // Data-Table End


    // Filter Start
    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const [search, setSearch] = useState('');
    const inputRef = useRef(null);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchFilter = (e) => {
        e.preventDefault();

        setFilterText(search);
        setCurrentPage(1);
    };

    const handleKeyPress = (event) => {
        if (event.keyCode === 70 && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
    // Filter End


    // Order Start
    const [totalPrice, setTotalPrice] = useState(0);
    const [addItem, setAddItem] = useState([]);

    const addOrder = (item) => {
        const newOrder = [...new Set([...order, item])];
        setOrder(newOrder);
    };

    const delOrder = async (id) => {
        const newOrder = order.filter(item => item.id !== id);

        const fullUrl = `${url}/delete_check_item/?sale_item_id=${id}`;

        try {
            const response = await fetch(fullUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
            });

            const data = await response.json();

            if (data.message) {
                setDe(!de)
            }

        } catch (error) {
            console.error('Error during POST request:', error);
        }

        setOrder(newOrder);
    };

    useEffect(() => {
        const total = order.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(total);
    }, [order]);
    // Order End

    const getBackgroundColor = (expiration) => {
        if (typeof expiration !== 'string') {
            return '';
        }

        const today = new Date();
        const [year, month, day] = expiration.split('-').map(Number);

        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            return '';
        }

        const expDate = new Date(year, month - 1, day);
        const timeDiff = expDate.getTime() - today.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (dayDiff <= 2) {
            return styles.red;
        } else if (dayDiff <= 7) {
            return styles.yellow;
        } else if (dayDiff <= 15) {
            return styles.green;
        } else {
            return '';
        }
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();

        const fullUrl = `${url}/add_to_check/`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
                body: JSON.stringify({
                    amount_of_box: parseInt(formData.additionalField1),
                    amount_of_package: parseInt(formData.additionalField2),
                    amount_from_package: parseInt(formData.additionalField3),
                    total_sum: parseFloat(totalAmount),
                    product_id: addItem.id,
                    sale_id: dataCheck,
                }),
            });

            const data = await response.json();

            setScanResult("");
            inputQrcodeRef.current.value = '';

            if (data.message) {
                setDe(!de)
                addOrder(formData);
                setModal(false);
                setFormData({
                    additionalField1: '',
                    additionalField2: '',
                    additionalField3: ''
                })
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };

    useEffect(() => {
        const calculateTotal = () => {
            const packCount = parseInt(formData.additionalField1, 10) || 0;
            const cassetteCount = parseInt(formData.additionalField2, 10) || 0;
            const pieceCount = parseInt(formData.additionalField3, 10) || 0;

            const totalPack = (addItem.amount_in_package * addItem.amount_in_box) * packCount;

            const totalCassette = (addItem.amount_in_package * cassetteCount);

            const tabletPrice = addItem.sale_price / (addItem.amount_in_box * addItem.amount_in_package);

            const totalPrice = (totalPack + totalCassette + pieceCount) * tabletPrice

            setTotalAmount(totalPrice.toFixed(2));
        };

        calculateTotal();
    }, [formData]);


    const handleDiscountCardSubmit = async (e) => {
        const fullUrl = `${url}/start_capture/`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
            });

            const data = await response.json();

            if (data.message) {
                setDeCard(true)
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };

    useEffect(() => {
        if (deCard) {
            const intervalId = setInterval(() => {
                const fullUrl = `${url}/get_scanned_data/`;

                const Cardhandler = async () => {
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
                        console.log(data)
                        if (data.scanned_data.number) {

                            setDiscountCard(data.scanned_data.number)
                            setDeCard(false)
                        } else {
                            console.error('Ошибка: Некорректные данные получены от сервера.');
                        }

                    } catch (error) {
                        console.error('Ошибка при запросе данных:', error.message);
                    }
                };

                Cardhandler();
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [deCard]);

    console.log(discountCard);

    useEffect(() => {
        if (discountCard && !deCard) {
            const handleDiscountCardStopSubmit = async (e) => {
                const fullUrl = `${url}/stop_capture/`;

                try {
                    const response = await fetch(fullUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${auth_token}`,
                        },
                    });

                    const data = await response.json();

                    if (data.message) {
                        setDeCard(false)
                        setDiscountCard("")
                    }
                } catch (error) {
                    console.error('Error during POST request:', error);
                }
            };
            handleDiscountCardStopSubmit()

        }
    }, [discountCard, deCard])


    useEffect(() => {

        const fullUrl = `${url}/admin/card/?card_id=${discountCard}`; //discountCard

        const Cardhandler = async () => {
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

                    setCard(data)

                } else {
                    console.error('Ошибка: Некорректные данные получены от сервера.');
                }

            } catch (error) {
                console.error('Ошибка при запросе данных:', error.message);
            }
        };

        Cardhandler();
    }, [discountCard]);

    const handleSaleSubmit = async (e) => {
        e.preventDefault();

        const fullUrl = `${url}/sell/`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
                body: JSON.stringify({
                    check_id: dataCheck,
                    discount_card_id: discountCard ? discountCard : 0,
                    from_discount_card: card.amount,
                    payment_type: type === "Нақд" ? "naqd" : type === "Карта" ? "plastik" : type === "Насия" ? "nasiya" : "",
                    discount: checkObject.total_discount,
                    person: "J/S",
                    total: checkObject.payment,
                    with_discount_card: false
                }),
            });

            const data = await response.json();

            if (data.message) {
                setDataCheck(0)
                setDe(!de)
                setSale(false)
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        }

    };

    const closeSubmit = async () => {

        const fullUrl = `${url}/delay/check/?check_id=${dataCheck}`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
            });

            const data = await response.json();

            if (data.message) {
                setDe(!de)
                setDataCheck(0)
            }
        } catch (error) {
            console.error('Error during POST request:', error);
        } finally {
            setSale(false)
        }
    }

    const [ckeckPrint, setCheckPrint] = useState([]);

    useEffect(() => {

        const fullUrl = `${url}/check_layout`;

        const CheckPrintHandler = async () => {
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

                    setCheckPrint(data)

                } else {
                    console.error('Ошибка: Некорректные данные получены от сервера.');
                }

            } catch (error) {
                console.error('Ошибка при запросе данных:', error.message);
            }
        };

        CheckPrintHandler();
    }, [deCard]);

    const handlePrint = () => {
        const printWindow = window.open('', '', 'height=800,width=600');

        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>');
        printWindow.document.write('body { font-family: Arial, sans-serif; padding: 1.5rem 1rem; }');
        printWindow.document.write('.printer { margin: 0 auto; display: inline-block; }');
        printWindow.document.write('img { width: 100px; height: auto; margin-bottom: 1rem; }');
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<div class="printer">');

        printWindow.document.write(`<img src="${url}${ckeckPrint.image}" alt="Image" />`);
        printWindow.document.write(`<p>${ckeckPrint.name}</p>`);
        printWindow.document.write(`<p>${ckeckPrint.address}</p>`);
        printWindow.document.write(`<p>${ckeckPrint.phone}</p>`);
        printWindow.document.write(`<p>${ckeckPrint.check_shift?.name || ''}</p>`);
        printWindow.document.write(`<b>${(checkObject.payment)?.toLocaleString('en-US').replace(/,/g, ' ')}</b>`);
        printWindow.document.write('</div>');
        printWindow.document.write('</body></html>');

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <section className={styles.intro}>
            <div
                className={`${styles.modalOpacity} ${modal ? styles.actModal : sale ? styles.actModal : ""}`}
                onClick={() => {
                    setModal(false)
                    setSale(false)
                    setScanResult("");
                    inputQrcodeRef.current.value = '';
                }}
            ></div>
            <div className={`${styles.modal} ${sale ? styles.actModal : ""}`}>
                <div className={styles.modal__sale}>
                    <div className={styles.modal__sale__header}>
                        <span>
                            <p>Тўлов</p>
                            <i className="fa-solid fa-money-bill-1"></i>
                        </span>
                        <p onClick={() => setSale(false)}>
                            <i className="fa-solid fa-x"></i>
                        </p>
                    </div>
                    <div className={styles.modal__sale__body}>
                        <div className={styles.modal__sale__body__top}>
                            <p>{(checkObject.payment)?.toLocaleString('en-US').replace(/,/g, ' ')}</p>
                        </div>
                        <form className={styles.modal__sale__body__form} onSubmit={handleSaleSubmit}>
                            <div className={styles.modal__sale__body__form__top}>
                                <label>
                                    <p>Чегирма</p>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={checkObject.total_discount}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    <p>Касса</p>
                                    <input
                                        className={styles.inpBack}
                                        type="number"
                                        name="cash"
                                        value={formSaleData.cash}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    <p>Тўлов</p>
                                    <input
                                        type="number"
                                        name="payment"
                                        value={checkObject.payment}
                                        onChange={handleChange}
                                    />
                                </label>
                                {
                                    (type === "Карта") && (
                                        <label>
                                            <p>Карта</p>
                                            <input
                                                type="number"
                                                name="humo"
                                                value={formSaleData.humo}
                                                onChange={handleChange}
                                            />
                                        </label>
                                    )
                                }
                                <label>
                                    <p>К/Карта</p>
                                    <input
                                        type="number"
                                        name="card"
                                        value={card.amount}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    <p>Жами</p>
                                    <input
                                        type="number"
                                        name="total"
                                        value={checkObject.total}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className={styles.modal__sale__body__form__bottom}>

                                <div>
                                    <span>
                                        <p>Кешбек карта</p>
                                        <button onClick={() => handleDiscountCardSubmit()} type="button">
                                            <i className="fa-regular fa-credit-card"></i>
                                        </button>
                                    </span>
                                </div>
                                <span>
                                    <p>Чек чиқариш</p>
                                    <button type="submit" onClick={handlePrint}>
                                        <Image alt='' src={printer} />
                                    </button>
                                </span>
                                <span>
                                    {
                                        type === "Нақд" ? (<p>Нақд савдо</p>) : type === "Карта" ? (<p>Картага савдо</p>) : (<p>Насия савдо</p>)
                                    }
                                    <button type="submit">
                                        {
                                            type === "Нақд" ? (<i className="fa-solid fa-money-bill-1"></i>) : type === "Карта" ? (<i className="fa-regular fa-credit-card"></i>) : (<i className="fa-solid fa-hand-holding-heart"></i>)
                                        }
                                    </button>
                                </span>
                                <span>
                                    <p>Бекор қилиш</p>
                                    <button onClick={() => {
                                        closeSubmit()
                                    }} type="button">
                                        <i className="fa-solid fa-x"></i>
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className={`${styles.modal} ${modal ? styles.actModal : ""}`}>
                <div className={styles.modal__body}>
                    <p>Микдори</p>
                    <div className={styles.modal__body__header}>
                        <b>{addItem.name} TAB №{dataCheck}</b>
                        <b>{addItem.produced_location}</b>
                    </div>
                    <div className={styles.modal__body__center}>
                        <div className={styles.modal__body__center__left}>
                            <div className={styles.modal__body__center__left__top}>
                                <div className={styles.modal__body__center__left__top__left}>
                                    <span>
                                        <p>Серияси</p>
                                        <input
                                            type="text"
                                            name="series"
                                            value={addItem.serial_number}
                                            onChange={handleInputChange}
                                        />
                                    </span>
                                    <span>
                                        <p>Муддати</p>
                                        <input
                                            type="text"
                                            name="expiration"
                                            value={addItem.expiry_date}
                                            onChange={handleInputChange}
                                        />
                                    </span>
                                </div>
                                <span className={styles.modal__body__center__left__top__right}>
                                    <p>Нархи</p>
                                    <input
                                        type="text"
                                        name="price"
                                        value={addItem.sale_price}
                                        onChange={handleInputChange}
                                    />
                                </span>
                            </div>
                            <span className={styles.modal__body__center__left__bottom}>
                                <p>Қолдик</p>
                                <input
                                    type="text"
                                    name="quantity"
                                    value={addItem.box}
                                    onChange={handleInputChange}
                                />
                            </span>
                        </div>
                        <div className={styles.modal__body__center__right}>
                            <div className={styles.modal__body__center__right__left}>
                                <input
                                    type="text"
                                    name="additionalField3"
                                    value={formData.additionalField3}
                                    onChange={handleInputChange}
                                    placeholder='Dona'
                                />
                                <div>
                                    <input
                                        type="text"
                                        name="additionalField2"
                                        value={formData.additionalField2}
                                        onChange={handleInputChange}
                                        placeholder='Kaseta'
                                    />
                                    <input
                                        type="text"
                                        name="additionalField1"
                                        value={formData.additionalField1}
                                        onChange={handleInputChange}
                                        placeholder='Pachka'
                                    />
                                </div>
                            </div>
                            <div className={styles.modal__body__center__right__right}>
                                <input
                                    type="text"
                                    name="additionalField4"
                                    value={totalAmount}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.modal__body__footer}>
                        <div className={styles.modal__body__footer__top}>
                            <p>тасдиклаш</p>
                            <button onClick={() => {
                                handleSubmit()
                                setScanResult('')
                            }}>
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button onClick={() => {
                                setModal(false)
                                setScanResult("");
                                inputQrcodeRef.current.value = '';
                            }}>
                                <i className="fa-solid fa-x"></i>
                            </button>
                        </div>
                        <div className={styles.modal__body__footer__bottom}>
                            <b>{addItem.name}</b>
                            <div>
                                <span>{addItem.box}</span>
                                <span>{addItem.sale_price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.intro__top}>
                <p>
                    <i className="fa-regular fa-file-lines"></i>
                    Чек N{dataCheck}
                </p>
                {/* <Link href={'/login'}
                    onClick={() => {
                        setDe(!de)
                        setDataCheck(0)
                    }}
                >
                    <i className="fa-solid fa-file-arrow-up"></i>
                    Янги чек очиш
                </Link> */}
            </div>

            <input
                ref={inputQrcodeRef}
                type="text"
                style={{ opacity: 0, position: 'absolute' }}
                placeholder="Сканируйте QR-код здесь"
            />

            <div className={styles.intro__center}>
                <div className={styles.dataTable}>
                    <div className={styles.dataTable__table}>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Тўлиқ номи</th>
                                    <th>Миқдори</th>
                                    <th>Нархи</th>
                                    <th>Яроқлилик муддати</th>
                                    <th>Қадоқда</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataItems.map((item, key) => {
                                    const bgColor = getBackgroundColor(item.sale_product_items.expiry_date);
                                    return (
                                        <tr key={key} className={bgColor}>
                                            <td className={styles.icon__list}>
                                                <button
                                                    className={`${styles.icon__list__item} ${styles.red}`}
                                                    onClick={() => {
                                                        delOrder(item.id);
                                                    }}
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                            <td>{item.sale_product_items.name}</td>
                                            <td>
                                                <p>
                                                    {
                                                        (item.amount_of_box > 0) && (
                                                            `${(item.amount_of_box)?.toLocaleString('en-US').replace(/,/g, ' ')}-pachka `
                                                        )
                                                    }
                                                    {
                                                        (item.amount_of_package > 0) && (
                                                            `${(item.amount_of_package)?.toLocaleString('en-US').replace(/,/g, ' ')}-kaseta `
                                                        )
                                                    }
                                                    {
                                                        (item.amount_from_package > 0) && (
                                                            `${(item.amount_from_package)?.toLocaleString('en-US').replace(/,/g, ' ')}-dona`
                                                        )
                                                    }
                                                </p>
                                            </td>
                                            <td>{(item.total_sum)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                            <td>{item.sale_product_items.expiry_date}</td>
                                            <td>{(item.sale_product_items.amount_in_box)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.intro__center__right}>
                    <div className={styles.intro__center__right__list}>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Чек рақами:</p>
                            <b>{dataCheck}</b>
                        </div>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Бугунги сана:</p>
                            <b className={styles.date}>{formatDate(dateTime)}</b>
                        </div>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Тўловга:</p>
                            <b>{(checkObject.payment)?.toLocaleString('en-US').replace(/,/g, ' ')}</b>
                        </div>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Чегирма:</p>
                            <b>{checkObject.total_discount}</b>
                        </div>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Жами:</p>
                            <b>{(checkObject.total)?.toLocaleString('en-US').replace(/,/g, ' ')}</b>
                        </div>
                    </div>
                    <button onClick={() => {
                        setOrder([])
                        closeSubmit()
                    }} className={styles.intro__center__right__btn}>
                        <i className="fa-solid fa-xmark"></i>
                        Чекни ёпиш
                    </button>
                </div>
            </div>

            <div className={styles.intro__controls}>
                <span>Тўловга: <p>{(checkObject.payment)?.toLocaleString('en-US').replace(/,/g, ' ')}</p></span>
                <form onSubmit={handleSearchFilter} className={styles.intro__controls__search}>
                    <button type='submit'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder='Номи/Таркиби бўйича қидириш'
                        // value={search}
                        // onChange={handleSearchChange}
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                    <b>⌘ F</b>
                    {search && (
                        <p onClick={() => {
                            setSearch("");
                            setFilterText("")
                        }}>
                            <i className="fa-solid fa-x"></i>
                        </p>
                    )}
                </form>
            </div>

            <div className={styles.intro__bottom}>
                <div className={styles.dataTable}>
                    <div className={styles.dataTable__table}>

                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Тўлиқ номи</th>
                                    <th>Қолдиқ</th>
                                    <th>Нархи</th>
                                    <th>Иш.Чиқ</th>
                                    <th>Яроқлилик муддати</th>
                                    <th>Қадоқда</th>
                                    <th>Балл</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, key) => {
                                    const bgColor = getBackgroundColor(item.expiry_date);
                                    return (
                                        <tr key={key} className={bgColor}>
                                            <td className={styles.icon__list}>
                                                {order.includes(item) ? (
                                                    <button
                                                        className={`${styles.icon__list__item} ${styles.red}`}
                                                        onClick={() => delOrder(item.id)}
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                ) : (
                                                    <button
                                                        className={styles.icon__list__item}
                                                        onClick={() => {
                                                            setModal(true)
                                                            setAddItem(item)
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-plus"></i>
                                                    </button>
                                                )}
                                            </td>
                                            <td>{item.name}</td>
                                            <td>
                                                <p>
                                                    {
                                                        (item.boxes_left > 0) && `${(item.boxes_left)?.toLocaleString('en-US').replace(/,/g, ' ')}-pachka `
                                                    }
                                                    {
                                                        (item.packages_left > 0) && `${(item.packages_left)?.toLocaleString('en-US').replace(/,/g, ' ')}-kaseta `
                                                    }
                                                    {
                                                        (item.units_left > 0) && `${(item.units_left)?.toLocaleString('en-US').replace(/,/g, ' ')}-dona `
                                                    }
                                                </p>
                                            </td>
                                            <td>{(item.sale_price)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                            <td>{item.produced_location}</td>
                                            <td>{item.expiry_date}</td>
                                            <td>{(item.amount_in_box)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                            <td>{(item.score)?.toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        <div className={styles.dataTable__pagination}>
                            <button
                                className={styles.dataTable__pagination__btn}
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                <i className="fa-solid fa-angles-left"></i>
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    className={`${styles.dataTable__pagination__items} ${currentPage === page ? styles.act : ''}`}
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                className={styles.dataTable__pagination__btn}
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                <i className="fa-solid fa-angles-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Intro;
