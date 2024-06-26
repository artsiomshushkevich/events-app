import Link from 'next/link';

import classes from './Button.module.css';

export const Button = props => {
    if (props.link) {
        return (
            <Link href={props.link} className={classes.btn}>
                {props.children}
            </Link>
        );
    }

    return (
        <button className={classes.btn} disabled={props.disabled} onClick={props.onClick}>
            {props.children}
        </button>
    );
};
