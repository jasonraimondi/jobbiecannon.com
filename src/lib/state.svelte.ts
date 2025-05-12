import type { SearchProvider, TimeRange } from "./search";
import { buildSearchURL, defaultJobSites } from "./search";

const STORAGE_KEY = "search_state_data";

/**
 * State manager for search parameters using Svelte's $state reactivity
 * with local storage persistence
 */
class SearchState {
  // Basic search configuration
  query = $state<string[]>([]);

  // Advanced query parameters
  exactQuery = $state<string[]>([]);
  likeQuery = $state<string[]>([]);
  doesNotIncludeQuery = $state<string[]>([]);

  // Site-specific search
  allowedSites = $state<string[]>([]);
  excludedSites = $state<string[]>([]);

  // Time filters
  timeRange = $state<TimeRange | undefined>("past_day");

  // File type filters
  fileTypes = $state<string[]>([]);

  // Language filter
  language = $state<string | undefined>(undefined);

  // Additional features
  safeSearch = $state<boolean>(true);
  numResults = $state<number | undefined>(undefined);

  constructor() {
    this.loadFromLocalStorage();
    this.setupAutoSave();
  }

  /**
   * Load state from localStorage on initialization
   */
  loadFromLocalStorage() {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);

        // Restore all properties from saved state
        this.query = parsedState.query || [];
        this.exactQuery = parsedState.exactQuery || [];
        this.likeQuery = parsedState.likeQuery || [];
        this.doesNotIncludeQuery = parsedState.doesNotIncludeQuery || [];
        this.allowedSites = parsedState.allowedSites || [];
        this.excludedSites = parsedState.excludedSites || [];
        this.timeRange = parsedState.timeRange;
        this.fileTypes = parsedState.fileTypes || [];
        this.language = parsedState.language;
        this.safeSearch = parsedState.safeSearch ?? true;
        this.numResults = parsedState.numResults;
      }
    } catch (error) {
      console.error("Failed to load search state from localStorage:", error);
    }
  }

  /**
   * Save the current state to localStorage
   */
  saveToLocalStorage() {
    try {
      const stateToSave = {
        query: this.query,
        exactQuery: this.exactQuery,
        likeQuery: this.likeQuery,
        doesNotIncludeQuery: this.doesNotIncludeQuery,
        allowedSites: this.allowedSites,
        excludedSites: this.excludedSites,
        timeRange: this.timeRange,
        fileTypes: this.fileTypes,
        language: this.language,
        safeSearch: this.safeSearch,
        numResults: this.numResults,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error("Failed to save search state to localStorage:", error);
    }
  }

  /**
   * Set up automatic saving of state changes to localStorage
   */
  setupAutoSave() {
    // Create an effect to watch all state properties
    $effect(() => {
      // Reference all state properties to make effect depend on them
      const _ = [
        this.query,
        this.exactQuery,
        this.likeQuery,
        this.doesNotIncludeQuery,
        this.allowedSites,
        this.excludedSites,
        this.timeRange,
        this.fileTypes,
        this.language,
        this.safeSearch,
        this.numResults
      ];

      // Save to localStorage whenever any state changes
      this.saveToLocalStorage();
    });
  }

  getSearchURL(provider: SearchProvider): URL {
    return buildSearchURL({
      provider,
      query: this.query || undefined,
      exactQuery: this.exactQuery.length ? this.exactQuery : undefined,
      likeQuery: this.likeQuery.length ? this.likeQuery : undefined,
      doesNotIncludeQuery: this.doesNotIncludeQuery.length ? this.doesNotIncludeQuery : undefined,
      allowedSites: this.allowedSites.length ? this.allowedSites : undefined,
      excludedSites: this.excludedSites.length ? this.excludedSites : undefined,
      timeRange: this.timeRange,
      fileTypes: this.fileTypes.length ? this.fileTypes : undefined,
      language: this.language,
      safeSearch: this.safeSearch,
      numResults: this.numResults,
    });
  }

  resetAll() {
    this.query = [];
    this.exactQuery = [];
    this.likeQuery = [];
    this.doesNotIncludeQuery = [];
    this.allowedSites = [];
    this.excludedSites = [];
    this.timeRange = undefined;
    this.fileTypes = [];
    this.language = undefined;
    this.safeSearch = true;
    this.numResults = undefined;

    // Also clear localStorage when resetting
    localStorage.removeItem(STORAGE_KEY);
  }

  setJobSearchDefaults(jobTitle: string = "") {
    this.resetAll();
    this.query.push(jobTitle);
    this.allowedSites = [...defaultJobSites];
    this.timeRange = "past_day";

    // Save the new defaults
    this.saveToLocalStorage();
  }

  addMainTerm(term: string) {
    if (term && !this.query.includes(term)) {
      this.query = [...this.query, term];
    }
  }

  addExactTerm(term: string) {
    if (term && !this.exactQuery.includes(term)) {
      this.exactQuery = [...this.exactQuery, term];
    }
  }

  removeMainTerm(term: string) {
    this.query = this.query.filter(t => t !== term);
  }

  removeExactTerm(term: string) {
    this.exactQuery = this.exactQuery.filter(t => t !== term);
  }

  addLikeTerm(term: string) {
    if (term && !this.likeQuery.includes(term)) {
      this.likeQuery = [...this.likeQuery, term];
    }
  }

  removeLikeTerm(term: string) {
    this.likeQuery = this.likeQuery.filter(t => t !== term);
  }

  addExcludeTerm(term: string) {
    if (term && !this.doesNotIncludeQuery.includes(term)) {
      this.doesNotIncludeQuery = [...this.doesNotIncludeQuery, term];
    }
  }

  removeExcludeTerm(term: string) {
    this.doesNotIncludeQuery = this.doesNotIncludeQuery.filter(t => t !== term);
  }

  addAllowedSite(site: string) {
    if (site && !this.allowedSites.includes(site)) {
      this.allowedSites = [...this.allowedSites, site];
    }
  }

  removeAllowedSite(site: string) {
    this.allowedSites = this.allowedSites.filter(s => s !== site);
  }

  addExcludedSite(site: string) {
    if (site && !this.excludedSites.includes(site)) {
      this.excludedSites = [...this.excludedSites, site];
    }
  }

  removeExcludedSite(site: string) {
    this.excludedSites = this.excludedSites.filter(s => s !== site);
  }

  setTimeRange(timeRange: TimeRange | undefined) {
    this.timeRange = timeRange;
  }

  addFileType(fileType: string) {
    if (fileType && !this.fileTypes.includes(fileType)) {
      this.fileTypes = [...this.fileTypes, fileType];
    }
  }

  removeFileType(fileType: string) {
    this.fileTypes = this.fileTypes.filter(ft => ft !== fileType);
  }
}

export const searchState = new SearchState();
