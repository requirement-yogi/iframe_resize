-- See https://bitbucket.org/atlassian/atlassian-connect-spring-boot/src/master/atlassian-connect-spring-boot-jpa-starter/src/main/resources/db.changelog-master.yaml

CREATE TABLE atlassian_host (
    client_key                          VARCHAR(255) NOT NULL,
    shared_secret                       VARCHAR(255) NOT NULL,
    base_url                            VARCHAR(255) NOT NULL,
    product_type                        VARCHAR(255),
    description                         VARCHAR(255),
    service_entitlement_number          VARCHAR(255),
    addon_installed                     BOOLEAN,
    created_date                        TIMESTAMP,
    last_modified_date                  TIMESTAMP,
    created_by                          VARCHAR(255),
    last_modified_by                    VARCHAR(255),
    oauth_client_id                     VARCHAR(255),
    cloud_id                            VARCHAR(255),
    authentication                      SMALLINT,
    entitlement_id                      VARCHAR(255),
    entitlement_number                  VARCHAR(255),
    display_url                         VARCHAR(255),
    display_url_servicedesk_help_center VARCHAR(255),
    installation_id                     VARCHAR(255),
    capability_set                      VARCHAR(255),
    CONSTRAINT pk_atlassian_host PRIMARY KEY (client_key)
);

CREATE INDEX idx_atlassian_host_base_url ON atlassian_host (base_url);

CREATE TABLE atlassian_host_mapping (
    installation_id VARCHAR(255) NOT NULL,
    client_key      VARCHAR(255) NOT NULL,
    CONSTRAINT pk_atlassian_host_mapping PRIMARY KEY (installation_id),
    CONSTRAINT fk_atlassian_host_mapping_atlassian_host FOREIGN KEY (client_key)
        REFERENCES atlassian_host (client_key)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE forge_system_access_token (
    installation_id VARCHAR(255)  NOT NULL,
    api_base_url    VARCHAR(255)  NOT NULL,
    access_token    VARCHAR(2048) NOT NULL,
    expiration_time TIMESTAMP     NOT NULL,
    CONSTRAINT pk_forge_system_access_token PRIMARY KEY (installation_id)
);

CREATE INDEX idx__expiration_time ON forge_system_access_token (expiration_time);
