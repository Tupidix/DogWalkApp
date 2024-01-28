export type User = {
  ownerId: string;
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
  picture: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  localisation: {
    type: string;
    coordinate: number[];
  };
};
