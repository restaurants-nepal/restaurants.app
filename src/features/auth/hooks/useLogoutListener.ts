import { useEffect } from "react";
import { LocalStorageKeys } from "@/shared/enums/localstorage";

export default function useLogoutListener(): void {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // Check if the user key is removed from localStorage
      if (event.key === LocalStorageKeys.USER && !event.newValue) {
        // Redirect to the login page
        window.location.href = "/login";
        // history.push(loginRoute);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
}
