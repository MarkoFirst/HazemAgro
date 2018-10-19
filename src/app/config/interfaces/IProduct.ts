import {IFraction} from "./IFraction";

export interface IProduct extends IFraction {
	id: string;
	cost: number;
	name: string;
}