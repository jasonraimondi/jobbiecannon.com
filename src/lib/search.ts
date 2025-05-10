export type TimeRange =
  | "past_hour"
  | "past_day"
  | "past_week"
  | "past_month"
  | "past_year"
  | "custom";

export type SearchProvider = "google" | "bing" | "kagi";

export interface SearchArgs {
  // Basic search configuration
  provider: SearchProvider;
  query?: string[];

  // Advanced query parameters
  exactQuery?: string[]; // Phrases that must appear exactly as written
  likeQuery?: string[]; // Terms that are similar or related
  doesNotIncludeQuery?: string[]; // Terms to exclude

  // Site-specific search
  allowedSites?: string[]; // Domains to include in search
  excludedSites?: string[]; // Domains to exclude from search

  // Time filters
  timeRange?: TimeRange;
  customTimeRangeStart?: Date; // For custom time range
  customTimeRangeEnd?: Date; // For custom time range

  // File type filters
  fileTypes?: string[]; // e.g., 'pdf', 'doc', etc.

  // Language filter
  language?: string; // e.g., 'en', 'es', etc.

  // Additional features
  safeSearch?: boolean; // Enable/disable safe search
  numResults?: number; // Number of results per page (where supported)
}

// Default job search sites
export const defaultJobSites = [
  "greenhouse.io",
  "lever.co",
  "jobs.ashbyhq.com",
  "app.dover.io",
  "angel.co",
  "useparallel.com",
  "wellfound.com",
  "builtin.com",
  "apply.workable.com",
  "indeed.com",
  "linkedin.com/jobs",
  "glassdoor.com",
  "ziprecruiter.com",
];

/**
 * Formats an array of domains as a search engine site filter
 */
function formatAllowedSites(domains: string[]): string {
  if (!domains.length) return "";

  const siteQueries = domains.map(domain => `site:${domain}`);
  return `(${siteQueries.join(" OR ")})`;
}

/**
 * Formats an array of excluded domains
 */
function formatExcludedSites(domains: string[]): string {
  if (!domains.length) return "";

  return domains.map(domain => `-site:${domain}`).join(" ");
}

/**
 * Formats basic match phrases (quoted)
 */
function formatBasicPhrases(phrases: string[]): string {
  if (!phrases.length) return "";

  return phrases.join(" ");
}

/**
 * Formats exact match phrases (quoted)
 */
function formatExactPhrases(phrases: string[]): string {
  if (!phrases.length) return "";

  return phrases.map(phrase => `"${phrase}"`).join(" ");
}

/**
 * Formats similar/related terms with the tilde operator
 */
function formatSimilarTerms(terms: string[]): string {
  if (!terms.length) return "";

  return terms.map(term => `~${term}`).join(" ");
}

/**
 * Formats excluded terms/phrases
 */
function formatExcludedTerms(terms: string[]): string {
  if (!terms.length) return "";

  return terms
    .map(term => {
      // If term contains spaces, wrap in quotes for exact exclusion
      return term.includes(" ") ? `-"${term}"` : `-${term}`;
    })
    .join(" ");
}

/**
 * Formats file type filters
 */
function formatFileTypes(types: string[]): string {
  if (!types.length) return "";

  return types.map(type => `filetype:${type}`).join(" OR ");
}

/**
 * Converts a TimeRange to the appropriate query parameter for each search engine
 */
function getTimeRangeParam(
  provider: SearchProvider,
  timeRange?: TimeRange,
): Record<string, string> {
  if (!timeRange) return {};

  switch (provider) {
    case "google":
      switch (timeRange) {
        case "past_hour":
          return { tbs: "qdr:h" };
        case "past_day":
          return { tbs: "qdr:d" };
        case "past_week":
          return { tbs: "qdr:w" };
        case "past_month":
          return { tbs: "qdr:m" };
        case "past_year":
          return { tbs: "qdr:y" };
        default:
          return {};
      }

    case "bing":
      switch (timeRange) {
        case "past_hour":
          return { filters: 'ex1:"ez1"' };
        case "past_day":
          return { filters: 'ex1:"ez2"' };
        case "past_week":
          return { filters: 'ex1:"ez3"' };
        case "past_month":
          return { filters: 'ex1:"ez4"' };
        case "past_year":
          return { filters: 'ex1:"ez5"' };
        default:
          return {};
      }

    case "kagi":
      switch (timeRange) {
        case "past_hour":
          return { time: "1h" };
        case "past_day":
          return { time: "1d" };
        case "past_week":
          return { time: "1w" };
        case "past_month":
          return { time: "1m" };
        case "past_year":
          return { time: "1y" };
        default:
          return {};
      }

    default:
      return {};
  }
}

/**
 * Builds a search URL based on provided arguments
 */
export function buildSearchURL(args: SearchArgs): URL {
  // Set base search URL according to provider
  const baseUrls: Record<SearchProvider, string> = {
    google: "https://www.google.com/search",
    bing: "https://www.bing.com/search",
    kagi: "https://kagi.com/search",
  };

  const url = new URL(baseUrls[args.provider]);

  // Build the query string components
  const queryParts: string[] = [];

  // Add main query if provided
  if (args.query?.length) {
    queryParts.push(formatBasicPhrases(args.query));
  }

  // Add exact phrases
  if (args.exactQuery?.length) {
    queryParts.push(formatExactPhrases(args.exactQuery));
  }

  // Add similar terms
  if (args.likeQuery?.length) {
    queryParts.push(formatSimilarTerms(args.likeQuery));
  }

  // Add excluded terms
  if (args.doesNotIncludeQuery?.length) {
    queryParts.push(formatExcludedTerms(args.doesNotIncludeQuery));
  }

  // Add allowed sites
  if (args.allowedSites?.length) {
    queryParts.push(formatAllowedSites(args.allowedSites));
  }

  // Add excluded sites
  if (args.excludedSites?.length) {
    queryParts.push(formatExcludedSites(args.excludedSites));
  }

  // Add file type filters
  if (args.fileTypes?.length) {
    queryParts.push(formatFileTypes(args.fileTypes));
  }

  // Set the main query parameter
  url.searchParams.set("q", queryParts.join(" "));

  // Add time range parameters
  const timeParams = getTimeRangeParam(args.provider, args.timeRange);
  Object.entries(timeParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  // Set language if provided
  if (args.language) {
    switch (args.provider) {
      case "google":
        url.searchParams.set("hl", args.language);
        break;
      case "bing":
        url.searchParams.set("setlang", args.language);
        break;
      case "kagi":
        url.searchParams.set("lang", args.language);
        break;
    }
  }

  // Set safe search if provided
  if (args.safeSearch !== undefined) {
    if (args.provider === "google") {
      url.searchParams.set("safe", args.safeSearch ? "active" : "off");
    } else if (args.provider === "bing") {
      url.searchParams.set("safeSearch", args.safeSearch ? "strict" : "off");
    }
    // Kagi doesn't have a URL param for safe search
  }

  // Set number of results where supported
  if (args.numResults && (args.provider === "google" || args.provider === "bing")) {
    url.searchParams.set("num", args.numResults.toString());
  }

  return url;
}

/**
 * Convenience function to build a job search URL
 */
export function buildJobSearchURL(args: {
  provider: SearchProvider;
  jobTitle: string;
  location?: string;
  remote?: boolean;
  timeRange?: TimeRange;
  excludeTerms?: string[];
  sites?: string[];
}): URL {
  const { provider, jobTitle, location, remote, timeRange, excludeTerms, sites } = args;

  // Build job search query
  const query = [jobTitle];
  if (location) {
    query.push(location);
  }
  if (remote) {
    query.push("remote");
  }

  return buildSearchURL({
    provider,
    query,
    exactQuery: [jobTitle],
    doesNotIncludeQuery: excludeTerms,
    allowedSites: sites || defaultJobSites,
    timeRange: timeRange || "past_week",
  });
}
