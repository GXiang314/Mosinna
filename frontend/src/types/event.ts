export type SSEEventType =
  | "VideoUploaded"
  | "VideoCheckFinished"
  | "AllCheckFinished"
  | "ValidationError";

export type SSEEventDataMap = {
  [key in SSEEventType]: key extends "VideoUploaded"
    ? VideoUploadedData
    : key extends "VideoCheckFinished"
    ? VideoCheckFinishedData
    : key extends "ValidationError"
    ? ValidationError
    : key extends "AllCheckFinished"
    ? AllCheckFinishedData
    : never;
};

export class SSEEvent<
  EventType extends SSEEventType,
  EventData = SSEEventDataMap[EventType]
> {
  public type: EventType;
  public data: EventData;

  constructor(type: EventType, data: EventData) {
    this.type = type;
    this.data = data;
  }
}

export interface VideoUploadedData {
  checkServices: {
    id: string;
    name: string;
  }[];
}

export class VideoUploadedEvent extends SSEEvent<
  "VideoUploaded",
  VideoUploadedData
> {
  constructor(checkServices: { id: string; name: string }[]) {
    super("VideoUploaded", {
      checkServices: checkServices.map((service) => ({
        id: service.id,
        name: service.name,
      })),
    });
  }
}

export interface VideoCheckFinishedData {
  id: string;
  name: string;
  result: "pass" | "risky";
  details:
    | {
        [key: string]: any;
      }
    | string;
}

export class VideoCheckFinishedEvent extends SSEEvent<
  "VideoCheckFinished",
  VideoCheckFinishedData
> {
  constructor(
    id: string,
    name: string,
    result: "pass" | "risky",
    details: { [key: string]: any } | string
  ) {
    super("VideoCheckFinished", {
      id,
      name,
      result,
      details,
    });
  }
}

export interface ValidationError {
  message: string;
}

export class ValidationErrorEvent extends SSEEvent<
  "ValidationError",
  ValidationError
> {
  constructor(message: string) {
    super("ValidationError", { message });
  }
}

export type AllCheckFinishedData = {
  message: string;
};

export class AllCheckFinishedEvent extends SSEEvent<
  "AllCheckFinished",
  AllCheckFinishedData
> {
  constructor(message: string) {
    super("AllCheckFinished", { message });
  }
}
