/**
 * Service donnant accès à des regex communes
 *
 * @author Ruyck Robin et Belot Cédric
 *
 */

const RegexService = {

    /*contrôles génériques nombres et lettres*/

    /**
     * only numbers
     * @example 123456
     */
    onlyNumbers() {
        return /^[0-9]+$/
    },

    /**
     * only numbers and starting only with a number between 1 and 9 and accepting them . and the ,
     * @example 123456789
     * @example 1.0123456789
     * @example 1,0123456789
     * @example 0.0123456789
     * @example 0,0123456789
     */
    onlyNumbersWithComaAndDot() {
        return /^([1-9][0-9]*(,|.){0,1}|(0,|0\.)+)[0-9]*$/
    },

    /**
     * only numbers + minimal length + maximal length
     * @param {number} min - minimal length
     * @param {number} max - maximal length
     * @example (4,5) -> 1234 or 12345
     */
    onlyNumbersByLength(min,max) {
        return new RegExp(`^[0-9]{${min},${max}}$`);
    },

    /**
     * only lowercase letters + uppercase letters
     * @example aAbB
     */
    onlyUnaccentedLetters() {
        return /^[a-zA-Z]+$/;
    },

    /**
     * only lowercase letters + uppercase letters + whitespace
     * @example aA bB
     */
    onlyUnaccentedLettersWithWhitespace() {
        return /^[a-zA-Z\s]+$/;
    },

    /**
     * only lowercase accented letters + uppercase accented letters
     * @example aAéÉ
     */
    onlyLetters() {
        return /^[a-zA-ZâàäæéèêëîïöôœûüùçÂÀÄÆÉÈÊËÎÏÖÔŒÛÜÙÇ]+$/;
    },

    /**
     * only lowercase accented letters + uppercase accented letters + whitespace
     * @example aA éÉ
     */
    onlyLettersWithWhitespace() {
        return /^[a-zA-ZâàäæéèêëîïöôœûüùçÂÀÄÆÉÈÊËÎÏÖÔŒÛÜÙÇ\s]+$/;
    },

    /**
     * only numbers + lowercase letters + uppercase letters
     * @example 1a2A
     */
    onlyNumbersAndUnaccentedLetters() {
        return /^[0-9a-zA-Z]+$/;
    },

    /**
     * only numbers + uppercase letters
     * @example 1A2B
     */
    onlyNumbersAndUppercaseUnaccentedLetters() {
        return /^[0-9A-Z]+$/;
    },

    /**
     * only numbers + uppercase letters + minimal length + maximal length
     * @param {number} min - minimal length
     * @param {number} max - maximal length
     * @example (4,5) -> 1A2B or 1A2B3
     */
    onlyNumbersAndUppercaseUnaccentedLettersByLength(min,max) {
        return new RegExp(`^[0-9A-Z]{${min},${max}}$`);
    },

    /**
     * only numbers + lowercase accented letters + uppercase accented letters
     * + white space
     * @example 1aA 2éÉ
     */
    onlyNumbersAndLettersWithWhitespace() {
        return /^[0-9a-zA-ZâàäæéèêëîïöôœûüùçÂÀÄÆÉÈÊËÎÏÖÔŒÛÜÙÇ\s]+$/;
    },

    /*contrôles génériques autres*/

    /**
     * must be the same length as the length indicated by the provided string
     * @param {string} string - the length the expression must be
     */
    byLength(string) {
        return new RegExp(`^.{${string}}$`);
    },

    /**
     * must start with one character from the provided string
     * @param {string} string - the string the expression must start with a character from
     */
    startWithSpecificCharacter(string) {
        return new RegExp(`^[${string}]`);
    },

    /**
     * must start with the provided string
     * @param {string} string - the string the expression must start with
     */
    startWithSpecificString(string) {
        return new RegExp(`^(${string})`);
    },

    /**
     * must not start with the provided string
     * @param {string} string - the string the expression must not start with
     */
    doesNotStartWith(string) {
        return new RegExp(`^(?!${string}).*$`);
    },

    /**
     * doesn't contain the provided string
     * @param {string} string - the string the expression must not contain
     */
    doesNotContain(string) {
        return new RegExp(`^((?!${string}).)*$`);
    },

    /*contrôles spécifiques*/

    /**
     * specific input control for Urssaf employee name
     * (surname + customaryName + chistianName)
     */
    matchUrssafControlForEmployeeName() {
        return /^[a-zA-ZâàäéèêëîïöôûüùçÂÀÄÉÈÊËÎÏÖÔÛÜÙÇ' .&-]*$/;
    },

    /**
     * specific input control for Urssaf employee address
     * (town birth + country birth)
     */
    matchUrssafControlForEmployeeAddress() {
        return /^[a-zA-ZâàäéèêëîïöôûüùçÂÀÄÉÈÊËÎÏÖÔÛÜÙÇ0-9 .'-]*$/;
    },

    //javascript doc à finir
    /**
     * @example example@gmail.com
     */
    onlyCommonEmailIds() {
        return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    },

    //javascript doc à faire
    onlyHttpsUrl() {
        // eslint-disable-next-line
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;
    },

    //javascript doc à faire
    onlyUrlWithOptionalHttps() {
        // eslint-disable-next-line
        return /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    },

    //javascript doc à faire
    onlyIPv4() {
        return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
    },
};

export default RegexService;
