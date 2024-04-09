import { getAllEvents } from '@/models/events';
import { EventList } from '@/components/Events/EventList';
import { EventsSearch } from '@/components/Events/EventsSearch';
import { Suspense } from 'react';

export const metadata = {
    title: 'All Events',
    description: 'Find a lot of great events that allow you to evolve...'
};

async function AllEventsPage() {
    const events = await getAllEvents();

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <EventsSearch onSearch={undefined} />
            <EventList items={events} />
        </Suspense>
    );
}

export default AllEventsPage;
