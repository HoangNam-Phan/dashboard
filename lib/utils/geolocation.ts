type Geolocation = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

type Error = {
  code: any;
  PERMISSION_DENIED: any;
  POSITION_UNAVAILABLE: any;
  TIMEOUT: any;
};

function successCallback(position: Geolocation) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
}

function errorCallback(error: Error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error('User denied the request for geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      console.error('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      console.error('The request to get user location timed out.');
      break;
  }
}

export function getUserGeoLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log('Geolocation is not available in this browser.');
  }
}
