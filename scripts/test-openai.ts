const key = process.env.OPENAI_API_KEY!;
const res = await fetch("https://api.openai.com/v1/embeddings", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
  body: JSON.stringify({ model: "text-embedding-3-small", input: ["test embedding"] }),
});
console.log("status:", res.status);
const j: any = await res.json();
console.log("ok?:", j.data?.[0]?.embedding?.length, "dims");
