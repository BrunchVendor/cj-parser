import * as fs from 'fs';
import { describe, expect, it } from 'vitest';
import { streamer } from '../src/streamer';

describe('Streamer', () => {
  const testCaseFilePath = `${__dirname}/../../../document/titanic.csv`;
  const titanicStr = fs.readFileSync(testCaseFilePath, 'utf8');
  const testCase = '123456i am better man now'
  const chunksForTestCase = [
    '1234',
    '56i ',
    'am b',
    'ette',
    'r ma',
    'n no',
    'w',
  ]
  it('StringSteamer', async () => {
    const result = await new Promise<string[]>((resolve, reject) => {
      const temp: string[] = []
      streamer(testCase, {
        chunkSize: 4,
      }, {
        onChunk(chunk) {
          temp.push(chunk.data)
        },
        onFinish() {
          resolve(temp)
        },
        onError(err) {
          reject(err)
        },
      })
    })
    expect(result).toStrictEqual(chunksForTestCase)
  })
  it('ReaderStreamer', async () => {
    const result = await new Promise<string>((resolve, reject) => {
      let temp: string = ''
      streamer(fs.createReadStream(testCaseFilePath), { encoding: 'utf-8' }, {
        onChunk(chunk) {
          temp += chunk.data;
        },
        onFinish() {
          resolve(temp)
        },
        onError(err) {
          reject(err)
        },
      })
    })
    expect(result).toEqual(titanicStr)
  })
})
