import { Icon, IconOptions, icon } from 'leaflet';

export const defaultIcon: Icon<IconOptions> = icon({
  // This define the displayed icon size, in pixel
  iconSize: [25, 41],
  // This defines the pixel that should be placed right above the location
  // If not provided, the image center will be used, and that could be awkward
  iconAnchor: [13, 41],
  // The path to the image to display
  // i research pin.png in my project
  iconUrl:
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Google_Maps_pin.svg',
  // The path to the image's shadow to display. Also a leaflet asset
  //   shadowUrl: 'leaflet/marker-shadow.png',
});

export const MyLocationIcon: Icon<IconOptions> = icon({
  // This define the displayed icon size, in pixel
  iconSize: [25, 41],
  // This defines the pixel that should be placed right above the location
  // If not provided, the image center will be used, and that could be awkward
  iconAnchor: [13, 41],
  // The path to the image to display
  // i research pin.png in my project
  iconUrl:
    'https://upload.wikimedia.org/wikipedia/commons/8/83/Simple_icon_location.svg',
  // The path to the image's shadow to display. Also a leaflet asset
  //   shadowUrl: 'leaflet/marker-shadow.png',
});
