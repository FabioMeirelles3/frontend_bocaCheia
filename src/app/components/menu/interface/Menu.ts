import { Restaurant } from "../../restaurant/interface/Restaurant";

export interface Menu {
     id?: number;
     name: string;
     description: string;
     price: number;
     arquivo?: string;
     restaurant: Restaurant;
   }
