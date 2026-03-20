import { alchemystClient } from "./client/client";
const client = alchemystClient;

export async function searchContext(query:string){
    try {
        const {contexts} = await client.v1.context.search({
            query,
            similarity_threshold: 0.8,
            minimum_similarity_threshold: 0.5,
            scope: "internal",
            metadata: null,
        });
        if(contexts && contexts.length > 0){
            return contexts.map((c) => c.content || JSON.stringify(c)).join('\n\n');
        }
        return "";
    } catch {
        // Alchemyst context search is optional — return empty if unavailable
        return "";
    }
}
