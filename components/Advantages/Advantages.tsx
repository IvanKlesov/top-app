import { AdvantagesProps } from './Advantages.props';
import React from "react";
import CheckIcon from './check.svg';
import styles from './Advantages.module.css';

export const Advantages = ({advatages}: AdvantagesProps): JSX.Element => {
    return (
        <>
            {advatages.map(a => (
                <div key={a._id} className={styles.advatage}>
                    <CheckIcon />
                    <div className={styles.title}>
                        {a.title}
                    </div>                    
                    <hr className={styles.vline} />
                    <div className={styles.description}>
                        {a.description}
                    </div>                   

                </div>
            ))}
        </>
    );
};