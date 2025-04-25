import { search } from "$lib";
import { allowedSites } from "$lib/format_urls";

export function setSearch(jobTitle: string) {
  switch (jobTitle) {
    case "product-manager":
      search.set({
        searchName: jobTitle,
        allowedSites: allowedSites,
        provider: "google",
        searchWords: [],
        exactWords: ["product-manager"],
        likeWords: [],
        blockedWords: ["junior", "intern", "part-time"],
      });
      break;
    case "software-engineer":
      search.set({
        searchName: jobTitle,
        allowedSites: allowedSites,
        provider: "google",
        searchWords: ["fullstack"],
        exactWords: ["remote", "software engineer", "typescript"],
        likeWords: ["senior"],
        blockedWords: ["junior", "intern", "part-time"],
      });
      break;
    case "ui-ux-designer":
      search.set({
        searchName: jobTitle,
        allowedSites: allowedSites,
        provider: "google",
        searchWords: ["figma", "fullstack"],
        exactWords: ["remote", "designer"],
        likeWords: [],
        blockedWords: ["junior", "intern", "part-time"],
      });
      break;
    default:
      break;
  }
}
