import { ChunkModel, StreamerConfig, StreamerEventHandler } from './types'
import { Streamer } from './BaseStreamer'

export class StringStreamer extends Streamer<string, string> {
  constructor(content: string, config?: StreamerConfig, handler?: StreamerEventHandler<string>) {
    super(content, config, handler)
    this.config.chunkSize = this.config.chunkSize ?? content.length
  }

  hasNext(): boolean {
    return !!this.content
  }

  protected nextChunk(): ChunkModel<string> {
    const chunkContent = this.content?.substring(0, this.config?.chunkSize)
    this.content = this.content?.substring(chunkContent.length)
    return {
      data: chunkContent ?? '',
      isLastChunk: !this.hasNext(),
    }
  }
}
