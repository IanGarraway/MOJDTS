/**
 * DateTools
 * Contains date related helper functions
 */
export default class DateTools{

    /**
     * Generates a default "tomorrow" date-time string.
     *
     * Returns a string representing the next day with the time set to 12:00 (noon).
     * The output format is "YYYY-MM-DDTHH:mm", suitable for input[type="datetime-local"].
     *
     * @returns {string} ISO-formatted date-time string for tomorrow at 12:00.
     */
    static tomorrowDate() {
        //in the case of no existing date, generates a date for the next day at 12 
        //as a default due date and time
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);  // move to tomorrow
        tomorrow.setHours(12, 0, 0, 0);            // set time to 12:00:00.000

        return tomorrow.toISOString().slice(0, 16);
    }
}