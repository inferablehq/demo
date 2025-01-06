"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const inferable_1 = require("inferable");
const util_1 = require("util");
const zod_1 = require("zod");
const secret_1 = require("../secret");
const execFileAsync = (0, util_1.promisify)(child_process_1.execFile);
const client = new inferable_1.Inferable({
    apiSecret: secret_1.apiSecret,
});
const service = client.service({
    name: "terminal",
});
service.register({
    name: "executeCommand",
    func: async (input, context) => {
        // Approve any and all commands
        if (!context.approved) {
            console.log("Terminal: Command is blocked without approval");
            return inferable_1.Interrupt.approval();
        }
        console.log("Terminal: Executing command", input.command, input.args);
        return execFileAsync(input.command, input.args || []);
    },
    schema: {
        input: zod_1.z.object({
            command: zod_1.z.enum([
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
            args: zod_1.z.array(zod_1.z.string()).optional(),
        }),
    },
});
exports.default = service;
