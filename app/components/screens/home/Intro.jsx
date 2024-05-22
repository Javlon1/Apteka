import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Intro.module.scss';
import { Context } from '@/app/components/ui/Context/Context';

const data = [
    {
        id: 1,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "20.04.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 2,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "21.04.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 3,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "22.04.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 4,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "23.04.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 5,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "24.04.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 6,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "25.04.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 7,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "26.04.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 8,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "27.04.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 9,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "28.04.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 10,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "29.04.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 11,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "30.04.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 12,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "01.05.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 13,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "02.05.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 14,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "03.05.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 15,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "04.05.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 16,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "05.05.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 17,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "06.05.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 18,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "07.05.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 19,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "08.05.2026",
        in_box: 20,
        ball: 2000
    },
    {
        id: 20,
        name: 'BROMGEKSIN BERLIN HEMI GERMANIYA 100mg',
        quantity: 20,
        price: 23000,
        made_in: "Узбекистан",
        expiration: "09.05.2026",
        in_box: 20,
        ball: 2000
    }
]

const Intro = () => {
    const { checkNumber, setCheckNumber, order, setOrder } = useContext(Context);
    const [dateTime, setDateTime] = useState(new Date());
    const [modal, setModal] = useState(false)


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
    const [itemsPerPage, setItemsPerPage] = useState(10);
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
        console.log(`ok-${search}`);

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

    const addOrder = (item) => {
        const newOrder = [...new Set([...order, item])];
        setOrder(newOrder);
    };

    const delOrder = (id) => {
        const newOrder = order.filter(item => item.id !== id);
        setOrder(newOrder);
    };

    useEffect(() => {
        const total = order.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(total);
    }, [order]);
    // Order End



    return (
        <section className={styles.intro}>
            <div
                className={`${styles.modalOpacity} ${modal ? styles.actModal : ""}`}
                onClick={() => {
                    setModal(false)
                }}
            ></div>

            <div className={`${styles.modal} ${modal ? styles.actModal : ""}`}>
                <div className={styles.modal__body}>
                    <p>Микдори</p>
                    <div className={styles.modal__body__header}>
                        <b>BROMGEKSIN-8 BERLIN -XEMI 8MG TAB №25</b>
                        <b>BERLIN - XEMI, GERMANIYA</b>
                    </div>
                    <div className={styles.modal__body__center}>
                        <div>
                            <div>
                                <div>
                                    <span>
                                        <p>Серияси</p>
                                        <input type="text" />
                                    </span>
                                    <span>
                                        <p>Муддати</p>
                                        <input type="text" />
                                    </span>
                                </div>
                                <span>
                                    <p>Нархи</p>
                                    <input type="text" />
                                </span>
                            </div>
                            <span>
                                <p>ҚолдиҚ</p>
                                <input type="text" />
                            </span>
                        </div>
                        <div>
                            <div>
                                <input type="text" />
                                <div>
                                    <input type="text" />
                                    <input type="text" />
                                </div>
                            </div>
                            <div>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.modal__body__footer}>
                        <div>
                            <p>тасдиҚлаш</p>
                            <button onClick={() => { }}>
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button>
                                <i className="fa-solid fa-x"></i>
                            </button>
                        </div>
                        <div>
                            <b>BERLIN- XEMI GERMANIYA</b>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.intro__top}>
                <p>
                    <i className="fa-regular fa-file-lines"></i>
                    Чек N{checkNumber}
                </p>
                <Link href={'/'} target='_blank'>
                    <i className="fa-solid fa-file-arrow-up"></i>
                    Янги чек очиш
                </Link>
            </div>

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
                                {order.map((item, key) => (
                                    <tr key={key} className={key % 2 === 0 ? styles.tableBc : ""}>
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
                                        <td>{item.name}</td>
                                        <td>{(item.quantity).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                        <td>{(item.price).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                        <td>{item.expiration}</td>
                                        <td>{(item.in_box).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.intro__center__right}>
                    <div className={styles.intro__center__right__list}>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Чек рақами:</p>
                            <b>{checkNumber}</b>
                        </div>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Бугунги сана:</p>
                            <b className={styles.date}>{formatDate(dateTime)}</b>
                        </div>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Тўловга:</p>
                            <b>{(totalPrice).toLocaleString('en-US').replace(/,/g, ' ')}</b>
                        </div>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Чегирма:</p>
                            <b>0.0</b>
                        </div>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Жами:</p>
                            <b>{(totalPrice).toLocaleString('en-US').replace(/,/g, ' ')}</b>
                        </div>
                    </div>
                    <button onClick={() => { setOrder([]) }} className={styles.intro__center__right__btn}>
                        <i className="fa-solid fa-xmark"></i>
                        Чекни ёпиш
                    </button>
                </div>
            </div>

            <div className={styles.intro__controls}>
                <span>Тўловга: <p>{(totalPrice).toLocaleString('en-US').replace(/,/g, ' ')}</p></span>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, key) => (
                                    <tr key={key} className={order.includes(item) ? styles.green : key % 2 === 0 ? styles.tableBc : ""}>
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
                                                        addOrder(item)
                                                    }}
                                                >
                                                    <i className="fa-solid fa-plus"></i>
                                                </button>
                                            )}
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{(item.quantity).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                        <td>{(item.price).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                        <td>{item.made_in}</td>
                                        <td>{item.expiration}</td>
                                        <td>{(item.in_box).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                        <td>{(item.ball).toLocaleString('en-US').replace(/,/g, ' ')}</td>
                                        <td className={styles.icon__list}>
                                            <button className={styles.icon__list__item}>
                                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
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
