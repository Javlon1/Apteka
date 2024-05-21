import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Intro.module.scss';
import { Context } from '@/app/components/ui/Context/Context';
const data = [
    {
        id: 1,
        name: 'Item 1',
        type: 'Type 1',
        unit: 'Unit 1',
        quantity: 100,
        category: 'Category 1',
        warehouse: 'Warehouse 1',
        maxQuantity: 200,
    },
    {
        id: 2,
        name: 'Item 2',
        type: 'Type 2',
        unit: 'Unit 2',
        quantity: 150,
        category: 'Category 2',
        warehouse: 'Warehouse 2',
        maxQuantity: 300,
    },
    {
        id: 3,
        name: 'Item 3',
        type: 'Type 1',
        unit: 'Unit 3',
        quantity: 200,
        category: 'Category 3',
        warehouse: 'Warehouse 3',
        maxQuantity: 250,
    },
    {
        id: 4,
        name: 'Item 4',
        type: 'Type 3',
        unit: 'Unit 4',
        quantity: 120,
        category: 'Category 1',
        warehouse: 'Warehouse 1',
        maxQuantity: 220,
    },
    {
        id: 5,
        name: 'Item 5',
        type: 'Type 2',
        unit: 'Unit 5',
        quantity: 130,
        category: 'Category 2',
        warehouse: 'Warehouse 2',
        maxQuantity: 180,
    },
    {
        id: 6,
        name: 'Item 6',
        type: 'Type 3',
        unit: 'Unit 6',
        quantity: 160,
        category: 'Category 3',
        warehouse: 'Warehouse 3',
        maxQuantity: 190,
    },
    {
        id: 7,
        name: 'Item 7',
        type: 'Type 1',
        unit: 'Unit 7',
        quantity: 110,
        category: 'Category 1',
        warehouse: 'Warehouse 1',
        maxQuantity: 210,
    },
    {
        id: 8,
        name: 'Item 8',
        type: 'Type 2',
        unit: 'Unit 8',
        quantity: 140,
        category: 'Category 2',
        warehouse: 'Warehouse 2',
        maxQuantity: 230,
    },
    {
        id: 9,
        name: 'Item 9',
        type: 'Type 3',
        unit: 'Unit 9',
        quantity: 170,
        category: 'Category 3',
        warehouse: 'Warehouse 3',
        maxQuantity: 240,
    },
    {
        id: 10,
        name: 'Item 10',
        type: 'Type 1',
        unit: 'Unit 10',
        quantity: 190,
        category: 'Category 1',
        warehouse: 'Warehouse 1',
        maxQuantity: 260,
    },
    {
        id: 11,
        name: 'Item 11',
        type: 'Type 2',
        unit: 'Unit 11',
        quantity: 180,
        category: 'Category 2',
        warehouse: 'Warehouse 2',
        maxQuantity: 270,
    },
];

const Intro = () => {
    const { checkNumber, setCheckNumber } = useContext(Context);
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState('');
    const [filterType, setFilterType] = useState('');

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const filteredData = data.filter((item) => {
        const matchesFilterText = JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase());
        const matchesFilterType = filterType === '' || item.type.toLowerCase() === filterType.toLowerCase();

        return matchesFilterText && matchesFilterType;
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

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    const handleTypeFilterChange = (e) => {
        setFilterType(e.target.value);
        setCurrentPage(1);
    };


    const formatDate = (date) => {
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <section className={styles.intro}>
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
                                    <th>Тўлиқ номи</th>
                                    <th>Қолдиқ</th>
                                    <th>Нархи</th>
                                    <th>Яроқлилик муддати</th>
                                    <th>Қадоқда</th>
                                    <th>Балл</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, key) => (
                                    <tr key={key} className={key % 2 === 0 ? styles.tableBc : ""}>
                                        <td className={styles.name}>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.category}</td>
                                        <td>{item.warehouse}</td>
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
                            <b>{formatDate(dateTime)}</b>
                        </div>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Тўловга:</p>
                            <b>23.000</b>
                        </div>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Чегирма:</p>
                            <b>0.0</b>
                        </div>
                        <div className={styles.intro__center__right__list__item}>
                            <p>Жами:</p>
                            <b>23.000</b>
                        </div>
                    </div>
                    <button className={styles.intro__center__right__btn}>
                        <i className="fa-solid fa-xmark"></i>
                        Чекни ёпиш
                    </button>
                </div>
            </div>

            <div className={styles.intro__bottom}>
                <div className={styles.dataTable}>
                    <div className={styles.dataTable__table}>
                        <div className={styles.dataTable__table__controls}>
                            <label className={styles.dataTable__table__controls__search}>
                                <p>Search:</p>
                                <input
                                    type="search"
                                    placeholder
                                    value={filterText}
                                    onChange={handleFilterChange}
                                />
                            </label>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Тўлиқ номи</th>
                                    <th>Қолдиқ</th>
                                    <th>Нархи</th>
                                    <th>Яроқлилик муддати</th>
                                    <th>Қадоқда</th>
                                    <th>Балл</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, key) => (
                                    <tr key={key} className={key % 2 === 0 ? styles.tableBc : ""}>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.category}</td>
                                        <td>{item.warehouse}</td>
                                        <td className={styles.icon__list}>
                                            <button
                                                className={styles.icon__list__item}
                                            >
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
