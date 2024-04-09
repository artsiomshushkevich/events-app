import { Suspense } from 'react';
import Head from 'next/head';
import { getEventById } from '@/models/events';
import { EventSummary } from '@/components/EventDetail/EventSummary';
import { EventLogistics } from '@/components/EventDetail/EventLogistics';
import { EventContent } from '@/components/EventDetail/EventContent';
import { Comments } from '@/components/Input/Comments';

async function EventDetailPage(props) {
    const event = await getEventById(props.params.eventId);

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
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
        </Suspense>
    );
}

export default EventDetailPage;
