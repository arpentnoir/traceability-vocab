import { RequiredAgentMethods, VeramoLdSignature } from '../ld-suites.js';
import { CredentialPayload, DIDDocument, IAgentContext, IKey, TKeyType } from '@veramo/core-types';
/**
 * Veramo wrapper for the Ed25519Signature2020 suite by digitalcredentials
 *
 * @alpha This API is experimental and is very likely to change or disappear in future releases without notice.
 */
export declare class VeramoEd25519Signature2020 extends VeramoLdSignature {
    private readonly MULTIBASE_BASE58BTC_PREFIX;
    private readonly MULTICODEC_PREFIX;
    getSupportedVerificationType(): string;
    getSupportedVeramoKeyType(): TKeyType;
    getSuiteForSigning(key: IKey, issuerDid: string, verificationMethodId: string, context: IAgentContext<RequiredAgentMethods>): Promise<any>;
    getSuiteForVerification(): any;
    preSigningCredModification(credential: CredentialPayload): void;
    preDidResolutionModification(didUrl: string, didDoc: DIDDocument): void;
    preSigningKeyModification(key: Uint8Array): string;
}
//# sourceMappingURL=Ed25519Signature2020.d.ts.map