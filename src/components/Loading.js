import React from "react";
import Alert from "./Alert";
import Error from "./Error";
import Spinner from "./LoadingSpinner";

// eslint-disable-next-line
function Loading({ error, timedOut, pastDelay, retry }) {
  if (error) {
    return (
      <div className="centered">
        <Error retry={retry} />
      </div>
    );
  } else if (timedOut) {
    return (
      <Alert
        title="خطا در اتصال به اینترنت..."
        description="لطفا از متصل بودن به اینترنت مطمئن شده سپس مجددا تلاش کنید"
        icon="/svg/no-wifi.svg"
        visible
        positiveText="تلاش مجدد"
        onClose={retry}
      />
    );
  } else if (pastDelay) {
    return (
      <div className="centered">
        <Spinner style={{ width: "32px", height: "32px" }} />
        <h2 className="mt-2 mb-0">Loading Splitted Chunk</h2>
      </div>
    );
  }
  return null;
}

export default Loading;
