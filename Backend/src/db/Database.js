import mongoose from "mongoose";

/**
 * Database
 * Handles connecting and disconnecting from MongoDB using Mongoose.
 * Supports automatic retry on connection failure (up to 10 attempts).
 */
export default class Database{
    // Private property holding the MongoDB connection URI
    #uri;

    constructor(uri) {
        this.#uri = uri;        
    }

    /**
     * Connects to the MongoDB database.
     * Retries up to 10 times if the connection fails, with incremental delay.
     * @param {number} attempt - current retry attempt
     */
    connect = async (attempt = 0) => {
        try {
            await mongoose.connect(this.#uri);
            return console.log(`Database connection ${this.#uri} was successful.`);            
        } catch (error) {
            console.log("Database connection error", error);
            if (attempt < 10) setTimeout(() => this.connect(attempt + 1))
            else console.log("Database unavailable");
        }
    }

    /**
     * Disconnects from the MongoDB database.
     */
    close = async () => {
        await mongoose.disconnect();
    }
}