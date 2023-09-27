import React from 'react';
import './events.css';
import EventSideMenu from './EventSideMenu';
import EventCard from './EventCard';
import EventDetails from './EventDetails';

const eventData = [
  {
    id: 1,
    title: 'Event 1',
    date: 'September 30, 2023',
    price: '$10',
    location: 'On Campus',
    thumbnail: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg', // Replace with image URL
    description: 'Party at hovseps house',
    images: [
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      'https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154643.jpg',
      'https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/main_image_star-forming_region_carina_nircam_final-1280.jpg',
    ],
  },
  {
    id: 2,
    title: 'Event 2',
    date: 'October 15, 2023',
    price: '$15',
    location: 'Off Campus',
    thumbnail: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    description: 'by hovsep(and friends)',
    images: [
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      'https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154643.jpg',
      'https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/main_image_star-forming_region_carina_nircam_final-1280.jpg',
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
    ],
  },
  {
    id: 3,
    title: 'Event 3',
    date: 'October 25, 2023',
    price: '$45',
    location: 'Off Campus',
    thumbnail: 'https://via.placeholder.com/100', // Replace with image URL
    description: 'daryana',
    images: [
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
    ],
  },
  {
    id: 4,
    title: 'Event 4',
    date: 'October 25, 2023',
    price: '$45',
    location: 'Off Campus',
    thumbnail: 'https://via.placeholder.com/100', // Replace with image URL
    description: 'Party at hovseps house',
    images: [
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
    ],
  },
  {
    id: 5,
    title: 'Event 5',
    date: 'October 25, 2023',
    price: '$45',
    location: 'Off Campus',
    thumbnail: 'https://via.placeholder.com/100', // Replace with image URL
    description: 'Party at hovseps house',
    images: [
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
    ],
  },
  {
    id: 6,
    title: 'Event 6',
    date: 'October 25, 2023',
    price: '$45',
    location: 'Off Campus',
    thumbnail: 'https://via.placeholder.com/100', // Replace with image URL
    description: 'Party at hovseps house',
    images: [
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
    ],
  },
  {
    id: 7,
    title: 'Event 7',
    date: 'October 25, 2023',
    price: '$45',
    location: 'Off Campus',
    thumbnail: 'https://via.placeholder.com/100', // Replace with image URL
    description: 'Party at hovseps house',
    images: [
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/200',
    ],
  },
];


function Events() {
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="events-page">
      <EventSideMenu />
      <div className="events-container">
        {eventData.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => handleEventClick(event)}
          />
        ))}
      </div>
      {selectedEvent && (
        <EventDetails event={selectedEvent} onClose={handleCloseDetails} />
      )}
    </div>
  );
}

export default Events;