import { Readable } from 'stream';
import { ChunkModel, StreamerConfig, StreamerEventHandler } from './types';
import { Streamer } from './BaseStreamer';

export class ReadableStreamer extends Streamer<Readable, string> {
  pauseInternal: boolean

  bufferCache: string[]

  streamEnd: boolean

  constructor(content: Readable, config?: StreamerConfig, handler?: StreamerEventHandler<string>) {
    super(content, config, handler);
    this.pauseInternal = false
    this.bufferCache = []
    this.streamEnd = false
  }

  hasNext(): boolean {
    return !this.streamEnd && this.bufferCache.length === 1;
  }

  nextChunk(): ChunkModel<string> {
    const data = this.bufferCache.length ? this.bufferCache.shift() : ''
    return { data: data ?? '', isLastChunk: !this.hasNext() };
  }

  private onStreamData = (chunk: any) => {
    try {
      if (chunk instanceof String) {
        this.bufferCache.push(chunk as string)
      } else {
        const buffer = chunk as Buffer
        this.bufferCache.push(buffer.toString(this.config.encoding ?? 'utf-8'))
      }
      while (this.hasNext()) {
        if (this.handler?.onChunk) this.handler?.onChunk(this.nextChunk())
      }
    } catch (err) {
      if (this.handler?.onError) this.handler?.onError(err)
    }
  }

  private onStreamEnd = () => {
    try {
      this.streamCleanUp()
      this.streamEnd = true
      if (this.handler?.onFinish) this.handler?.onFinish()
    } catch (err) {
      if (this.handler?.onError) this.handler?.onError(err)
    }
  }

  private streamCleanUp() {
    this.content.removeListener('data', this.onStreamData)
    this.content.removeListener('end', this.onStreamEnd)
    this.content.removeListener('error', this.onStreamError)
  }

  private onStreamError = () => {
    if (this.handler?.onError) this.handler?.onError(new Error())
  }

  read(handler?: StreamerEventHandler<string>) {
    this.content.on('data', this.onStreamData)
    this.content.on('end', this.onStreamEnd)
    this.content.on('error', this.onStreamError)
    if (handler) this.handler = handler
  }
}
