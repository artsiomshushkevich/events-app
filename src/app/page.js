import { getFeaturedEvents } from '@/utils/api';
import { EventList } from '@/components/Events/EventList';
import { NewsletterRegistration } from '@/components/Input/NewsletterRegistration';

export const metadata = {
    title: 'NextJS Events',
    description: 'Find a lot of great events that allow you to evolve...'
};

function HomePage(props) {
    // TODO: replace with api
    const events = getFeaturedEvents();

    return (
        <>
            <NewsletterRegistration />
            <EventList items={events} />
        </>
    );
}

// export async function getStaticProps() {
//     const featuredEvents = await getFeaturedEvents();

//     return {
//         props: {
//             events: featuredEvents
//         },
//         revalidate: 1800
//     };
// }

export default HomePage;
