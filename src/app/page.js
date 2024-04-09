import { getFeaturedEvents } from '@/models/events';
import { EventList } from '@/components/Events/EventList';

export const metadata = {
    title: 'NextJS Events',
    description: 'Find a lot of great events that allow you to evolve...'
};

async function HomePage() {
    const events = await getFeaturedEvents();

    return <EventList items={events} />;
}

export default HomePage;
