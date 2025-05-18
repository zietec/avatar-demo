import { IConversation } from "@/types";

export const createConversation = async (
  token: string,
): Promise<IConversation> => {
  const response = await fetch("https://tavusapi.com/v2/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_TAVUS_API_KEY,
    },
    body: JSON.stringify({
      // Santa Demo Persona
      // persona_id: "p3bb4745d4f9",
       "replica_id": "r4c41453d2",
    "persona_id": "p2fbd605"
    }),
  });

  if (!response?.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
