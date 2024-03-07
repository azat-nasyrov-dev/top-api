import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from '../telegram/types/telegram.interface';

export const getTelegramConfig = async (
  configService: ConfigService,
): Promise<ITelegramOptions> => {
  const token = configService.get('TELEGRAM_TOKEN');

  if (!token) {
    throw new Error('TELEGRAM_TOKEN не задан');
  }

  return {
    token,
    chatId: configService.get('CHAT_ID') ?? '',
  };
};
