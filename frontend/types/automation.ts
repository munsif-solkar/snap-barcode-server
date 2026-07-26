export type SettingKey = "enableTyping" | "pressEnter" | "typingDelay";

export interface Settings {
  enableTyping: boolean;
  pressEnter: boolean;
  typingDelay: number;
}