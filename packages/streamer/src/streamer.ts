import { Readable } from 'stream';
import { StreamerConfig, StreamerEventHandler } from './types';
import { StringStreamer } from './stringStreamer';
import { ReadableStreamer } from './ReadableStreamer';

export const streamer = (
  content: string | Readable,
  config?: StreamerConfig,
  handler?:
  StreamerEventHandler<string>,
) => {
  if (typeof content === 'string') {
    new StringStreamer(content as string, config, handler).read()
  } else {
    new ReadableStreamer(content as Readable, config, handler).read()
  }
}
