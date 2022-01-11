// variables with paths to api endpoints
export const API_URL = `${process.env.DOMAIN}/api`; // check next.config.js to see domain

// auth
export const LOGIN_API_URL = `${API_URL}/auth/login`;
export const REGISTER_API_URL = `${API_URL}/auth/register`;
export const LOGOUT_API_URL = `${API_URL}/auth/logout`;
export const REFRESH_API_URL = `${API_URL}/auth/refresh`;

// password recovery
export const RECOVERY_API_URL = `${API_URL}/auth/recovery`;

// email confirm
export const CONFIRM_API_URL = `${API_URL}/auth/confirm`;


// groups CRUD
export const GROUP_CREATE_URL = `${API_URL}/groups/create`;
export const GROUP_UPDATE_URL = `${API_URL}/groups/update`;
export const GROUP_DELETE_URL = `${API_URL}/groups/delete`;

// collections CRUD
export const COLLECTION_CREATE_URL = `${API_URL}/collections/create`;
export const COLLECTION_UPDATE_URL = `${API_URL}/collections/update`;
export const COLLECTION_DELETE_URL = `${API_URL}/collections/delete`;
export const COLLECTION_DELETE_EMPTY_URL = `${API_URL}/collections/delete-empty`;


// bookmarks CRUD
export const BOOKMARK_CREATE_URL = `${API_URL}/bookmarks/create`;
export const BOOKMARK_UPDATE_URL = `${API_URL}/bookmarks/update`;
export const BOOKMARK_DELETE_URL = `${API_URL}/bookmarks/delete`;