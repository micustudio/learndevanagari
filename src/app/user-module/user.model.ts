import { Item } from '../item-module/item.model';

export class User {
    constructor( 
        public username: string,
        public email: string,
        public password: string,
        public fullName?: string,
        public profilePic?: string,
        public location?: string,
        public biography?: string,
        public date?: Date,
        public items?: Item[]){
            
        }
}