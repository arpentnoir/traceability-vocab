"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var src_1 = require("../../../core/src");
var src_2 = require("../../../credential-w3c/src");
var src_3 = require("../../../did-manager/src");
var src_4 = require("../../../key-manager/src");
var src_5 = require("../../../kms-local/src");
var src_6 = require("../../../did-provider-key/src");
var src_7 = require("../../../did-resolver/src");
var src_8 = require("../../../did-provider-ethr/src");
var action_handler_js_1 = require("../action-handler.js");
var ld_default_contexts_js_1 = require("../ld-default-contexts.js");
var Ed25519Signature2018_js_1 = require("../suites/Ed25519Signature2018.js");
var did_resolver_1 = require("did-resolver");
var ethr_did_resolver_1 = require("ethr-did-resolver");
var EcdsaSecp256k1RecoverySignature2020_js_1 = require("../suites/EcdsaSecp256k1RecoverySignature2020.js");
var globals_1 = require("@jest/globals");
require("cross-fetch/polyfill");
globals_1.jest.setTimeout(300000);
var customContext = {
    'custom:example.context': {
        '@context': {
            nothing: 'custom:example.context#blank'
        }
    }
};
var infuraProjectId = '3586660d179141e3801c3895de1c2eba';
describe('credential-LD full flow', function () {
    var didKeyIdentifier;
    var didEthrIdentifier;
    var agent;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    agent = (0, src_1.createAgent)({
                        plugins: [
                            new src_4.KeyManager({
                                store: new src_4.MemoryKeyStore(),
                                kms: {
                                    local: new src_5.KeyManagementSystem(new src_4.MemoryPrivateKeyStore())
                                }
                            }),
                            new src_3.DIDManager({
                                providers: {
                                    'did:key': new src_6.KeyDIDProvider({ defaultKms: 'local' }),
                                    'did:ethr:goerli': new src_8.EthrDIDProvider({
                                        defaultKms: 'local',
                                        network: 'goerli'
                                    })
                                },
                                store: new src_3.MemoryDIDStore(),
                                defaultProvider: 'did:key'
                            }),
                            new src_7.DIDResolverPlugin({
                                resolver: new did_resolver_1.Resolver(__assign(__assign({}, (0, src_6.getDidKeyResolver)()), (0, ethr_did_resolver_1.getResolver)({ infuraProjectId: infuraProjectId })))
                            }),
                            new src_2.CredentialPlugin(),
                            new action_handler_js_1.CredentialIssuerLD({
                                contextMaps: [ld_default_contexts_js_1.LdDefaultContexts, customContext],
                                suites: [new Ed25519Signature2018_js_1.VeramoEd25519Signature2018(), new EcdsaSecp256k1RecoverySignature2020_js_1.VeramoEcdsaSecp256k1RecoverySignature2020()]
                            }),
                        ]
                    });
                    return [4 /*yield*/, agent.didManagerCreate()];
                case 1:
                    didKeyIdentifier = _a.sent();
                    return [4 /*yield*/, agent.didManagerCreate({ provider: 'did:ethr:goerli' })];
                case 2:
                    didEthrIdentifier = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('create credential with inline context', function () { return __awaiter(void 0, void 0, void 0, function () {
        var credential, verifiableCredential, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credential = {
                        issuer: didKeyIdentifier.did,
                        '@context': [
                            {
                                '@context': {
                                    nothing: 'custom:example.context#blank'
                                }
                            },
                        ],
                        credentialSubject: {
                            nothing: 'else matters'
                        }
                    };
                    return [4 /*yield*/, agent.createVerifiableCredential({
                            credential: credential,
                            proofFormat: 'lds'
                        })];
                case 1:
                    verifiableCredential = _a.sent();
                    expect(verifiableCredential).toBeDefined();
                    return [4 /*yield*/, agent.verifyCredential({
                            credential: verifiableCredential
                        })];
                case 2:
                    result = _a.sent();
                    expect(result.verified).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('works with Ed25519Signature2018 credential', function () { return __awaiter(void 0, void 0, void 0, function () {
        var credential, verifiableCredential, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credential = {
                        issuer: didKeyIdentifier.did,
                        '@context': ['custom:example.context'],
                        credentialSubject: {
                            nothing: 'else matters'
                        }
                    };
                    return [4 /*yield*/, agent.createVerifiableCredential({
                            credential: credential,
                            proofFormat: 'lds'
                        })];
                case 1:
                    verifiableCredential = _a.sent();
                    expect(verifiableCredential).toBeDefined();
                    return [4 /*yield*/, agent.verifyCredential({
                            credential: verifiableCredential
                        })];
                case 2:
                    result = _a.sent();
                    expect(result.verified).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('works with EcdsaSecp256k1RecoveryMethod2020 credentials', function () { return __awaiter(void 0, void 0, void 0, function () {
        var credential, verifiableCredential, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credential = {
                        issuer: didEthrIdentifier.did,
                        '@context': ['custom:example.context'],
                        credentialSubject: {
                            nothing: 'else matters'
                        }
                    };
                    return [4 /*yield*/, agent.createVerifiableCredential({
                            credential: credential,
                            proofFormat: 'lds'
                        })];
                case 1:
                    verifiableCredential = _a.sent();
                    expect(verifiableCredential).toBeDefined();
                    return [4 /*yield*/, agent.verifyCredential({
                            credential: verifiableCredential
                        })];
                case 2:
                    result = _a.sent();
                    expect(result.verified).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('works with Ed25519Signature2018 credential and presentation', function () { return __awaiter(void 0, void 0, void 0, function () {
        var credential, verifiableCredential1, verifiablePresentation, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credential = {
                        issuer: didKeyIdentifier.did,
                        '@context': ['custom:example.context'],
                        credentialSubject: {
                            nothing: 'else matters'
                        }
                    };
                    return [4 /*yield*/, agent.createVerifiableCredential({
                            credential: credential,
                            proofFormat: 'lds'
                        })];
                case 1:
                    verifiableCredential1 = _a.sent();
                    return [4 /*yield*/, agent.createVerifiablePresentation({
                            presentation: {
                                verifiableCredential: [verifiableCredential1],
                                holder: didKeyIdentifier.did
                            },
                            challenge: 'VERAMO',
                            proofFormat: 'lds'
                        })];
                case 2:
                    verifiablePresentation = _a.sent();
                    expect(verifiablePresentation).toBeDefined();
                    return [4 /*yield*/, agent.verifyPresentation({
                            presentation: verifiablePresentation,
                            challenge: 'VERAMO'
                        })];
                case 3:
                    result = _a.sent();
                    expect(result.verified).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('works with EcdsaSecp256k1RecoveryMethod2020 credential and presentation', function () { return __awaiter(void 0, void 0, void 0, function () {
        var credential, verifiableCredential1, verifiablePresentation, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    credential = {
                        issuer: { id: didEthrIdentifier.did },
                        '@context': ['https://www.w3.org/2018/credentials/v1', 'https://veramo.io/contexts/profile/v1'],
                        type: ['VerifiableCredential', 'Profile'],
                        issuanceDate: new Date().toISOString(),
                        credentialSubject: {
                            id: didKeyIdentifier.did,
                            name: 'Martin, the great'
                        }
                    };
                    return [4 /*yield*/, agent.createVerifiableCredential({
                            credential: credential,
                            proofFormat: 'lds'
                        })];
                case 1:
                    verifiableCredential1 = _a.sent();
                    return [4 /*yield*/, agent.createVerifiablePresentation({
                            presentation: {
                                verifiableCredential: [verifiableCredential1],
                                holder: didEthrIdentifier.did
                            },
                            challenge: 'VERAMO',
                            proofFormat: 'lds'
                        })];
                case 2:
                    verifiablePresentation = _a.sent();
                    expect(verifiablePresentation).toBeDefined();
                    return [4 /*yield*/, agent.verifyPresentation({
                            presentation: verifiablePresentation,
                            challenge: 'VERAMO'
                        })];
                case 3:
                    result = _a.sent();
                    expect(result.verified).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
