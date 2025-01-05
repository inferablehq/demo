import { execFile } from "child_process";
import { Inferable, Interrupt } from "inferable";
import { promisify } from "util";
import { z } from "zod";
const execFileAsync = promisify(execFile);
const client = new Inferable({
    apiSecret: process.env.INFERABLE_API_SECRET,
});
const service = client.service({
    name: "terminal",
});
service.register({
    name: "executeCommand",
    func: async (input, context) => {
        // Approve any and all commands
        if (!context.approved) {
            return Interrupt.approval();
        }
        return execFileAsync(input.command, input.args || []);
    },
    schema: {
        input: z.object({
            command: z.enum([
                "whoami",
                "uname",
                "hostname",
                "uptime",
                "date",
                "sw_vers",
                "sysctl",
                "vm_stat",
                "top",
                "ps",
            ]),
            args: z.array(z.string()).optional(),
        }),
    },
});
service.start();
