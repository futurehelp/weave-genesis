import { useEffect } from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Alert } from "react-native";

const GEOFENCE_TASK = "leave-home-task";

// 1. Define geofence task
TaskManager.defineTask(GEOFENCE_TASK, async ({ data, error }) => {
  if (error) {
    console.error("Geofence task error:", error);
    return;
  }

  if (!data) return;

  const {
    eventType,
    region,
  } = data as {
    eventType: Location.GeofencingEventType;
    region: Location.LocationRegion;
  };

  console.log("📍 Geofence event:", eventType, region);

  if (eventType === Location.GeofencingEventType.Exit) {
    Alert.alert("🏠 Leaving Home", "You've exited your apartment zone.");
  }
});

// 2. Hook to start geofencing
export default function useApartmentGeofence() {
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to detect when you leave your apartment."
        );
        return;
      }

      const homeRegion: Location.LocationRegion = {
        identifier: "apartment",
        latitude: 13.73195,
        longitude: 100.57138,
        radius: 175,
        notifyOnEnter: true,
        notifyOnExit: true,
      };

      // 🚨 Remove *all* stale geofence tasks before restarting
      const tasks = await TaskManager.getRegisteredTasksAsync();
      if (tasks.some(t => t.taskName === GEOFENCE_TASK)) {
        console.log("🧹 Stopping and unregistering old geofence task...");
        try {
          await Location.stopGeofencingAsync(GEOFENCE_TASK);
        } catch (err) {
          console.warn("Could not stop old task:", err);
        }
      }

      console.log("🟢 Starting new geofence task...");
      await Location.startGeofencingAsync(GEOFENCE_TASK, [homeRegion]);
    })();
  }, []);
}
