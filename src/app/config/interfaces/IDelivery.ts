import {IFraction} from "./IFraction";

export interface IDelivery extends IFraction {
	date: string;
	idProduct: string;
	isSupply: boolean;
	weight: number;
	provider?: string;
	storage: string;
	fraction?: string;
	user: string;
}