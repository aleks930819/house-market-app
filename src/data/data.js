import Laptop from '../assets/images/laptop.jpg';
import Couple from '../assets/images/couple-rent.jpg';
import Apartments from '../assets/images/apartments.jpg';
import OnlineShoping from '../assets/images/online-shoping.jpg';

import Sell from '../assets/images/sell.jpg';
import Rent from '../assets/images/rent.jpg';
import Stay from '../assets/images/hotel-room.jpg';

const currentYear = new Date().getFullYear();

// Path: src\components\StarterScreenWidget.jsx

export const StarterScreenWidgetData = [
  {
    id: 1,
    image: Laptop,
    title: 'Renting Made Simple',
    description:
      'Browse the highest quality listings, apply online, sign your lease, and even pay your rent from any device.',
  },
  {
    id: 2,
    image: Couple,
    title: 'Tips for Renters',
    description:
      'Find answers to all of your renting questions with the best renter’s guide in the galaxy.',
  },
  {
    id: 3,
    image: Apartments,
    title: 'Advertise Your Rental',
    description:
      'Advertise Your Rental Connect with millions renters looking for new homes using our comprehensive marketing platform.',
  },

  {
    id: 4,
    image: OnlineShoping,
    title: 'Lease 100% Online',
    description:
      'Accept applications, process rent payments online, and sign digital leases all powered on a single platform',
  },
];

// Path: src\components\Footer.jsx

export const FooterData = [
  {
    id: 1,
    text: `&#169; ${currentYear} All rights reserved`,
    link: '/',
  },
  {
    id: 2,
    text: 'Privacy Policy',
    link: '/',
  },
  {
    id: 3,
    text: 'Terms of Service',
    link: '/',
  },
  {
    id: 4,
    text: 'Contact Us',
    link: '/contact-us',
  },
];

// Path: src\components\Explore.jsx

export const ExploreData = [
  {
    id: 1,
    title: 'Places for sale',
    image: Sell,
    link: '/category/sale',
  },
  {
    id: 2,
    title: 'Places for rent',
    image: Rent,
    link: '/category/rent',
  },
  {
    id: 3,
    title: 'Places to stay at',
    image: Stay,
    link: '/category/stay',
  },
];
