import { useRouter } from 'next/navigation';

import { getAllEvents } from '@/utils/api';
import { EventList } from '@/components/Events/EventList';
import { EventsSearch } from '@/components/Events/EventsSearch';

export const metadata = {
    title: 'All Events',
    description: 'Find a lot of great events that allow you to evolve...'
};

async function AllEventsPage(props) {
    // const { events } = props;
    const events = await getAllEvents();

    return (
        <>
            <EventsSearch onSearch={undefined} />
            <EventList items={events} />
        </>
    );
}

// export async function getStaticProps() {
//   const events = await getAllEvents();

//   return {
//     props: {
//       events: events,
//     },
//     revalidate: 60
//   };
// }

export default AllEventsPage;
