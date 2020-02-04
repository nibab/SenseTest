export class DateUtils {
    static getDate() {
        return new Date().toLocaleString("en-US", {timeZone: "Zulu"})
    }
}