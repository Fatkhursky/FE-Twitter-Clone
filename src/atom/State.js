import { atom, useAtom } from "jotai";

const textAtom = atom("")

// const State = () => {
//   const [date, setDate] = useAtom(textAtom);
//   return State;
// };

const getDate = atom((get) => get(textAtom));


export {  getDate, textAtom };
