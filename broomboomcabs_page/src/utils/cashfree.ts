/**
 * Cashfree Payment Gateway Web Integration
 * Official JavaScript SDK v3 Wrapper
 */

export interface CashfreeCheckoutConfig {
  paymentSessionId: string;
  environment?: "sandbox" | "production";
  redirectTarget?: "_self" | "_blank" | "_modal";
}

/**
 * Loads the Cashfree JS SDK v3 script dynamically
 */
export function loadCashfreeSdk(): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Window is not defined"));
  }

  if ((window as any).Cashfree) {
    return Promise.resolve((window as any).Cashfree);
  }

  return new Promise((resolve, reject) => {
    const existing = document.getElementById("cashfree-js-sdk") as HTMLScriptElement | null;
    if (existing) {
      if ((window as any).Cashfree) {
        return resolve((window as any).Cashfree);
      }
      if (existing.dataset.error === "true") {
        existing.remove();
      } else {
        existing.addEventListener("load", () => {
          if ((window as any).Cashfree) {
            resolve((window as any).Cashfree);
          } else {
            reject(new Error("Cashfree SDK loaded but global object missing"));
          }
        });
        existing.addEventListener("error", () => {
          existing.dataset.error = "true";
          reject(new Error("Failed to load Cashfree SDK script"));
        });
        return;
      }
    }

    const script = document.createElement("script");
    script.id = "cashfree-js-sdk";
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;

    script.onload = () => {
      if ((window as any).Cashfree) {
        resolve((window as any).Cashfree);
      } else {
        reject(new Error("Cashfree global object not found on window"));
      }
    };

    script.onerror = () => {
      script.dataset.error = "true";
      reject(new Error("Failed to load Cashfree JavaScript SDK"));
    };

    document.head.appendChild(script);
  });
}

/**
 * Redirects the user to Cashfree Payment Gateway to complete payment
 */
export async function triggerCashfreePayment(config: CashfreeCheckoutConfig): Promise<void> {
  if (typeof window === "undefined") return;

  if (!config.paymentSessionId) {
    throw new Error("Missing Cashfree paymentSessionId");
  }

  const mode = config.environment === "production" ? "production" : "sandbox";

  const Cashfree = await loadCashfreeSdk();
  const cashfree = await Promise.resolve(Cashfree({ mode }));

  if (!cashfree || typeof cashfree.checkout !== "function") {
    throw new Error("Cashfree checkout SDK did not initialize properly");
  }

  const result = await cashfree.checkout({
    paymentSessionId: config.paymentSessionId,
    redirectTarget: config.redirectTarget || "_self",
  });

  if (result?.error) {
    throw new Error(result.error.message || "Cashfree checkout failed");
  }
}

