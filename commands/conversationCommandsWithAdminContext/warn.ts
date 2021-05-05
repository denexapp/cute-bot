import {
  ConversationCommandWithAdminContext,
  ConversationCommandWithAdminContextObject,
} from "..";
import warningAdd from "./warningAdd";

const command: ConversationCommandWithAdminContext = async (
  message,
  settings,
  adminContext,
  callbackServerSettings
) =>
  await warningAdd.command(
    message,
    settings,
    adminContext,
    callbackServerSettings
  );

const warn: ConversationCommandWithAdminContextObject = {
  command,
  isAdminCommand: true,
  description: "warn_description",
};

export default warn;
