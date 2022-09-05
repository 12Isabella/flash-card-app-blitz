import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
let state: { [key: string]: { correct: boolean; time: Date } } = {};

export async function saveAnswer(
  cardId: string,
  correct: boolean,
  session: Session
) {
  try {
    const { data, error } = await supabase.from("answers").upsert([
      {
        cardId: cardId,
        correct: correct,
        userId: session.user.id,
        updated_at: new Date(),
      },
    ]);
    console.log("result", data, error);
  } catch (err) {
    console.error("error from supabase", err);
  }
}

export function getLastAnswer(cardId: string): {
  correct: boolean;
  time: Date;
} {
  //to do: read from supabase
  return state[cardId];
}
