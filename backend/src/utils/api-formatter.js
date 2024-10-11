export function apiFormatter(data, status = 200, message = "success") {
  return {
    status,
    data,
    message,
  };
}
