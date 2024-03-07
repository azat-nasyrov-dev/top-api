import { ITelegramOptions } from '../telegram/types/telegram.interface';

export const getTelegramConfig = (): ITelegramOptions => {
  return {
    token: '',
    chatId: '',
  };
};
