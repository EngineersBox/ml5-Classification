class MathUtils {

    /**
         * Check if a number is in a range
         * 
         * @param {Number} val 
         * @param {Number} min 
         * @param {Number} max 
         * @returns {Boolean}
         */
    static inRange(val, min, max) {
        return val >= min && val <= max;
    }

    /**
     * Generate a random number (float) in a specified range
     * 
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
    static randRange(min, max) {
        return (Math.random() * (max - min)) + min;
    }

    /**
     * Return closest multiple of divisor to given value
     * 
     * @param {Number} value 
     * @param {Number} divisor 
     * @returns {Number}
     */
    static snap(value, divisor) {
        return ~~(value / divisor);
    }

}

class ColorUtils {

    /**
         * Add two colors together element wise
         * 
         * @param {Color} color_a 
         * @param {Color} color_b 
         * @returns {Color}
         */
    static colorAdd(color_a, color_b) {
        return color(color_a.levels.map((e, i) => Math.min(255, e + color_b.levels[i])));
    }

}

class Utils {

    /**
     * Check a position is on the board
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Boolean}
     */
    static isValidMove(x, y) {
        return MathUtils.inRange(y, 0, COLS) && MathUtils.inRange(x, 0, ROWS);
    }

    /**
     * Get DOM element with specified id
     * 
     * @param {String} id 
     * @returns {*}
     */
    static getElem(id) {
        return document.getElementById(id);
    }

}