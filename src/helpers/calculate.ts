import {deckEnum} from './consts';

export const calcHighestRank = (left: string, right: string): string => {
   console.log('Card indeces', deckEnum.indexOf(left), deckEnum.indexOf(right));
   if (deckEnum.indexOf(left) > deckEnum.indexOf(right)) {
      return left;
   } else {
      return right;
   }
};
