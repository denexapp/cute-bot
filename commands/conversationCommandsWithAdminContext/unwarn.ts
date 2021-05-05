import {
  ConversationCommandWithAdminContext,
  ConversationCommandWithAdminContextObject,
} from "..";
import warningRemove from "./warningRemove";

const command: ConversationCommandWithAdminContext = async (
  message,
  settings,
  adminContext,
  callbackServerSettings
) =>
  await warningRemove.command(
    message,
    settings,
    adminContext,
    callbackServerSettings
  );

const unwarn: ConversationCommandWithAdminContextObject = {
  command,
  isAdminCommand: true,
  description: "unwarn_description",
};

export default unwarn;
