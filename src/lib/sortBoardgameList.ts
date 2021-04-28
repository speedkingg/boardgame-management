import BoardgameListType from "@/type/BoardgameListType.ts";
import BoardgameType from "@/type/BoardgameType.ts";

class SortBoardgameList {
  public execSort(
    boardgameList: BoardgameListType,
    key: string,
    order: "asc" | "desc"
  ) {
    const newboardgameList: BoardgameListType = this.formatboardgameArrayToBoardgameList(
      this.boardgameListToArray(boardgameList).sort(
        this.compareValues(key, order)
      )
    );
    return newboardgameList;
  }

  private boardgameListToArray(
    boardgameList: BoardgameListType
  ): BoardgameType[] {
    const boardgames: BoardgameType[] = [];
    for (const key in boardgameList) {
      boardgames.push({
        ...boardgameList[key],
      });
    }
    return boardgames;
  }

  private formatboardgameArrayToBoardgameList(
    arr: BoardgameType[]
  ): BoardgameListType {
    let bordgames: BoardgameListType = {};
    for (const item of arr) {
      bordgames = {
        ...bordgames,
        [item.id]: item,
      };
    }
    return bordgames;
  }

  private compareValues(key: string, order: "asc" | "desc") {
    return function (a: BoardgameType, b: BoardgameType) {
      if (
        !Object.prototype.hasOwnProperty.call(a, key) ||
        !Object.prototype.hasOwnProperty.call(b, key)
      ) {
        return 0;
      }

      let comparison = 0;
      if (a[key] > b[key]) {
        comparison = 1;
      } else if (a[key] < b[key]) {
        comparison = -1;
      }
      return order == "desc" ? comparison * -1 : comparison;
    };
  }
}

export default SortBoardgameList;
