import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";
import { Alert } from "react-native";

const GEOFENCE_TASK = "leave-home-task";

// 1. Register background geofencing task
TaskManager.defineTask(GEOFENCE_TASK, async ({ data, error }) => {
  if (error) {
    console.error("Geofence task error:", error);
    return;
  }

  const { eventType } = data as {
    eventType: Location.GeofencingEventType;
    region?: {
      identifier: string;
      latitude: number;
      longitude: number;
      radius: number;
    };
  };

  if (eventType === Location.GeofencingEventType.Exit) {
    Alert.alert(
      "🏠 Leaving Home",
      "You've exited your apartment zone.",
      [{ text: "OK", style: "default" }],
      { cancelable: true }
    );
  }
});

// 2. Hook to start geofencing
export default function useApartmentGeofence() {
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location Denied", "Cannot monitor location in background.");
        return;
      }

      const homeRegion = {
        identifier: "apartment",
        latitude: 13.7228,     // Replace with your actual apartment location
        longitude: 100.5898,
        radius: 50
      };

      const tasks = await TaskManager.getRegisteredTasksAsync();
      const alreadyRunning = tasks.some(t => t.taskName === GEOFENCE_TASK);

      if (!alreadyRunning) {
        await Location.startGeofencingAsync(GEOFENCE_TASK, [homeRegion]);
      }
    })();
  }, []);
}
