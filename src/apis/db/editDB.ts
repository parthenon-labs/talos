import { openDB, IDBPDatabase } from 'idb';
import {
  SaveChapterCodeData,
  CodeType,
  GetChapterCodeData,
} from '../model/EditModel';

class IDB {
  #db: Promise<IDBPDatabase<SaveChapterCodeData>>;

  constructor() {
    this.#db = openDB<SaveChapterCodeData>('talos', 1, {
      upgrade(db) {
        db.createObjectStore('chapter-code', {
          keyPath: ['courseId', 'chapterId', 'childId'],
        });
      },
    });
  }

  async set(data: SaveChapterCodeData): Promise<void> {
    const db = await this.#db;
    const tx = db.transaction('chapter-code', 'readwrite');
    const store = tx.objectStore('chapter-code');
    store.put(data);
    return tx.done;
  }

  async get(query: GetChapterCodeData): Promise<CodeType> {
    const db = await this.#db;
    const tx = db.transaction('chapter-code');
    const store = tx.objectStore('chapter-code');
    const result = await store.get([
      query.courseId,
      query.chapterId,
      query.childId,
    ]);
    return (
      result ?? {
        pythonCode: '',
        blocklyCode: '',
      }
    );
  }
}

export default IDB;
