declare namespace Express {
    export interface Request {
       userData: {
           id?: string;
           role? : string;
       }
    }
}
