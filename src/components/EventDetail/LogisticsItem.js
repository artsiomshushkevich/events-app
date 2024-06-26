import classes from './LogisticsItem.module.css';

export const LogisticsItem = props => {
    const { icon: Icon } = props;

    return (
        <li className={classes.item}>
            <span className={classes.icon}>
                <Icon />
            </span>
            <span className={classes.content}>{props.children}</span>
        </li>
    );
};
