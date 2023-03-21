/**
 * Initializes a list of Veramo-wrapped LD Signature suites and exposes those to the Agent Module
 */
export class LdSuiteLoader {
    constructor(options) {
        options.veramoLdSignatures.forEach((obj) => {
            const keyType = obj.getSupportedVeramoKeyType();
            const verificationType = obj.getSupportedVerificationType();
            return this.signatureMap[keyType] = { ...this.signatureMap[keyType], [verificationType]: obj };
        });
    }
    signatureMap = {};
    getSignatureSuiteForKeyType(type, verificationType) {
        const suite = this.signatureMap[type]?.[verificationType];
        if (suite)
            return suite;
        throw new Error('No Veramo LD Signature Suite for ' + type);
    }
    getAllSignatureSuites() {
        return Object.values(this.signatureMap).map((x) => Object.values(x)).flat();
    }
    getAllSignatureSuiteTypes() {
        return Object.values(this.signatureMap).map((x) => Object.keys(x)).flat();
    }
}
//# sourceMappingURL=ld-suite-loader.js.map