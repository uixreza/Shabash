import net from "node:net";

const PORT = Number(process.env.PORT ?? 3000);
const HOST = "127.0.0.1";

function isPortInUse(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host: HOST });
    const finish = (inUse) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(inUse);
    };
    socket.setTimeout(1500);
    socket.once("connect", () => finish(true));
    socket.once("timeout", () => finish(false));
    socket.once("error", () => finish(false));
  });
}

if (await isPortInUse(PORT)) {
  console.error(
    `\n[dev] Port ${PORT} is already in use — another dev server is probably running.`
  );
  console.error(
    "[dev] Two servers sharing one .next folder corrupt the Turbopack cache and make everything slow.\n"
  );
  console.error(
    `[dev] Stop the other server first, then run "npm run dev" again.\n`
  );
  process.exit(1);
}
