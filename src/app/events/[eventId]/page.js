import Head from 'next/head';

import { getEventById /*, getFeaturedEvents */ } from '@/utils/api';
import { EventSummary } from '@/components/EventDetail/EventSummary';
import { EventLogistics } from '@/components/EventDetail/EventLogistics';
import { EventContent } from '@/components/EventDetail/EventContent';
import { Comments } from '@/components/Input/Comments';

async function EventDetailPage(props) {
    // TODO: make call through the real api
    // const event = props.selectedEvent;
    const event = await getEventById(props.params.eventId);

    // if (!event) {
    //     return (
    //         <div className='center'>
    //             <p>Loading...</p>
    //         </div>
    //     );
    // }

    return (
        <>
            <Head>
                <title>{event.title}</title>
                <meta name='description' content={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
        </>
    );
}

// export async function getStaticProps(context) {
//     const eventId = context.params.eventId;

//     const event = await getEventById(eventId);

//     return {
//         props: {
//             selectedEvent: event
//         },
//         revalidate: 30
//     };
// }

// export async function getStaticPaths() {
//     const events = await getFeaturedEvents();

//     const paths = events.map(event => ({ params: { eventId: event.id } }));

//     return {
//         paths: paths,
//         fallback: 'blocking'
//     };
// }

export default EventDetailPage;
