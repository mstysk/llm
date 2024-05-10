import { LLMInterface } from "./llm.ts";
import { Ollama } from "npm:@langchain/community@0.0.55/llms/ollama";

export class Phi3 implements LLMInterface {
  private model = "phi3";
  private baseUrl = "http://localhost:11434";

  public async stream(text: string) {
    const ollama = new Ollama({
      baseUrl: this.baseUrl,
      model: this.model,
    });
    const stream = await ollama.stream(text);
    return stream;
  }
}
