class AsyncFileReader {
    constructor() {
        this._reader = new FileReader()
    }

    /**
     *
     * @returns {string}
     * @private
     */
    static _asBinary() {
        return 'binary'
    }

    /**
     *
     * @returns {string}
     * @private
     */
    static _asText() {
        return 'text';
    }

    /**
     *
     * @returns {string}
     * @private
     */
    static _asBuffer() {
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
     * @param {File|Blob} file
     * @returns {Promise<string>}
     */
    async readAsBinaryString(file) {
        return this._read(file, AsyncFileReader._asBinary())
    }

    /**
     *
     * @param {File|Blob} file
     * @param {string} encoding
     * @returns {Promise<string>}
     */
    async readAsText(file, encoding = 'UTF-8') {
        return this._read(file, AsyncFileReader._asText(), encoding)
    }

    /**
     *
     * @param {File|Blob} file
     * @returns {Promise<ArrayBuffer>}
     */
    async readAsArrayBuffer(file) {
        return this._read(file, AsyncFileReader.asBuffer())
    }

    /**
     *
     * @param {File|Blob} file
     * @param {string<_asBuffer|_asText|_asBinary>} as
     * @param {string} encoding
     * @returns {Promise<string|ArrayBuffer>}
     * @private
     */
    async _read(file, as = '', encoding = 'UTF-8') {
        const reader = this._reader
        return new Promise(function (resolve, reject) {
            reader.onload = (e) => resolve(e.target.result)
            reader.onerror = reject
            switch (as) {
                case AsyncFileReader._asText():
                    reader.readAsText(file, encoding);
                    break;
                case AsyncFileReader._asBinary():
                    reader.readAsBinaryString(file);
                    break;
                case AsyncFileReader._asBuffer():
                    reader.readAsArrayBuffer(file);
                    break;
                default:
                    reader.readAsDataURL(file)
            }
        })
    }
}
export default new AsyncFileReader();
