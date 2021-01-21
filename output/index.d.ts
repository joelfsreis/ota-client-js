export interface ClientConfig {
    /**
     * Specify your own http client. Defult uses axios
     */
    httpClient?: HttpClient;
    /**
     * Disable cache of distribution manifest. Default is false
     */
    disableManifestCache?: boolean;
    /**
     * Default language code to be used if language was not passed as an input argument of the method
     */
    languageCode?: string;
    /**
     * Disable translation strings cache. Default is false
     */
    disableStringsCache?: boolean;
    /**
     * Disable deep merge and use shallow merge to merge translation strings from json file
     */
    disableJsonDeepMerge?: boolean;
}
export interface HttpClient {
    /**
     * Executes HTTP GET request
     *
     * @param url http url
     */
    get<T>(url: string): Promise<T>;
}
export interface Manifest {
    files: string[];
    languages: string[];
    timestamp: number;
}
export interface Translations {
    [languageCode: string]: LanguageTranslations[];
}
export interface LanguageTranslations {
    file: string;
    content: string | any;
}
export interface LanguageStrings {
    [languageCode: string]: any;
}
export default class OtaClient {
    private distributionHash;
    static readonly BASE_URL = "https://distributions.crowdin.net";
    private readonly httpClient;
    private manifestHolder?;
    private disableManifestCache;
    private stringsCache;
    private disableStringsCache;
    private disableJsonDeepMerge;
    private locale?;
    /**
     * @param distributionHash hash of released Crowdin project distribution
     * @param config client config
     */
    constructor(distributionHash: string, config?: ClientConfig);
    /**
     * Distribution hash
     */
    getHash(): string;
    /**
     * Default language code to be used if language was not passed as an input argument of the method
     *
     * @param languageCode laguage code
     */
    setCurrentLocale(languageCode?: string): void;
    /**
     * Get language code
     */
    getCurrentLocale(): string | undefined;
    /**
     * List manifest timestamp of distribution
     */
    getManifestTimestamp(): Promise<number>;
    /**
     * List of files in distribution
     */
    listFiles(): Promise<string[]>;
    /**
     * List of project language codes
     */
    listLanguages(): Promise<string[]>;
    /**
     * Returns all translations per each language code
     */
    getTranslations(): Promise<Translations>;
    /**
     * Returns translations per each file in disribution for specific language
     *
     * @param languageCode language code
     */
    getLanguageTranslations(languageCode?: string): Promise<LanguageTranslations[]>;
    /**
     * Returns file translations
     *
     * @param file file from distribution
     * @param languageCode language code
     */
    getFileTranslations(file: string, languageCode?: string): Promise<string | any>;
    /**
     * Returns translation strings from json-based files for all languages
     *
     * @param file filter strings by specific file (leave undefined to get from all json files)
     */
    getStrings(file?: string): Promise<LanguageStrings>;
    /**
     * Returns translation strings from json-based files for specific language
     *
     * @param file filter strings by specific file (leave undefined to get from all json files)
     * @param languageCode language code
     */
    getStringsByLocale(file?: string, languageCode?: string): Promise<any>;
    /**
     * Returns translation string for language for specific key
     *
     * @param key path to the translation string in json file
     * @param file filter strings by specific file (leave undefined to get from all json files)
     * @param languageCode language code
     */
    getStringByKey(key: string[] | string, file?: string, languageCode?: string): Promise<string | any>;
    /**
     * Clear cache of translation strings
     */
    cleatStringsCache(): void;
    private getStringsByFilesAndLocale;
    private get manifest();
    private getLanguageCode;
    private getJsonFiles;
}
