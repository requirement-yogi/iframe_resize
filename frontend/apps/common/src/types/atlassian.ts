export interface AtlassianContext {
    confluence?: ConfluenceContext;
    jira?: JiraContext;
    license?: LicenseContext;
    url?: UrlContext;
}

export interface ConfluenceContext {
    space?: ConfluenceSpaceContext;
    content?: ConfluenceContentContext;
}

export interface ConfluenceSpaceContext {
    id?: string;
    key?: string;
}

export interface ConfluenceContentContext {
    plugin?: string;
    type?: string;
    version?: string;
    id?: string;
}

export interface JiraContext {
    project?: JiraProjectContext;
    issue?: JiraIssueContext;
}

export interface JiraProjectContext {
    id?: string;
    key?: string;
}

export interface JiraIssueContext {
    id?: string;
    key?: string;
}

export interface LicenseContext {
    active?: boolean;
}

export interface UrlContext {
    displayUrl?: string;
}
