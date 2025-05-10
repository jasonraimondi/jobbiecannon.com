<!-- SearchBuilder.svelte -->
<script lang="ts">
  import { searchState } from "$lib/state.svelte";

  // Reactive value for current URL
  $effect(() => {
    googleUrl = searchState.getSearchURL("google").toString();
    bingUrl = searchState.getSearchURL("bing").toString();
    kagiUrl = searchState.getSearchURL("kagi").toString();
  });

  let newQuery = $state("");
  let newExactTerm = $state("");
  let newSite = $state("");
  let bingUrl = $derived(searchState.getSearchURL("bing").toString());
  let googleUrl = $derived(searchState.getSearchURL("google").toString());
  let kagiUrl = $derived(searchState.getSearchURL("kagi").toString());

  function handleAddMainTerm() {
    if (newQuery) {
      searchState.addMainTerm(newQuery);
      newQuery = "";
    }
  }

  function handleAddExactTerm() {
    if (newExactTerm) {
      searchState.addExactTerm(newExactTerm);
      newExactTerm = "";
    }
  }

  function handleAddSite() {
    if (newSite) {
      searchState.addAllowedSite(newSite);
      newSite = "";
    }
  }
</script>

<div class="search-builder">
  <h2>Search Builder</h2>

  <div class="main-query">
    <h3>Main Terms</h3>
    <div class="input-with-button">
      <input type="text" bind:value={newQuery} placeholder="Add main term..." />
      <button onclick={handleAddMainTerm}>Add</button>
    </div>

    {#if searchState.query.length > 0}
      <ul class="tags">
        {#each searchState.query as term}
          <li class="tag">
            "{term}"
            <button class="remove" onclick={() => searchState.removeMainTerm(term)}>×</button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="exact-terms">
    <h3>Exact Terms</h3>
    <div class="input-with-button">
      <input type="text" bind:value={newExactTerm} placeholder="Add exact term..." />
      <button onclick={handleAddExactTerm}>Add</button>
    </div>

    {#if searchState.exactQuery.length > 0}
      <ul class="tags">
        {#each searchState.exactQuery as term}
          <li class="tag">
            "{term}"
            <button class="remove" onclick={() => searchState.removeExactTerm(term)}>×</button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="like-terms">
    <h3>Similar Terms</h3>
    <div class="input-with-button">
      <input
        type="text"
        placeholder="Add similar term..."
        onkeydown={e =>
          e.key === "Enter" &&
          searchState.addLikeTerm(e.currentTarget.value) &&
          (e.currentTarget.value = "")}
      />
      <button
        onclick={e => {
          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
          searchState.addLikeTerm(input.value);
          input.value = "";
        }}>Add
      </button
      >
    </div>

    {#if searchState.likeQuery.length > 0}
      <ul class="tags">
        {#each searchState.likeQuery as term}
          <li class="tag">
            ~{term}
            <button class="remove" onclick={() => searchState.removeLikeTerm(term)}>×</button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="excluded-terms">
    <h3>Excluded Terms</h3>
    <div class="input-with-button">
      <input
        type="text"
        placeholder="Add excluded term..."
        onkeydown={e =>
          e.key === "Enter" &&
          searchState.addExcludeTerm(e.currentTarget.value) &&
          (e.currentTarget.value = "")}
      />
      <button
        onclick={e => {
          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
          searchState.addExcludeTerm(input.value);
          input.value = "";
        }}>Add
      </button
      >
    </div>

    {#if searchState.doesNotIncludeQuery.length > 0}
      <ul class="tags">
        {#each searchState.doesNotIncludeQuery as term}
          <li class="tag">
            -{term}
            <button class="remove" onclick={() => searchState.removeExcludeTerm(term)}>×</button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="allowed-sites">
    <h3>Allowed Sites</h3>
    <div class="input-with-button">
      <input type="text" bind:value={newSite} placeholder="Add domain (e.g. example.com)..." />
      <button onclick={handleAddSite}>Add</button>
    </div>

    {#if searchState.allowedSites.length > 0}
      <ul class="tags">
        {#each searchState.allowedSites as site}
          <li class="tag">
            {site}
            <button class="remove" onclick={() => searchState.removeAllowedSite(site)}>×</button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="time-range">
    <label>
      Time Range:
      <select bind:value={searchState.timeRange}>
        <option value={undefined}>Any time</option>
        <option value="past_hour">Past hour</option>
        <option value="past_day">Past day</option>
        <option value="past_week">Past week</option>
        <option value="past_month">Past month</option>
        <option value="past_year">Past year</option>
      </select>
    </label>
  </div>

  <div class="presets">
    <h3>Presets</h3>
    <button onclick={() => searchState.setJobSearchDefaults()}>Job Search</button>
    <button onclick={() => searchState.resetAll()}>Reset All</button>
  </div>

  <div class="results">
    <h3>Generated URL</h3>
    <div class="url-display">
      <code>{googleUrl}</code>
    </div>
    <div class="url-display">
      <code>{bingUrl}</code>
    </div>
    <div class="url-display">
      <code>{kagiUrl}</code>
    </div>

    <footer class="flex gap-2">
      <a href={googleUrl} target="_blank" rel="noopener noreferrer">
        <button class="search-button">Google</button>
      </a>

      <a href={kagiUrl} target="_blank" rel="noopener noreferrer">
        <button class="search-button">Kagi</button>
      </a>

      <a href={bingUrl} target="_blank" rel="noopener noreferrer">
        <button class="search-button">Bing</button>
      </a>
    </footer>
  </div>
</div>

<style>
  .search-builder {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  h3 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .input-with-button {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  input,
  select {
    padding: 0.5rem;
    border: 1px solid var(--color-gray-500);
    border-radius: 4px;
    font-size: 1rem;
  }

  input {
    flex-grow: 1;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: var(--color-primary);
    color: var(--foreground-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: var(--color-primary-dark);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
  }

  .tag {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background-color: var(--background-color);
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .tag .remove {
    background: none;
    color: #666;
    border: none;
    padding: 0 0.25rem;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .url-display {
    background-color: var(--background-color);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    overflow-x: auto;
  }

  code {
    font-family: monospace;
    font-size: 0.9rem;
    word-break: break-all;
  }

  .search-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4a56e2;
    font-weight: bold;
  }
</style>
