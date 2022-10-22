declare module "*.png";
declare module "*.jpg";
declare module "*.svg";

declare interface TankClass {
  name: string;
  image: string;
  description: string;
  id: number;
  health: number;
  fireRate: number;
  firePower: number;
  speed: number;
  healthAdd: number;
  fireRateAdd: number;
  firePowerAdd: number;
  speedAdd: number;
  price: number;
}

declare interface TankItem {
  classType: number;
  energy: number;
  maxEnergy: number;
  energyPool: number;
  maxEnergyPool: number;
  experience: number;
  tankLevel: number;

  name: string;
  image: string;
  description: string;

  health: number;
  fireRate: number;
  firePower: number;
  speed: number;

  id: string;
  owner: string;
  level: number;

  price?: number;

  borrower: string;
  followers: array<string>;
}

declare interface UserProfile {
  name: string;
  address: string;
  email: string;
  password?: string;
  description: string;
  follows: number;
  image: string;
  coverImage: string;
  links: any;
  ranking: number;
  merit: number;
}

declare module 'solarea-jazzicon';