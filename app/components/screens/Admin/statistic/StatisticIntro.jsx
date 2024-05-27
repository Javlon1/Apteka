import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './StatisticIntro.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import PieChart from '@/app/components/ui/PieChart/PieChart';
import chart from "../../../../../public/img/chart.png"

const StatisticIntro = () => {
    const { lan } = React.useContext(Context);
    const [activeLeft, setActiveLeft] = React.useState('Статистика');
    const [activeRight, setActiveRight] = React.useState('Бугун');

    // Функции для левого списка
    const leftFunctions = [
        {
            label: 'Статистика',
            action: () => console.log('Функция для Статистики')
        },
        {
            label: 'Ҳисобот',
            action: () => console.log('Функция для Ҳисобота')
        },
        {
            label: 'Товар кирими',
            action: () => console.log('Функция для Товара кирими')
        },
        {
            label: 'Чакана савдо',
            action: () => console.log('Функция для Чакана савдо')
        },
        {
            label: 'Ишчилар',
            action: () => console.log('Функция для Ишчилара')
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

    const data = [30, 30, 30];
    const colors = ['#FF3A29', '#4339F2', '#FFB200',];

    return (
        <section className={styles.statisticIntro}>

            <div className={styles.statisticIntro__header}>
                <div className={styles.statisticIntro__header__left}>
                    <ul className={styles.statisticIntro__header__left__list}>
                        {leftFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.statisticIntro__header__left__list__item} ${activeLeft === label ? styles.act : ''}`}
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
                <div className={styles.statisticIntro__header__right}>
                    <ul className={styles.statisticIntro__header__right__list}>
                        {rightFunctions.map(({ label, action }) => (
                            <li
                                key={label}
                                className={`${styles.statisticIntro__header__right__list__item} ${activeRight === label ? styles.act : ''}`}
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

            <div className={styles.statisticIntro__body}>
                <div className={styles.statisticIntro__body__left}>
                    <div className={styles.statisticIntro__body__left__top}>
                        <div className={styles.statisticIntro__body__left__top__chart}>
                            <p className={styles.name}>Аптекада</p>
                            <b>65,123,376</b>
                            <p>+5%</p>
                            <Image
                                src={chart}
                                alt='Chart'
                                priority
                            />
                        </div>
                        <div className={styles.statisticIntro__body__left__top__chart}>
                            <p className={styles.name}>Соф фойда</p>
                            <b>15,123,376</b>
                            <p>+8%</p>
                            <Image
                                src={chart}
                                alt='Chart'
                                priority
                            />
                        </div>
                        <div className={styles.statisticIntro__body__left__top__chart}>
                            <p className={styles.name}>Сотувлар</p>
                            <b>3,376</b>
                            <p>+1%</p>
                            <Image
                                src={chart}
                                alt='Chart'
                                priority
                            />
                        </div>
                        <div className={styles.statisticIntro__body__left__top__chart}>
                            <p className={styles.name}>Ишчилар маоши</p>
                            <b>8.200.000</b>
                            <p>+1%</p>
                            <Image
                                src={chart}
                                alt='Chart'
                                priority
                            />
                        </div>
                    </div>
                    <div className={styles.statisticIntro__body__left__bottom}>
                        <div className={styles.statisticIntro__body__left__bottom__header}>
                            <p>Аптекада</p>
                            <ul>
                                <li>
                                    <b></b>
                                    <p>Чиқим</p>
                                </li>
                                <li>
                                    <b></b>
                                    <p>Кирим</p>
                                </li>
                                <li>
                                    <b></b>
                                    <p>Фойда</p>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.chart}>
                            <PieChart data={data} colors={colors} />
                            <p>Аптекада мавжуд молия диаграммаси</p>
                        </div>
                    </div>
                </div>
                <div className={styles.statisticIntro__body__right}>
                    <div className={styles.statisticIntro__body__right__top}></div>
                    <div className={styles.statisticIntro__body__right__bottom}></div>
                </div>
            </div>
        </section>
    )
}

export default StatisticIntro;