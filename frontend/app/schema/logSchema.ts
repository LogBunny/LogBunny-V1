export default interface LogType {
  level: string;
  color: string;
  timestamp: string;
  message: string;
  traceId: string;
  spanId: string;
  commit: string;
}
