export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

export function checkIfDogIsYours(dogsArray: any, userId: string): any[] {
  // array containing your dogs
  const yourDogs: any[] = [];

  // foreach dog in dogsArray, check if dog.master is equal to the current user id
  // if yes, return true
  // else return false
  dogsArray.forEach((dog: any) => {
    if (dog.master.contains(userId)) {
      yourDogs.push(dog);
    }
  });
  return yourDogs;
}

export function // La formule de Haversine permet de calculer la distance entre deux points sur une sphère, connaissant leurs coordonnées géographiques.
haversine_distance(mk1: any, mk2: any) {
  // console.log('1');
  let R = 6371.071; // Radius of the Earth in Kilometers
  // console.log('2');
  let rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  // console.log('3');
  let rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  // console.log('4');
  let difflat = rlat2 - rlat1; // Radian difference (latitudes)
  // console.log('5');
  let difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)
  // console.log('6');
  let d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(difflat / 2), 2) +
          Math.cos(rlat1) * Math.cos(rlat2) * Math.pow(Math.sin(difflon / 2), 2)
      )
    );

  return d * 1000; // Mètres
}
