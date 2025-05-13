import { useEffect } from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Alert } from "react-native";

const GEOFENCE_TASK = "leave-home-task";

// 1. Define the geofence task (now async + typed)
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
        radius: 75,
        notifyOnEnter: true,
        notifyOnExit: true,
      };

      const tasks = await TaskManager.getRegisteredTasksAsync();
      const alreadyRunning = tasks.some(task => task.taskName === GEOFENCE_TASK);

      if (alreadyRunning) {
        console.log("🟡 Stopping existing geofence task...");
        await Location.stopGeofencingAsync(GEOFENCE_TASK);
      }

      console.log("🟢 Starting geofence task...");
      await Location.startGeofencingAsync(GEOFENCE_TASK, [homeRegion]);
    })();
  }, []);
}
