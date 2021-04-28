interface BoardgameListType {
  [key: string]: {
    [key: string]: string | number | boolean;
    description: string;
    imagePath: string;
    numberOfMaxPeople: number;
    numberOfMinPeople: number;
    price: number;
    star: number;
    targetAges: number;
    time: number;
    title: string;
    playCount: number;
    id: string;
    isDisplay: boolean;
    purchaseDate: string;
  };
}

export default BoardgameListType;
