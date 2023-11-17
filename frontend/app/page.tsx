"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [level, setLevel] = useState("");
  const [msg, setMsg] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [traceId, setTraceId] = useState("");
  const [spanId, setSpanId] = useState("");
  const [commit, setCommit] = useState("");
  const [parentResourceId, setParentResourceId] = useState("");
  const logContainerRef: any = useRef({});
  useEffect(() => {
    const logContainer = logContainerRef.current;
    if (!logContainer) {
      return;
    }
    const logSource = new EventSource("http://localhost:8080/stream");
    logSource.onmessage = function (event) {
      const logData = JSON.parse(event.data);
      displayLog(logData);
    };
    function displayLog(logData: any) {
      const logElement = document.createElement("div");
      logElement.textContent = JSON.stringify(logData);
      logContainerRef.current!.appendChild(logElement);
    }
  }, [logContainerRef]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="text-2xl font-bold">Realtime data 🚀</div>
      <div className="h-[15%] flex items-end">
        <div className="p-2">Filters:</div>
        <div className="flex flex-col p-2">
          Log Level:
          <select
            name="log_level"
            id=""
            className="bg-white"
            onChange={(e) => setLevel(e.target.value)}
          >
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
          ResourceId
          <input
            type="text"
            className="w-24"
            placeholder="resourceId"
            onChange={(e) => setResourceId(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          From
          <input
            type="datetime-local"
            className="w-48"
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          To
          <input
            type="datetime-local"
            className="w-48"
            onChange={(e) => setTo(e.target.value)}
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
        <button className="bg-slate-100 p-4 rounded-lg hover:bg-slate-300">
          Submit
        </button>
      </div>
      <div
        ref={logContainerRef}
        className="bg-blue-950 rounded-lg w-3/4 h-3/4 p-4 text-green-400"
      >
        Fetching logs...
      </div>
    </div>
  );
}
