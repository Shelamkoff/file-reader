class AsyncFileReader {
    constructor() {
        this._reader = new FileReader()
    }

    /**
     *
     * @returns {string}
     */
    static asBinary() {
        return 'binary'
    }

    /**
     *
     * @returns {string}
     */
    static asText() {
        return 'text';
    }

    /**
     *
     * @returns {string}
     */
    static asBuffer() {
        return 'buffer'
    }

    /**
     *
     * @param {File|Blob} file
     * @returns {Promise<string>}
     */
    async readAsDataUrl(file) {
        return this._read(file)
    }

    /**
     * @param file
     * @returns {Promise<string>}
     */
    async readAsBinaryString(file) {
        return this._read(file, this._asBinary)
    }

    /**
     *
     * @param {File|Blob} file
     * @param {string} encoding
     * @returns {Promise<string>}
     */
    async readAsText(file, encoding = 'UTF-8') {
        return this._read(file, this._asText, encoding)
    }

    /**
     *
     * @param {File|Blob} file
     * @returns {Promise<ArrayBuffer>}
     */
    async readAsArrayBuffer(file) {
        return this._read(file, this._asBuffer)
    }

    /**
     *
     * @param {File|Blob} file
     * @param {string<asBuffer|asText|asBinary>} as
     * @param {string} encoding
     * @returns {Promise<string|ArrayBuffer>}
     * @private
     */
    async _read(file, as = '', encoding = 'UTF-8') {
        const reader = this._reader
        return new Promise(function (resolve, reject) {
            reader.onloadend = function (event) {
                if (event.target.error !== null) {
                    resolve(event.target.result)
                }

                reject(event.target.error)
            }
            switch (as) {
                case AsyncFileReader.asText():
                    reader.readAsText(file, encoding);
                    break;
                case AsyncFileReader.asBinary():
                    reader.readAsBinaryString(file);
                    break;
                case AsyncFileReader.asBuffer():
                    reader.readAsArrayBuffer(file);
                    break;
                default:
                    reader.readAsDataURL(file)
            }
        })
    }
}
