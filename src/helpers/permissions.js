export const getGeolocationPermission = async () => {
  if (!navigator.permissions)
    throw new Error("Your device does not support permission API");

  const permission = await navigator.permissions.query({
    name: "geolocation"
  });

  return permission;
};
