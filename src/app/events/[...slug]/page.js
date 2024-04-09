import { Suspense } from 'react';
import { getFilteredEvents } from '@/models/events';
import { EventList } from '@/components/Events/EventList';
import { ResultsTitle } from '@/components/Events/ResultsTitle';
import { Button } from '@/components/UI/Button';
import { ErrorAlert } from '@/components/UI/ErrorAlert';

const getMonthAndYearFromSlug = slug => ({
    numYear: +slug[0],
    numMonth: +slug[1]
});

export const generateMetadata = ({ params }) => {
    const { numYear, numMonth } = getMonthAndYearFromSlug(params.slug);

    return {
        title: 'Filtered Events',
        description: `All events for ${numMonth}/${numYear}.`
    };
};

async function FilteredEventsPage(props) {
    const { numYear, numMonth } = getMonthAndYearFromSlug(props.params.slug);

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return (
            <>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = await getFilteredEvents(numYear, numMonth);

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Suspense>
    );
}

export default FilteredEventsPage;
