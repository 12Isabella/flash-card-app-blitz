import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

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

//const { data, error } = await supabase.from("cities").select();

export async function getLastAnswer(cardId: string) {
  const result = await supabase.from("answers").select().eq("cardId", cardId);
  //console.log(result);

  //to do: read from supabase

  return {
    correct: result.data![0].correct,
    time: result.data![0].updated_at,
    id: cardId,
  };
}
