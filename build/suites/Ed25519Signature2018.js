import { encodeJoseBlob } from '@veramo/utils';
import { VeramoLdSignature } from '../ld-suites.js';
import * as u8a from 'uint8arrays';
import { Ed25519Signature2018, Ed25519VerificationKey2018 } from '@transmute/ed25519-signature-2018';
/**
 * Veramo wrapper for the Ed25519Signature2018 suite by Transmute Industries
 *
 * @alpha This API is experimental and is very likely to change or disappear in future releases without notice.
 */
export class VeramoEd25519Signature2018 extends VeramoLdSignature {
    getSupportedVerificationType() {
        return 'Ed25519VerificationKey2018';
    }
    getSupportedVeramoKeyType() {
        return 'Ed25519';
    }
    getSuiteForSigning(key, issuerDid, verificationMethodId, context) {
        const controller = issuerDid;
        // DID Key ID
        let id = verificationMethodId;
        const signer = {
            // returns a JWS detached
            sign: async (args) => {
                const header = {
                    alg: 'EdDSA',
                    b64: false,
                    crit: ['b64'],
                };
                const headerString = encodeJoseBlob(header);
                const messageBuffer = u8a.concat([u8a.fromString(`${headerString}.`, 'utf-8'), args.data]);
                const messageString = u8a.toString(messageBuffer, 'base64');
                const signature = await context.agent.keyManagerSign({
                    keyRef: key.kid,
                    algorithm: 'EdDSA',
                    data: messageString,
                    encoding: 'base64',
                });
                return `${headerString}..${signature}`;
            },
        };
        const verificationKey = new Ed25519VerificationKey2018({
            id,
            controller,
            publicKey: u8a.fromString(key.publicKeyHex, 'base16'),
            signer: () => signer,
            type: this.getSupportedVerificationType(),
        });
        // overwrite the signer since we're not passing the private key and transmute doesn't support that behavior
        verificationKey.signer = () => signer;
        return new Ed25519Signature2018({
            key: verificationKey,
            signer: signer,
        });
    }
    getSuiteForVerification() {
        return new Ed25519Signature2018();
    }
    preSigningCredModification(credential) {
        // nothing to do here
    }
    preDidResolutionModification(didUrl, didDoc) {
        // nothing to do here
    }
}
//# sourceMappingURL=Ed25519Signature2018.js.map