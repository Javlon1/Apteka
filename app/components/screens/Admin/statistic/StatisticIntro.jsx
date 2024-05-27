import * as React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from './StatisticIntro.module.scss'
import { Context } from '@/app/components/ui/Context/Context';


const StatisticIntro = () => {
    const { lan } = React.useContext(Context);

    return (
        <section className={styles.statisticIntro}>
            <h1>StatisticIntro</h1>
        </section>
    )
}

export default StatisticIntro;