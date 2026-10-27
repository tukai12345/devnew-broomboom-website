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
      existing.addEventListener("load", () => {
        resolve((window as any).Cashfree);
      });
      existing.addEventListener("error", () => {
        reject(new Error("Failed to load Cashfree SDK script"));
      });
      return;
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

  const mode = config.environment === "production" ? "production" : "sandbox";

  try {
    const Cashfree = await loadCashfreeSdk();
    const cashfree = Cashfree({ mode });

    // Redirect the current browser window directly to Cashfree
    cashfree.checkout({
      paymentSessionId: config.paymentSessionId,
      redirectTarget: config.redirectTarget || "_self",
    });
  } catch (err) {
    console.warn("Cashfree SDK failed to initialize, attempting fallback checkout redirect:", err);

    // Fallback: direct browser redirect to hosted checkout
    const host =
      mode === "production"
        ? "https://api.cashfree.com/pg/view/sessions/checkout"
        : "https://sandbox.cashfree.com/pg/view/sessions/checkout";

    window.location.href = `${host}?payment_session_id=${encodeURIComponent(config.paymentSessionId)}`;
  }
}

