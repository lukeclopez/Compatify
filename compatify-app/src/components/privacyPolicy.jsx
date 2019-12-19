import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <h1>Privacy Policy</h1>
      <h2>What Data Do We Store?</h2>
      <ul>
        <li>Your Spotify User ID.</li>
        <li>A list of your top songs.</li>
        <li>A list of your top artists.</li>
      </ul>
      <p>
        All other metrics are calculated from the above. You can delete all of
        your data from our servers at any time by going to your profile and
        clicking on the 'Options' tab, then the 'Delete My Data' button.
      </p>
      <p>
        All data transfer is encrypted (see the 'https' at the beginning of the
        url). Email addresses and passwords are NEVER stored.
      </p>
      <p>
        If you wish to see all your stored data or if you feel that we haven't
        abided by the policy as stated above, don't hesitate to reach out to us
        at{" "}
        <a className="text-white" href="mailto:mail@compatify.io">
          mail@compatify.io
        </a>
      </p>
    </>
  );
};

export default PrivacyPolicy;
