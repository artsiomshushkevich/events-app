import { Button } from '../UI/Button';
import classes from './ResultsTitle.module.css';

export const ResultsTitle = props => {
    const { date } = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <section className={classes.title}>
            <h1>Events in {humanReadableDate}</h1>
            <Button link='/events'>Show all events</Button>
        </section>
    );
};
