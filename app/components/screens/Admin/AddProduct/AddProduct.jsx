import * as React from 'react';
import Image from 'next/image'
import styles from './AddProduct.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import { useRouter } from 'next/router';
import Clipboard from '../../../../../public/img/Clipboard.png';

const AddProduct = () => {
    const { lan } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Товар кирими');

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
        vatRate: '',
        vatPrice: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
                                >
                                    <option value="">Select Type</option>
                                    <option value="type1">Type 1</option>
                                    <option value="type2">Type 2</option>
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
                                    />
                                </label>
                                <input
                                    name="boxes"
                                    placeholder="Қутида қадоқлар сони"
                                    type="text"
                                    value={formData.boxes}
                                    onChange={handleChange}
                                />
                                <input
                                    name="items"
                                    placeholder="Қадоқда доналар"
                                    type="text"
                                    value={formData.items}
                                    onChange={handleChange}
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
                                    />
                                </label>
                                <label htmlFor="salePrice">
                                    <p>Сотув нархи</p>
                                    <input
                                        name="salePrice"
                                        type="text"
                                        value={formData.salePrice}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label htmlFor="margin">
                                    <p>Фоиз устама (%)</p>
                                    <input
                                        name="margin"
                                        type="text"
                                        value={formData.margin}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label htmlFor="salePricePercentage">
                                    <p>Сотув нархи (%)</p>
                                    <input
                                        name="salePricePercentage"
                                        type="text"
                                        value={formData.salePricePercentage}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label htmlFor="discount">
                                    <p>Чегирма (%)</p>
                                    <input
                                        name="discount"
                                        type="text"
                                        value={formData.discount}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label htmlFor="discountPrice">
                                    <p>Чегирма нархи</p>
                                    <input
                                        name="discountPrice"
                                        type="text"
                                        value={formData.discountPrice}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.addProduct__center__form__bottom}>
                        <b className={styles.addProduct__center__form__bottom__title}>чакана савдo</b>
                        <div className={styles.addProduct__center__form__bottom__list}>
                            <label htmlFor="labeling">
                                <p>Бегилаш</p>
                                <input
                                    name="labeling"
                                    type="text"
                                    value={formData.labeling}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="amount">
                                <p>Сумма</p>
                                <input
                                    name="amount"
                                    type="text"
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="vatRate">
                                <p>НДС ставкаси</p>
                                <input
                                    name="vatRate"
                                    type="text"
                                    value={formData.vatRate}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="vatPrice">
                                <p>НДС Нархи</p>
                                <input
                                    name="vatPrice"
                                    type="text"
                                    value={formData.vatPrice}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className={styles.addProduct__center__form__bottom__btn}>
                            <b>
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