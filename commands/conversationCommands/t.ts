import { ConversationCommand, ConversationCommandObject } from "..";
import templateShow from "./templateShow";

const command: ConversationCommand = async (
  message,
  settings,
  adminContext,
  callbackServerSettings
) =>
  await templateShow.command(
    message,
    settings,
    adminContext,
    callbackServerSettings
  );

const t: ConversationCommandObject = {
  command,
  isAdminCommand: false,
  description: "t_description",
};

export default t;
