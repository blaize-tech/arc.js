"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// the version of the redeemer contract to use.
// we can specify multiple versions, and try to find them in the order given
exports.REDEEMER_CONTRACT_VERSIONS = [
    '0.0.1-rc.37',
    '0.0.1-rc.36'
];
// the version of the Reputation, and token contract instances
exports.REPUTATION_CONTRACT_VERSION = '0.0.1-rc.19';
exports.DAOTOKEN_CONTRACT_VERSION = '0.0.1-rc.19';
// used for a workaround
exports.CONTRIBUTION_REWARD_DUMMY_VERSION = '0.0.1-rc.19';
// export const ABI_DIR = path.resolve('./node_modules/@daostack/migration/contracts-optimized')
exports.ABI_DIR = './abis';
//# sourceMappingURL=settings.js.map