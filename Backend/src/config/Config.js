import { config } from "dotenv";

/**
 * Config
 * Handles access to the environment files based on the current NODE_ENV.
 * Loads the correct .env file for the environment: .env, .env.dev, .env.test, etc.
 */
export default class Config{

    // Private static property holding the current environment
    static #env = process.env.NODE_ENV;

    /**
     * Load environment variables from the correct .env file.
     * If NODE_ENV is 'prod', loads '.env', otherwise loads '.env.<NODE_ENV>'
     */
    static load = () => {
        config({
            path: `.env${Config.#env !== `prod` ? `.${Config.#env}` : ''}`,
        });
    };
}