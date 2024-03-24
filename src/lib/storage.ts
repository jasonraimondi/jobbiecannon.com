import { LocalStorage } from '@jmondi/browser-storage';

const localStorageService = new LocalStorage();
export const LOCAL_STORAGE = localStorageService.defineGroup({
	additional_sites: 'additional_sites',
	full_search: 'full_search'
});
