"use client";

export interface AuthUser {
  id?: string;
  identifier: string;
  role: string;
  name?: string;
  phone?: string;
  email?: string;
}

export const AUTH_STORAGE_KEY = "broomboom_user";
export const AUTH_LAST_ACTIVE_KEY = "broomboom_last_active";
// Auto-logout after 30 minutes of complete inactivity while tab is open
export const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

/**
 * Returns the currently authenticated user for this active browser session.
 * Automatically logs out if the user left the website or session expired.
 */
export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    // 1. Clear any legacy persistent localStorage logins so user is not logged in across closed sessions
    if (localStorage.getItem(AUTH_STORAGE_KEY)) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    // 2. Check active session storage (automatically cleared by browser when user leaves the website/closes tab)
    const sessionData = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!sessionData) return null;

    // 3. Inactivity timeout check (if user left the website open and inactive for > 30 minutes)
    const lastActiveStr = sessionStorage.getItem(AUTH_LAST_ACTIVE_KEY);
    if (lastActiveStr) {
      const lastActive = parseInt(lastActiveStr, 10);
      if (Date.now() - lastActive > INACTIVITY_TIMEOUT_MS) {
        // Session expired due to inactivity
        removeStoredUser();
        return null;
      }
    }

    // Update last active timestamp
    sessionStorage.setItem(AUTH_LAST_ACTIVE_KEY, Date.now().toString());
    return JSON.parse(sessionData);
  } catch (err) {
    console.error("Error reading session user:", err);
    return null;
  }
}

/**
 * Saves authenticated user to sessionStorage for the current session only.
 * Dispatches an auth change event to instantly update the UI.
 */
export function setStoredUser(user: AuthUser): void {
  if (typeof window === "undefined") return;

  try {
    // Store in sessionStorage so it is automatically cleared when the user closes the website
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    sessionStorage.setItem(AUTH_LAST_ACTIVE_KEY, Date.now().toString());

    // Ensure it is NOT kept in localStorage
    localStorage.removeItem(AUTH_STORAGE_KEY);

    window.dispatchEvent(new Event("broomboom_auth_change"));
  } catch (err) {
    console.error("Error saving session user:", err);
  }
}

/**
 * Logs out the user and cleans up all session tokens.
 */
export function removeStoredUser(): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_LAST_ACTIVE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);

    window.dispatchEvent(new Event("broomboom_auth_change"));
  } catch (err) {
    console.error("Error clearing session user:", err);
  }
}

/**
 * Quick boolean check if a user is currently logged in.
 */
export function isUserLoggedIn(): boolean {
  return Boolean(getStoredUser());
}

/**
 * Global activity listener to update last active timestamp on user interaction
 */
if (typeof window !== "undefined") {
  const updateActivity = () => {
    if (sessionStorage.getItem(AUTH_STORAGE_KEY)) {
      sessionStorage.setItem(AUTH_LAST_ACTIVE_KEY, Date.now().toString());
    }
  };

  // Update activity timestamp on click, keydown, touch
  window.addEventListener("click", updateActivity, { passive: true });
  window.addEventListener("keydown", updateActivity, { passive: true });
  window.addEventListener("touchstart", updateActivity, { passive: true });

  // When tab visibility changes or user returns to tab, check if session timed out
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      getStoredUser(); // Will auto-logout if inactivity timeout was exceeded
    }
  });
}

