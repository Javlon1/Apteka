import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Intro.module.scss';
import { Context } from '@/app/components/ui/Context/Context';

const Intro = () => {
    const { checkNumber, setCheckNumber } = useContext(Context);


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
        </section>
    );
};

export default Intro;
