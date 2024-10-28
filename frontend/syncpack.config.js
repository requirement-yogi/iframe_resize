/** @type {import("syncpack").RcFile} */
module.exports = {
    versionGroups: [
        {
            label: "Use wildcard version for our own packages",
            dependencies: ["@requirementyogi/**"],
            dependencyTypes: ["dev", "prod", "peer"],
            pinVersion: "*",
        },
    ],
};
