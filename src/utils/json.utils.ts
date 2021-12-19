export class JsonUtils {
    // Very bad, but do we have some alternatives?
    static isValid(value: string): boolean {
        try {
            JSON.parse(value);

            return true;
        } catch (e) {
            return false;
        }
    }
}
