class AsyncFileReader {
    constructor() {
        this._reader = new FileReader()
        this._asBinaryString = 'binaryString'
        this._asText = 'text'
        this._asArrayBuffer = 'arrayBuffer'
    }

    /**
     * @param file
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
        return this._read(file, this._asBinaryString)
    }

    /**
     * 
     * @param file
     * @param encoding
     * @returns {Promise<string>}
     */
    async readAsText(file, encoding = 'UTF-8') {
        return this._read(file, this._asText, encoding)
    }

    /**
     * @param file
     * @returns {Promise<ArrayBuffer>}
     */
    async readAsArrayBuffer(file) {
        return this._read(file, this._asArrayBuffer)
    }

    /**
     * 
     * @param file
     * @param as
     * @param encoding
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
                case this._asBinaryString:
                    this._reader.readAsBinaryString(file);
                    break;
                case this._asArrayBuffer:
                    this._reader.readAsArrayBuffer(file);
                    break;
                default:
                    this._reader.readAsDataURL(file)
            }
        })
    }
}
