import { /* useEffect, */ useState } from 'react';
// import { useRouter } from 'next/router';
// import useSWR from 'swr';
import Head from 'next/head';

import { getAllEvents, getFilteredEvents } from '@/utils/api';
import { EventList } from '@/components/Events/EventList';
import { ResultsTitle } from '@/components/Events/ResultsTitle';
import { Button } from '@/components/UI/Button';
import { ErrorAlert } from '@/components/UI/ErrorAlert';

function FilteredEventsPage(props) {
    // const [loadedEvents, setLoadedEvents] = useState(getAllEvents());
    const loadedEvents = getAllEvents();
    // const router = useRouter();

    console.log('*******');
    const filterData = props.params.slug;

    // const { data, error } = useSWR(
    //     'https://nextjs-course-c81cc-default-rtdb.firebaseio.com/events.json',
    //     url => fetch(url).then(res => res.json())
    // );

    // useEffect(() => {
    //     if (data) {
    //         const events = [];

    //         for (const key in data) {
    //             events.push({
    //                 id: key,
    //                 ...data[key]
    //             });
    //         }

    //         setLoadedEvents(events);
    //     }
    // }, [data]);

    let pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content={`A list of filtered events.`} />
        </Head>
    );

    if (!loadedEvents) {
        return (
            <>
                {pageHeadData}
                <p className='center'>Loading...</p>
            </>
        );
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content={`All events for ${numMonth}/${numYear}.`} />
        </Head>
    );

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12 ||
        error
    ) {
        return (
            <>
                {pageHeadData}
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = loadedEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                {pageHeadData}
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
            {pageHeadData}
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
