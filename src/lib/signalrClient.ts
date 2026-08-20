import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";

export function createCommentaryHubConnection(): HubConnection {
  return new HubConnectionBuilder()
    .withUrl(import.meta.env.VITE_SIGNALR_HUB_URL)
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Debug)
    .build();
}

export { HubConnectionState };
