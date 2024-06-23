import * as React from 'react';
import Image from 'next/image'
import styles from './AddProduct.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import { useRouter } from 'next/router';
import Clipboard from '../../../../../public/img/Clipboard.png';

const AddProduct = () => {
    const { url, auth_token } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Товар кирими');
    const [dataType, setDataType] = React.useState([]);

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

    const [formData, setFormData] = React.useState({
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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    ///// get shifts Start
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
                    setDataType(data)
                } else {
                    console.error('Ошибка: Некорректные данные получены от сервера.');
                }

            } catch (error) {
                console.error('Ошибка при запросе данных:', error.message);
            }
        };

        fetchData();
    }, []);
    ///// get shifts End

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                    type_id: parseInt(formData.productType),
                    serial_number: formData.barcode,
                    box: parseInt(formData.quantity),
                    amount_in_box: parseInt(formData.boxes),
                    amount_in_package: parseInt(formData.items),
                    base_price: parseFloat(formData.basePrice),
                    sale_price: parseFloat(formData.salePrice),
                    extra_price_in_percent: parseInt(formData.margin),
                    sale_price_in_percent: parseInt(formData.salePricePercentage),
                    expiry_date: formData.discount,
                    discount_price: parseFloat(formData.discountPrice),
                    score: parseInt(formData.labeling),
                    overall_price: parseFloat(formData.amount),
                    produced_location: formData.madeIn,
                }),
            });

            const data = await response.json();
            

            if (data.message) {
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
                })
            }
        } catch (error) {
            console.error('Error during POST request:', error);
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
                            placeholder="Product Name"
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
                            <div className={styles.addProduct__center__form__top__list__item1}>
                                <label htmlFor="barcode">
                                    <p>Штрих коди</p>
                                    <select
                                        name="barcode"
                                        id="barcode"
                                        value={formData.barcode}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Barcode</option>
                                        <option value="barcode1">Barcode 1</option>
                                        <option value="barcode2">Barcode 2</option>
                                    </select>
                                </label>
                                <b>
                                    <i className="fa-solid fa-qrcode"></i>
                                    Сканерлаш
                                </b>
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
                        <b className={styles.addProduct__center__form__bottom__title}>чакана савдo</b>
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
                                <p>ишлаб чикарилган жойи</p>
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
                            <button type="submit">
                                <i className="fa-solid fa-file-medical"></i>
                                Сақлаш
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </section>
    )
}

export default AddProduct;