class Expenses {
    id: string;
    description: string;
    amount: number;
    date: Date;

    constructor(id: string, description: string, amount: number, date: Date) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.date = date;
      }
} 

export default Expenses