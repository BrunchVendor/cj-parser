import { ChunkModel, StreamerConfig, StreamerEventHandler } from './types';

export abstract class Streamer<T, R> {
  config: StreamerConfig

  content: T

  handler?: StreamerEventHandler<R>

  protected constructor(content: T, config?: StreamerConfig, handler?: StreamerEventHandler<R>) {
    this.config = config ?? {};
    this.content = content;
    handler && (this.handler = handler)
  }

  protected abstract nextChunk(): ChunkModel<R>

  abstract hasNext(): boolean

  read(handler?: StreamerEventHandler<R>): void {
    handler && (this.handler = handler)
    while (this.hasNext()) {
      this.handler?.onChunk && this.handler?.onChunk(this.nextChunk())
    }
    this.handler?.onFinish && this.handler.onFinish()
  }
}
