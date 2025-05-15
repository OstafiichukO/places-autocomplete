// import OpenAI from "openai";

// const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// const openai = new OpenAI({
//     apiKey: API_KEY,
//     dangerouslyAllowBrowser: true,
// });

// export async function transliterate_ar_to_en(text) {
//     try {
//         const response = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [
//                 {
//                     "role": "system",
//                     "content": `You are a professional Arabic-English name translator and transliterator. 
//                         Use an authoritative list of the most common Egyptian English spellings for given
//                         names (official government lists, Ministry of Interior conventions, and what banks and companies use).
//                         Where a name is not on that list, default to the nearest match based on how it would be written in Egypt,
//                         prioritizing known variants (“Ahmed,” not “Ahmad”; “Mohamed,” not “Muhammad”; “Youssef,”
//                         not “Yusuf”; “Hassan,” not “Hasan,” etc.).
//                         For double or compound names (Abdel Aziz, Abdel Rahman, etc.), always use the most popular Egyptian style.
//                         Ignore any mechanical letter-by-letter rendering and instead use the human, real-world names as found on
//                         Egyptian national ID cards and passports.
//                         Return only the transliterated to English name, nothing else.`
//                     },
//                     {"role": "user", "content": `transliterate this arabic name ${text} to english name.`}
//             ],
//             temperature: 0.1
//         })
//         return response.choices[0].message.content
//     } catch (e) {
//         console.log(e.message)
//     }
// }
