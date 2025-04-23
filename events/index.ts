export type SSEEventType =
  | "VideoUploaded"
  | "VideoCheckFinished"
  | "AllCheckFinished"
  | "ValidationError";

export class SSEEvent<T> {
  protected type: SSEEventType;
  protected data: T;

  constructor(type: SSEEventType, data: T) {
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

export class VideoUploadedEvent extends SSEEvent<VideoUploadedData> {
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

export class VideoCheckFinishedEvent extends SSEEvent<VideoCheckFinishedData> {
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

export class ValidationErrorEvent extends SSEEvent<ValidationError> {
  constructor(message: string) {
    super("ValidationError", { message });
  }
}

export type AllCheckFinishedData = {
  message: string;
}

export class AllCheckFinishedEvent extends SSEEvent<AllCheckFinishedData> {
  constructor(message: string) {
    super("AllCheckFinished", { message });
  }
}
