class AsyncFileReader {
    constructor() {
        this._reader = new FileReader()
        this._asBinary = 'binary'
        this._asText = 'text'
        this._asBuffer = 'buffer'
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
     * @param {string} as
     * @param {string} encoding
     * @returns {Promise<string|ArrayBuffer>}
     * @private
     */
    async _read(file, as = 'dataUrl', encoding = 'UTF-8') {
        return new Promise(resolve => {
            this._reader.onloadend = function (event) {
                resolve(event.target.result)
            }

            switch (as) {
                case this._asText:
                    this._reader.readAsText(file, encoding);
                    break;
                case this._asBinary:
                    this._reader.readAsBinaryString(file);
                    break;
                case this._asBuffer:
                    this._reader.readAsArrayBuffer(file);
                    break;
                default:
                    this._reader.readAsDataURL(file)
            }
        })
    }
}
