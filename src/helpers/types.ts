// data types for the app

export interface GlobalState {
   currentDeck: any;
   currentDraw: any;
   info: any;
   gameData: any;
}

export type Todo = {
   id?: number;
   title: string;
   color: string;
};

export type toDoProps = {title: string; color: string; id: number};

export type errorModalProps = {
   errorType: string;
   showToast: true;
   toastMessage: string;
   setShowToast: any;
};
