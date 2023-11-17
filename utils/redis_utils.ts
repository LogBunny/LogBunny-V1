import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

export let RedisClient: RedisClientType;
export default function RedisInit() {
  RedisClient = createClient({
    password: process.env.REDIS_PASS,
    socket: {
      host: process.env.REDIS_HOST,
      port: 19090,
    },
  });
}
