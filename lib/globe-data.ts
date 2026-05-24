export interface CityNode {
  name: string;
  lat: number;
  lng: number;
}

export const TEXAS_ORIGIN: CityNode = {
  name: "Texas",
  lat: 31.0,
  lng: -99.5,
};

export const TARGET_CITIES: CityNode[] = [
  { name: "New York", lat: 40.71, lng: -74.01 },
  { name: "Los Angeles", lat: 34.05, lng: -118.24 },
  { name: "Chicago", lat: 41.88, lng: -87.63 },
  { name: "Miami", lat: 25.76, lng: -80.19 },
  { name: "Seattle", lat: 47.61, lng: -122.33 },
  { name: "Denver", lat: 39.74, lng: -104.99 },
  { name: "Atlanta", lat: 33.75, lng: -84.39 },
  { name: "Dallas", lat: 32.78, lng: -96.8 },
];

/**
 * Convert lat/lng (degrees) to 3D position on a sphere of given radius.
 * Standard spherical coordinate convention:
 * - latitude: -90 (south pole) to +90 (north pole)
 * - longitude: -180 to +180
 */
export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}
