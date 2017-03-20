export class Item {
    constructor( 
        public char: string,
        public letter: string,
        public category: string,
        public translation?: string,
        public combination?: string,
        public correct?: number,
        public incorrect?: number,
        public streak?: number,
        public highestStreak?: number,
        public rank?: number,
        public unseen?: boolean,
        public impressions?: number,
        public date?: Date,
        public itemId?: string,
        public comments?: string[]){
        }
}