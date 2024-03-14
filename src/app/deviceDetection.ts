// utils/useDeviceDetection.ts

import { useEffect } from 'react';

// Function to detect if the device is a mobile phone
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function redirectToMobileSite() {
  window.location.href = 'https://your-mobile-site-url.com';
}

const useDeviceDetection = () => {
  useEffect(() => {
    // Check if the device is a mobile phone
    if (isMobile()) {
      // Display alert if accessing from a mobile device
      alert('This website is not accessible from mobile devices. Please use a tablet or laptop.');
      redirectToMobileSite();
      // Optionally, you can log this event or perform any other actions

      // Prevent further execution of the useEffect hook
      return;
    }
  }, []);
};

export default useDeviceDetection;
