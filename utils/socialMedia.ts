export const extractFacebookUsername = (facebookId: string) => {
  try {
    // If it's a full URL
    if (facebookId.includes("facebook.com")) {
      const url = new URL(facebookId);
      // Remove trailing slash if present
      return url.pathname.replace(/^\/|\/$/g, "");
    }
    // If it's just a username or profile ID
    return facebookId.replace(/^\/|\/$/g, "");
  } catch {
    // If URL parsing fails, just return the original input without slashes
    return facebookId.replace(/^\/|\/$/g, "");
  }
};

export const getFacebookUrl = (facebookId: string) => {
  // If it's already a full URL, return it
  if (facebookId.startsWith("http")) {
    return facebookId;
  }
  // Otherwise, construct the URL
  return `https://facebook.com/${facebookId.replace(/^\/|\/$/g, "")}`;
};
