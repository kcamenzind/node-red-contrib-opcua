
const opcua = require("node-opcua");
const path = require("path");
const envPaths = require("env-paths");
const opcuaConfig = envPaths("node-red-opcua").config;


function getCertificateManagerRootParent(customDir) {
    // If path is null/undefined or empty string, use default config path
    if (customDir && customDir.trim().length != 0) {
        return customDir;
    } else {
        return opcuaConfig;
    }
}

// Create the certificate manager for PKI from options. Options include:
//  autoAccept (required): boolean, whether or not to automatically accept unknown certificates
//  certManagerDir (optional): string, a custom path for the root folder of the certificate manager.
//    If not given, uses the default config folder for nodejs app node-red-opcua.
function createCertificateManager(options) {
    const rootFolderParent = getCertificateManagerRootParent(options.certManagerDir);
    const rootFolder = path.join(rootFolderParent, "PKI");
    return new opcua.OPCUACertificateManager({
        name: "PKI",
        rootFolder,
        automaticallyAcceptUnknownCertificate: options.autoAccept
    });
}

// Create the certificate manager for UserPKI from options. Options include:
//  autoAccept (required): boolean, whether or not to automatically accept unknown certificates
//  certManagerDir (optional): string, a custom path for the root folder of the certificate manager.
//    If not given, uses the default config folder for nodejs app node-red-opcua.
function createUserCertificateManager(options) {
    const rootFolderParent = getCertificateManagerRootParent(options.certManagerDir);
    const rootFolder = path.join(rootFolderParent, "UserPKI");
    return _g_userCertificateManager = new opcua.OPCUACertificateManager({
        name: "UserPKI",
        rootFolder,
        automaticallyAcceptUnknownCertificate: options.autoAccept
    });
}

exports.createCertificateManager = createCertificateManager;
exports.createUserCertificateManager = createUserCertificateManager;
