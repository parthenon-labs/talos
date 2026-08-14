import { openDB, IDBPDatabase } from 'idb';
import {
  SaveChapterCodeData,
  CodeType,
  GetChapterCodeData,
} from '../model/EditModel';

// Every level needs the character controls imported before `moveForward`,
// `collectCoin`, etc. resolve to anything — see PythonRuntime/index.ts and
// Blocks/index.ts (`import_control`). Rather than expect a first-time
// player to know that ahead of the lesson that actually teaches imports,
// a chapter with no saved code yet starts pre-seeded with it in both modes.
const defaultCode: CodeType = {
  pythonCode:
    'from role import moveForward, turnLeft, turnRight, collectCoin, isCoin, isBlocked, isRightBlocked\n\n',
  blocklyCode:
    '<xml xmlns="https://developers.google.com/blockly/xml"><block type="import_control" x="20" y="20"></block></xml>',
};

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
    return result ?? defaultCode;
  }
}

export default IDB;
