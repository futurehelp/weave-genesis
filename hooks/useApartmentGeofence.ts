import { useEffect } from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Alert } from "react-native";

const GEOFENCE_TASK = "leave-home-task";
let fenceStartedAt: number;

// 1. Define geofence task
TaskManager.defineTask(GEOFENCE_TASK, async ({ data, error }) => {
  if (error) {
    console.error("Geofence task error:", error);
    return;
  }
  if (!data) {
    return;
  }

  const { eventType } = data as {
    eventType: Location.GeofencingEventType;
    region: Location.LocationRegion;
  };

  console.log("📍 Geofence event:", eventType);
  // Ignore any exit events within the first minute to avoid spurious triggers
  if (Date.now() - fenceStartedAt < 60_000) {
    console.log("⚠️ Ignoring initial exit event");
    return;
  }

  if (eventType === Location.GeofencingEventType.Exit) {
    Alert.alert("🏠 Leaving Home", "You've exited your apartment zone.");
  }
});

// 2. Hook to start geofencing
export default function useApartmentGeofence() {
  useEffect(() => {
    (async () => {
      // 2.1 Request foreground and background permissions
      const fg = await Location.requestForegroundPermissionsAsync();
      const bg = await Location.requestBackgroundPermissionsAsync();
      if (fg.status !== "granted" || bg.status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to detect when you leave your apartment."
        );
        return;
      }

      // 2.2 Define your home region
      const HOME_LAT = 13.731970674544225;
      const HOME_LNG = 100.57140356554798;
      const HOME_RADIUS = 175;
      const homeRegion: Location.LocationRegion = {
        identifier: "apartment",
        latitude: HOME_LAT,
        longitude: HOME_LNG,
        radius: HOME_RADIUS,
        notifyOnEnter: false,
        notifyOnExit: true,
      };

      // 2.3 Clean up any existing geofence task
      const tasks = await TaskManager.getRegisteredTasksAsync();
      if (tasks.some((t) => t.taskName === GEOFENCE_TASK)) {
        try {
          await Location.stopGeofencingAsync(GEOFENCE_TASK);
        } catch {
          console.warn("Could not stop old geofence task");
        }
      }

      // 2.4 Prime and verify current location is within your apartment
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const distance = getDistanceFromLatLonInMeters(
        coords.latitude,
        coords.longitude,
        HOME_LAT,
        HOME_LNG
      );
      if (distance > HOME_RADIUS) {
        console.warn(`Skipping fence: ${distance.toFixed(0)}m from home`);
        return;
      }

      // 2.5 Start the geofence task
      fenceStartedAt = Date.now();
      await Location.startGeofencingAsync(GEOFENCE_TASK, [homeRegion]);
      console.log("🟢 Geofence started at", new Date(fenceStartedAt).toISOString());
    })();
  }, []);
}

// Haversine helper to calculate distance in meters between two lat/lng pairs
function getDistanceFromLatLonInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371000; // Earth radius in meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
