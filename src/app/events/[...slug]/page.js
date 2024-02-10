import { getFilteredEvents } from '@/utils/api';
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

function FilteredEventsPage(props) {
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

    const filteredEvents = getFilteredEvents(numYear, numMonth).filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });

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
        <>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
