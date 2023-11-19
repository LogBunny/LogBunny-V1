"use client";
import { useEffect, useState } from "react";
import LogType from "../schema/logSchema";
import Link from "next/link";

export default function LogFile() {
  const [level, setLevel] = useState("");
  const [msg, setMsg] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [traceId, setTraceId] = useState("");
  const [spanId, setSpanId] = useState("");
  const [commit, setCommit] = useState("");
  const [parentResourceId, setParentResourceId] = useState("");
  const [logs, setLogs] = useState<LogType[]>([]);
  useEffect(() => {
    console.log("meow", level, spanId, traceId);
    const queryParams = {
      level: level,
      msg_regex: msg,
      resource_id: resourceId,
      trace_id: traceId,
      span_id: spanId,
      commit: commit,
      parent_resource_id: parentResourceId,
      from_timestamp: from,
      to_timestamp: to,
    };
    //generating query params
    const queryString = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    const url = `https://sabertooth.fly.dev/logs?${queryString}`;

    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();
      const logData = data.data;
      logData.map((log: any) => {
        switch (log.level) {
          case "info":
            log.color = "text-cyan-400";
            break;
          case "debug":
            log.color = "text-yellow-400";
            break;
          case "error":
            log.color = "text-red-400";
            break;
        }
      });

      setLogs(logData);
    }
    fetchData();
  }, [
    level,
    msg,
    resourceId,
    traceId,
    spanId,
    commit,
    parentResourceId,
    to,
    from,
  ]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="w-screen text-end p-2 items-end">
        <span className="underline">
          <Link href="/">Realtime</Link>
        </span>
      </div>
      <div className="text-2xl font-bold">Logs 🔥</div>
      <div className="h-[15%] flex items-end">
        <div className="p-2">Filters:</div>
        <div className="flex flex-col p-2">
          Log Level:
          <select
            name="log_level"
            id=""
            className="bg-white"
            defaultValue={""}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">All</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
            <option value="error">Error</option>
          </select>
        </div>
        <div className="flex flex-col p-2">
          Message
          <input
            type="text"
            className="w-24"
            placeholder="regex"
            onChange={(e) => setMsg(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          From
          <input
            type="date"
            className="w-24"
            placeholder="regex"
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          To
          <input
            type="date"
            className="w-24"
            placeholder="regex"
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          ResourceId
          <input
            type="text"
            className="w-24"
            placeholder="resourceId"
            onChange={(e) => setResourceId(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          TraceId
          <input
            type="text"
            className="w-24"
            placeholder="traceId"
            onChange={(e) => setTraceId(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          SpanId
          <input
            type="text"
            className="w-24"
            placeholder="spanId"
            onChange={(e) => setSpanId(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          Commit
          <input
            type="text"
            className="w-24"
            placeholder="commit"
            onChange={(e) => setCommit(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          ParentResourceId
          <input
            type="text"
            className="w-36"
            placeholder="parentResourceId"
            onChange={(e) => setParentResourceId(e.target.value)}
          />
        </div>
      </div>
      <div className="bg-blue-950 rounded-lg w-3/4 h-3/4 overflow-y-scroll p-4 text-green-400">
        {logs.length > 0
          ? logs.map((log, idx) => {
              return (
                <div key={idx}>
                  <span className="text-slate-500">{log.timestamp}</span> [
                  <span className={log.color}>{log.level}</span>] [
                  <span className="text-white">commit:{log.commit}</span>] [
                  <span className="text-red-500">traceId:{log.traceId}</span>] [
                  <span className="text-cyan-500">spanId:{log.spanId}</span>]
                  {log.message}
                </div>
              );
            })
          : "Fetching logs..."}
      </div>
    </div>
  );
}
