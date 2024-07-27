import * as React from 'react';
import Image from 'next/image';
import styles from './AddProduct.module.scss';
import { Context } from '@/app/components/ui/Context/Context';
import { useRouter } from 'next/router';
import Clipboard from '../../../../../public/img/Clipboard.png';

const AddProduct = () => {
    const { url, auth_token } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Товар кирими');
    const [dataType, setDataType] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [scanResult, setScanResult] = React.useState('');
    const inputQrcodeRef = React.useRef(null);

    React.useEffect(() => {
        const handleScan = (event) => {
            if (event.target === inputQrcodeRef.current) {
                setScanResult(event.target.value);
            }
        };

        document.addEventListener('input', handleScan);

        if (inputQrcodeRef.current) {
            inputQrcodeRef.current.focus();
        }

        return () => {
            document.removeEventListener('input', handleScan);
        };
    }, []);

    React.useEffect(() => {
        setFormData(prevState => ({ ...prevState, barcode: scanResult }));
    }, [scanResult]);

    const router = useRouter();

    const leftFunctions = [
        { label: 'Статистика', action: () => router.push('/statistic') },
        { label: 'Ҳисобот', action: () => router.push('/report') },
        { label: 'Товар кирими', action: () => router.push('/product') },
        { label: 'Чакана савдо', action: () => router.push('/chakana-savdo') },
        { label: 'Ишчилар', action: () => router.push('/workers') },
        { label: 'Созламалар', action: () => router.push('/settings') }
    ];

    const [formData, setFormData] = React.useState({
        productName: '',
        productType: '',
        barcode: scanResult,
        quantity: '',
        boxes: '',
        items: '',
        basePrice: '',
        salePrice: '',
        margin: '',
        salePricePercentage: '',
        discount: '',
        discountPrice: '',
        labeling: '',
        amount: '',
        madeIn: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };

        if (name === 'basePrice' || name === 'margin') {
            const basePrice = parseFloat(updatedFormData.basePrice) || 0;
            const margin = parseFloat(updatedFormData.margin) || 0;
            const salePrice = basePrice * (1 + margin / 100);
            updatedFormData.salePrice = salePrice.toFixed(2);
            updatedFormData.salePricePercentage = margin.toFixed(2);
        } else if (name === 'salePrice') {
            const basePrice = parseFloat(formData.basePrice) || 0;
            const salePrice = parseFloat(value) || 0;
            const margin = ((salePrice - basePrice) / basePrice) * 100;
            updatedFormData.margin = margin.toFixed(2);
            updatedFormData.salePricePercentage = margin.toFixed(2);
        } else if (name === 'salePricePercentage') {
            const basePrice = parseFloat(formData.basePrice) || 0;
            const margin = parseFloat(value) || 0;
            const salePrice = basePrice * (1 + margin / 100);
            updatedFormData.salePrice = salePrice.toFixed(2);
            updatedFormData.margin = margin.toFixed(2);
        }

        setFormData(updatedFormData);
    };

    React.useEffect(() => {
        const fullUrl = `${url}/admin/category/`;

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
                    setDataType(data);
                } else {
                    console.error('Ошибка: Некорректные данные получены от сервера.');
                }

            } catch (error) {
                console.error('Ошибка при запросе данных:', error.message);
            }
        };

        fetchData();
    }, [url, auth_token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        const fullUrl = `${url}/admin/product/create/`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`,
                },
                body: JSON.stringify({
                    name: formData.productName,
                    type_id: parseInt(formData.productType, 10),
                    serial_number: formData.barcode,
                    box: parseInt(formData.quantity, 10),
                    amount_in_box: parseInt(formData.boxes, 10),
                    amount_in_package: parseInt(formData.items, 10),
                    base_price: parseFloat(formData.basePrice),
                    sale_price: parseFloat(formData.salePrice),
                    extra_price_in_percent: parseInt(formData.margin, 10),
                    sale_price_in_percent: parseInt(formData.salePricePercentage, 10),
                    expiry_date: formData.discount,
                    discount_price: parseFloat(formData.discountPrice),
                    score: parseInt(formData.labeling, 10),
                    overall_price: parseFloat(formData.amount),
                    produced_location: formData.madeIn,
                }),
            });

            const data = await response.json();
            if (data.success === "success") {
                setFormData({
                    productName: '',
                    productType: '',
                    barcode: '',
                    quantity: '',
                    boxes: '',
                    items: '',
                    basePrice: '',
                    salePrice: '',
                    margin: '',
                    salePricePercentage: '',
                    discount: '',
                    discountPrice: '',
                    labeling: '',
                    amount: '',
                    madeIn: ""
                });
                setScanResult("");
            } else {
                console.error('Ошибка: ', data);
            }
        } catch (error) {
            console.error('Ошибка при запросе данных:', error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <section className={styles.addProduct}>
            <div className={styles.addProduct__header}>
                <div className={styles.addProduct__header__left}>
                    <ul className={styles.addProduct__header__left__list}>
                        {leftFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.addProduct__header__left__list__item} ${activeLeft === label ? styles.act : ''}`}
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
            <div className={styles.addProduct__center}>
                <form className={styles.addProduct__center__form} onSubmit={handleSubmit}>
                    <div className={styles.addProduct__center__form__top}>
                        <input
                            className={styles.addProduct__center__form__top__inp}
                            type="text"
                            placeholder="Махсулот номи"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                        />
                        <div className={styles.addProduct__center__form__top__f}>
                            <Image width={40} height={40} src={Clipboard} alt="img" />
                            <label htmlFor="productType">
                                <p>Махсулот тури</p>
                                <select
                                    name="productType"
                                    id="productType"
                                    value={formData.productType}
                                    onChange={handleChange}
                                    required
                                >
                                    {
                                        dataType?.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </label>
                        </div>
                        <div className={styles.addProduct__center__form__top__list}>
                            <div className={styles.addProduct__center__form__top__list__item2}>
                                <label htmlFor="barcode">
                                    <p>Штрих коди</p>
                                    <input
                                        ref={inputQrcodeRef}
                                        type="text"
                                        placeholder={`QR-Code Сканерлаш`}
                                        value={scanResult}
                                        onChange={(e) => setScanResult(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className={styles.addProduct__center__form__top__list__item2}>
                                <label htmlFor="quantity">
                                    <p>Сони</p>
                                    <input
                                        name="quantity"
                                        placeholder="Қутилар сони"
                                        type="text"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <input
                                    name="boxes"
                                    placeholder="Қутида қадоқлар сони"
                                    type="text"
                                    value={formData.boxes}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="items"
                                    placeholder="Қадоқда доналар"
                                    type="text"
                                    value={formData.items}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.addProduct__center__form__top__list__item3}>
                                <label htmlFor="basePrice">
                                    <p>Базoвий нарх</p>
                                    <input
                                        name="basePrice"
                                        type="text"
                                        value={formData.basePrice}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label htmlFor="salePrice">
                                    <p>Сотув нархи</p>
                                    <input
                                        name="salePrice"
                                        type="text"
                                        value={formData.salePrice}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label htmlFor="margin">
                                    <p>Фоиз устама (%)</p>
                                    <input
                                        name="margin"
                                        type="text"
                                        value={formData.margin}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label htmlFor="salePricePercentage">
                                    <p>Сотув нархи (%)</p>
                                    <input
                                        name="salePricePercentage"
                                        type="text"
                                        value={formData.salePricePercentage}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label htmlFor="discount">
                                    <p>Я/Муддати</p>
                                    <input
                                        name="discount"
                                        type="date"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label htmlFor="discountPrice">
                                    <p>Чегирма нархи</p>
                                    <input
                                        name="discountPrice"
                                        type="text"
                                        value={formData.discountPrice}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.addProduct__center__form__bottom}>
                        <b className={styles.addProduct__center__form__bottom__title}>Чакана савдo</b>
                        <div className={styles.addProduct__center__form__bottom__list}>
                            <label htmlFor="labeling">
                                <p>Балл</p>
                                <input
                                    name="labeling"
                                    type="text"
                                    value={formData.labeling}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label htmlFor="amount">
                                <p>Сумма</p>
                                <input
                                    name="amount"
                                    type="text"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label htmlFor="madeIn">
                                <p>Ишлаб чикарилган жойи</p>
                                <input
                                    name="madeIn"
                                    type="text"
                                    value={formData.madeIn}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.addProduct__center__form__bottom__btn}>
                            <b onClick={() => setFormData({
                                productName: '',
                                productType: '',
                                barcode: '',
                                quantity: '',
                                boxes: '',
                                items: '',
                                basePrice: '',
                                salePrice: '',
                                margin: '',
                                salePricePercentage: '',
                                discount: '',
                                discountPrice: '',
                                labeling: '',
                                amount: '',
                                madeIn: ''
                            })}>
                                <i className="fa-regular fa-trash-can"></i>
                                Тозалаш
                            </b>
                            {
                                loader ? (
                                    <b className={styles.btn}>
                                        <div className={styles.loader}></div>
                                    </b>
                                ) : (
                                    <button type="submit">
                                        <i className="fa-solid fa-file-medical"></i>
                                        Сақлаш
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddProduct;
