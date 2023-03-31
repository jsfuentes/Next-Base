import { GoogleOAuthProvider } from "@react-oauth/google";
import conf from "conf";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ErrorBoundary from "src/components/ErrorBoundary";
import ErrorManager from "src/components/ErrorManager";
import UserProvider from "src/contexts/UserProvider";
import { store } from "src/redux/store";
import "src/styles/globals.css";

const debug = require("debug")("app:pages:_app");
// const IS_SENTRY_ACTIVE =
//   conf.has("SENTRY_DNS") && conf.get("SENTRY_DNS") !== "";

// // function setLGSession() {
// //   LogRocket.getSessionURL((sessionURL) => {
// //     Sentry.setContext("LG", { sessionURL });
// //     console.log("LG", sessionURL);
// //     segmentUserAction("LogRocket", {
// //       sessionURL: sessionURL,
// //     });
// //   });
// // }

// if (process.env.NODE_ENV !== "testing") {
//   // LogRocket.init(conf.get("LOGROCKET_KEY"));
//   // posthog.init(conf.get(POSTHOG_KEY), {
//   //   api_host: "https://app.posthog.com",
//   //   autocapture: false,
//   //   capture_pageview: false,
//   //   opt_out_capturing_by_default: true,
//   // });
// }

// if (process.env.NODE_ENV !== "production") {
//   localStorage.debug = "app:*";
// } else {
//   // localStorage.debug = null; //Set to null to not print in prod
//   localStorage.debug = "app:*";

//   //check for existence because optional
//   if (IS_SENTRY_ACTIVE) {
//     console.log("Sentry stationed");
//     Sentry.init({
//       environment: process.env.NODE_ENV,
//       dsn: conf.get("SENTRY_DNS"),
//       // This enables automatic instrumentation (highly recommended), but is not
//       // necessary for purely manual usage
//       integrations: [
//         new BrowserTracing({
//           // routingInstrumentation: Sentry.reactRouterV6Instrumentation(history),
//           tracingOrigins: ["localhost", conf.get("CLIENT_URL"), /^\//],
//           // ... other options
//         }),
//       ],

//       // To set a uniform sample rate
//       tracesSampleRate: 0.2,
//     });
//     // setFSSession();
//     // setLGSession();
//   }
// }

if (typeof localStorage !== "undefined") {
  setTimeout(() => {
    console.log("Debugging enabledd");
    localStorage.debug = "app:*";
  }, 3000);
}

export default function App({ Component, pageProps }: AppProps) {
  debug("GCLIENT", conf.get("GOOGLE_CLIENT_ID"));
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <UserProvider>
          <GoogleOAuthProvider clientId={conf.get("GOOGLE_CLIENT_ID")}>
            <ErrorManager>
              <ToastContainer
                bodyClassName="px-2 text-white font-medium w-full relative min-w-full "
                toastClassName="py-3 rounded bg-gray-900 flex items-center justify-center min-h-0 shadow-md " //disable default min height
                closeButton={false}
                position={toast.POSITION.TOP_CENTER}
                autoClose={4000} //false to disable
                closeOnClick={true}
                pauseOnHover={true}
                pauseOnFocusLoss={false}
              />

              <Component {...pageProps} />
            </ErrorManager>
          </GoogleOAuthProvider>
        </UserProvider>
      </Provider>
    </ErrorBoundary>
  );
}
