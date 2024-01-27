import { Icon, IconOptions, icon } from 'leaflet';

export const defaultIcon: Icon<IconOptions> = icon({
  // This define the displayed icon size, in pixel
  iconSize: [25, 41],
  // This defines the pixel that should be placed right above the location
  // If not provided, the image center will be used, and that could be awkward
  iconAnchor: [13, 41], // Le bas du marqueur est placé sur la position
  // The path to the image to display
  iconUrl:
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Google_Maps_pin.svg',
  // The path to the image's shadow to display. Also a leaflet asset
  //   shadowUrl: 'leaflet/marker-shadow.png',
});

export const MyLocationIcon: Icon<IconOptions> = icon({
  // This define the displayed icon size, in pixel
  iconSize: [20, 20],
  // This defines the pixel that should be placed right above the location
  // If not provided, the image center will be used, and that could be awkward
  iconAnchor: [10, 10], // Centre de l'image est sur la position
  // The path to the image to display
  iconUrl:
    'https://upload.wikimedia.org/wikipedia/commons/8/83/Simple_icon_location.svg',
  // The path to the image's shadow to display. Also a leaflet asset
  //   shadowUrl: 'leaflet/marker-shadow.png',
});

export const trackingIcon: Icon<IconOptions> = icon({
  // This define the displayed icon size, in pixel
  iconSize: [10, 10],
  // This defines the pixel that should be placed right above the location
  // If not provided, the image center will be used, and that could be awkward
  iconAnchor: [5, 5],
  // The path to the image to display
  iconUrl:
    'https://upload.wikimedia.org/wikipedia/commons/4/48/Light_Blue_Circle.svg',
  // The path to the image's shadow to display. Also a leaflet asset
  //   shadowUrl: 'leaflet/marker-shadow.png',
});
