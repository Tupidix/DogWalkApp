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
