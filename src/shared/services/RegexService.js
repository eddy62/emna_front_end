/**
 * Service donnant accés à des regex communes
 *
 * @author De Ruyck Robin
 *
 */
const RegexService = {
    onlyNumbers() {
        return /^[0-9]+$/
    },

    onlyNumbersInRange(a,b) {
        return new RegExp(`^[0-9]{${a},${b}}$`);
    },

    onlyNumbersAndLetters() {
        return /^[a-zA-Zéçèùàêû\s]+$/;
    },

    /**
     * @example example@gmail.com
     */
    onlyCommonEmailIds() {
        return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    },

    onlyHttpsUrl() {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;
    },

    onlyUrlWithOptionalHttps() {
        return /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    },

    onlyIPv4() {
        return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
    },
};

export default RegexService;
