import type { SearchProvider, TimeRange } from "./search";
import { buildSearchURL, defaultJobSites } from "./search";

/**
 * State manager for search parameters using Svelte's $state reactivity
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
  }

  setJobSearchDefaults(jobTitle: string = "") {
    this.resetAll();
    this.query.push(jobTitle);
    this.allowedSites = [...defaultJobSites];
    this.timeRange = "past_day";
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
